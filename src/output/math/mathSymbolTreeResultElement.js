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
                    switch (obj.root.name) {
                        case 'term':
                            this.root = new scope.MathTermNonTerminalNode(obj.root);
                            break;
                        case 'sqrtTerm':
                            this.root = new scope.MathSqrtNonTerminalNode(obj.root);
                            break;
                        case 'vectorTerm':
                            this.root = new scope.MathVectorNonTerminalNode(obj.root);
                            break;
                        case 'system':
                            this.root = new scope.MathSystemNonTerminalNode(obj.root);
                            break;
                        case 'exponentiable':
                            this.root = new scope.MathExponentiableNonTerminalNode(obj.root);
                            break;
                        case 'expression':
                            this.root = new scope.MathExpressionNonTerminalNode(obj.root);
                            break;
                    }
                    break;
                case 'terminalNode':
                    this.root = new scope.MathTerminalNode(obj.root);
                    break;
                case 'rule':
                    switch (obj.root.name) {
                        case 'identity':
                            this.root = new scope.MathIdentityRuleNode(obj.root);
                            break;
                        case 'horizontal pair':
                            this.root = new scope.MathHorizontalPairRuleNode(obj.root);
                            break;
                        case 'fence':
                            this.root = new scope.MathFenceRuleNode(obj.root);
                            break;
                        case 'fraction':
                            this.root = new scope.MathFractionRuleNode(obj.root);
                            break;
                        case 'sqrt':
                            this.root = new scope.MathSqrtRuleNode(obj.root);
                            break;
                        case 'subscript':
                            this.root = new scope.MathSubscriptRuleNode(obj.root);
                            break;
                        case 'superscript':
                            this.root = new scope.MathSuperscriptRuleNode(obj.root);
                            break;
                        case 'subsuperscript':
                            this.root = new scope.MathSubSuperscriptRuleNode(obj.root);
                            break;
                        case 'underscript':
                            this.root = new scope.MathUnderscriptRuleNode(obj.root);
                            break;
                        case 'overscript':
                            this.root = new scope.MathOverscriptRuleNode(obj.root);
                            break;
                        case 'underoverscript':
                            this.root = new scope.MathUnderOverscriptRuleNode(obj.root);
                            break;
                        case 'presuperscript':
                            this.root = new scope.MathPreSuperscriptRuleNode(obj.root);
                            break;
                        case 'vertical pair':
                            this.root = new scope.MathVerticalPairRuleNode(obj.root);
                            break;
                        case 'left fence':
                            this.root = new scope.MathLeftFenceRuleNode(obj.root);
                            break;
                    }
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