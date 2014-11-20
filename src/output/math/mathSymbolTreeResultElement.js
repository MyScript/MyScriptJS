(function (scope) {

    /**
     * Math symbol tree
     *
     * @class MathSymbolTreeResultElement
     * @extends AbstractMathResultElement
     * @param {Object} obj
     * @constructor
     */
    function MathSymbolTreeResultElement (obj) {
        scope.AbstractMathResultElement.call(this, obj);
        if (obj) {
            switch (obj.root.type) {
                case 'nonTerminalNode':
                    this.root = new scope.MathNonTerminalNode(obj.root);
                    break;
                case 'terminalNode':
                    this.root = new scope.MathTerminalNode(obj.root);
                    break;
                case 'rule':
                    this.root = new scope.MathRuleNode(obj.root);
                    break;
            }
            this.value = JSON.stringify(obj.root, null, '  ');
        }
    }

    /**
     * Inheritance property
     */
    MathSymbolTreeResultElement.prototype = new scope.AbstractMathResultElement();

    /**
     * Constructor property
     */
    MathSymbolTreeResultElement.prototype.constructor = MathSymbolTreeResultElement;

    /**
     * Get tree root
     *
     * @method getRoot
     * @returns {MathNode}
     */
    MathSymbolTreeResultElement.prototype.getRoot = function () {
        return this.root;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathSymbolTreeResultElement.prototype.getInkRanges = function () {
        return this.parseNode(this.getRoot());
    };

    /**
     * TODO: make it private
     * Parse the node tree
     *
     * @method parseNode
     * @param {Object} node
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

    /**
     * TODO: make it private
     * Parse non terminal node
     *
     * @method parseNonTerminalNode
     * @param {MathNonTerminalNode} node
     * @returns {MathInkRange[]}
     */
    MathSymbolTreeResultElement.prototype.parseNonTerminalNode = function (node) {
        return this.parseNode(node.getCandidates()[node.getSelectedCandidateIdx()]);
    };

    /**
     * TODO: make it private
     * Parse terminal node
     *
     * @method parseTerminalNode
     * @param {MathTerminalNode} node
     * @returns {MathInkRange[]}
     */
    MathSymbolTreeResultElement.prototype.parseTerminalNode = function (node) {
        return node.getInkRanges();
    };

    /**
     * TODO: make it private
     * Parse rule node
     *
     * @method parseRuleNode
     * @param {MathRuleNode} node
     * @returns {MathInkRange[]}
     */
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