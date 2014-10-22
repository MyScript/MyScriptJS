(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathResultTreeElement (obj) {
        scope.MathResultElement.call(this, obj);
        this.tagItems = [];
        this.wordCandidates = [];
        this.charCandidates = [];
        if (obj) {
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
     * @type {MyScript.MathResultElement}
     */
    MathResultTreeElement.prototype = new scope.MathResultElement();

    /**
     *
     * @type {MathResultTreeElement}
     */
    MathResultTreeElement.prototype.constructor = MathResultTreeElement;

    /**
     *
     * @returns {MathNode}
     */
    MathResultTreeElement.prototype.getRoot = function () {
        return this.root;
    };

    /**
     *
     * @returns {Array}
     */
    MathResultTreeElement.prototype.getInkRanges = function () {
        return this.parseNode(this.getRoot());
    };

    /**
     *
     * @param node
     * @returns {Array}
     */
    MathResultTreeElement.prototype.parseNode = function (node) {
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

    MathResultTreeElement.prototype.parseNonTerminalNode = function (node) {
        return this.parseNode(node.getCandidates()[node.getSelectedCandidateIdx()]);
    };

    MathResultTreeElement.prototype.parseTerminalNode = function (node) {
        return node.getInkRanges();
    };

    MathResultTreeElement.prototype.parseRuleNode = function (node) {

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
    scope.MathResultTreeElement = MathResultTreeElement;
})(MyScript);