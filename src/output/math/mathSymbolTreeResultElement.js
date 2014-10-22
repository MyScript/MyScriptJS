(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathSymbolTreeResultElement (obj) {
        scope.AbstractMathResultElement.call(this, obj);
        this.tagItems = [];
        this.wordCandidates = [];
        this.charCandidates = [];
        if (obj) {
            this.root = obj.root;
            this.value = JSON.stringify(obj.root, null, '  ');
            this.textSegmentResult = new scope.TextSegmentResult(obj.textSegmentResult);
            for (var i in obj.tagItems) {
                this.tagItems.push(new scope.TextTagItem(obj.tagItems[i]));
            }
            for (var j in obj.wordCandidates) {
                this.wordCandidates.push(new scope.TextCandidate(obj.wordCandidates[j]));
            }
            for (var k in obj.charCandidates) {
                this.charCandidates.push(new scope.TextCandidate(obj.charCandidates[k]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AbstractMathResultElement}
     */
    MathSymbolTreeResultElement.prototype = new scope.AbstractMathResultElement();

    /**
     *
     * @type {MathLaTexResultElement}
     */
    MathSymbolTreeResultElement.prototype.constructor = MathSymbolTreeResultElement;

    /**
     *
     * @returns {MathNode}
     */
    MathSymbolTreeResultElement.prototype.getRoot = function () {
        return this.root;
    };

    /**
     *
     * @returns {Array}
     */
    MathSymbolTreeResultElement.prototype.getInkRanges = function () {
        return this.parseNode(this.getRoot());
    };

    /**
     *
     * @param node
     * @returns {Array}
     */
    MathSymbolTreeResultElement.prototype.parseNode = function (node) {
        switch (node.type) {
            case 'nonTerminalNode':
                return this.parseNonTerminalNode(node);
            case 'terminalNode':
                return this.parseTerminalNode(node);
            case 'rule':
                return this.parseRuleNode(node);
        }
        return [];
    };

    MathSymbolTreeResultElement.prototype.parseNonTerminalNode = function (node) {
        return this.parseNode(node.getCandidates()[node.getSelectedCandidateIdx()]);
    };

    MathSymbolTreeResultElement.prototype.parseTerminalNode = function (node) {
        return node.getInkRanges();
    };

    MathSymbolTreeResultElement.prototype.parseRuleNode = function (node) {

        var inkRanges = [];
        for (var i in node.getChildren()) {
            var childInkRanges = this.parseNode(node.getChildren()[i]);
            for (var j in childInkRanges) {
                inkRanges.push(childInkRanges[j]);
            }
        }
        return inkRanges;
    };

    // Export
    scope.MathSymbolTreeResultElement = MathSymbolTreeResultElement;
})(MyScript);