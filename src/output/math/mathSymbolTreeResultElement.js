(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathSymbolTreeResultElement (obj) {
        scope.AbstractMathResultElement.call(this, obj);
        if (obj) {
            this.root = obj.root;
            this.value = JSON.stringify(obj.root, null, '  ');
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