(function (scope) {

    /**
     * Math rule node
     *
     * @class MathRuleNode
     * @extends MathNode
     * @param {Object} obj
     * @constructor
     */
    function MathRuleNode (obj) {
        scope.MathNode.call(this, obj);
        this.children = [];
        if (obj) {
            this.name = obj.name;
            for (var i in obj.children) {
                switch (obj.children[i].type) {
                    case 'nonTerminalNode':
                        switch (obj.children[i].name) {
                            case 'term':
                                this.children.push(new scope.MathTermNonTerminalNode(obj.children[i]));
                                break;
                            case 'sqrtTerm':
                                this.children.push(new scope.MathTermNonTerminalNode(obj.children[i]));
                                break;
                            case 'exponentiable':
                                this.children.push(new scope.MathExponentiableNonTerminalNode(obj.children[i]));
                                break;
                            case 'expression':
                                this.children.push(new scope.MathExpressionNonTerminalNode(obj.children[i]));
                                break;
                        }
                        break;
                    case 'terminalNode':
                        this.children.push(new scope.MathTerminalNode(obj.children[i]));
                        break;
                    case 'rule':
                        switch (obj.children[i].name) {
                            case 'identity':
                                this.children.push(new scope.MathIdentityRuleNode(obj.children[i]));
                                break;
                            case 'horizontal pair':
                                this.children.push(new scope.MathHorizontalPairRuleNode(obj.children[i]));
                                break;
                            case 'fence':
                                this.children.push(new scope.MathFenceRuleNode(obj.children[i]));
                                break;
                            case 'fraction':
                                this.children.push(new scope.MathFractionRuleNode(obj.children[i]));
                                break;
                            case 'sqrt':
                                this.children.push(new scope.MathSqrtRuleNode(obj.children[i]));
                                break;
                            case 'subscript':
                                this.children.push(new scope.MathSubscriptRuleNode(obj.children[i]));
                                break;
                            case 'superscript':
                                this.children.push(new scope.MathSuperscriptRuleNode(obj.children[i]));
                                break;
                            case 'subsuperscript':
                                this.children.push(new scope.MathSubSuperscriptRuleNode(obj.children[i]));
                                break;
                            case 'underscript':
                                this.children.push(new scope.MathUnderscriptRuleNode(obj.children[i]));
                                break;
                            case 'overscript':
                                this.children.push(new scope.MathOverscriptRuleNode(obj.children[i]));
                                break;
                            case 'underoverscript':
                                this.children.push(new scope.MathUnderOverscriptRuleNode(obj.children[i]));
                                break;
                            case 'presuperscript':
                                this.children.push(new scope.MathPreSuperscriptRuleNode(obj.children[i]));
                                break;
                            case 'vertical pair':
                                this.children.push(new scope.MathVerticalPairRuleNode(obj.children[i]));
                                break;
                            case 'left fence':
                                this.children.push(new scope.MathLeftFenceRuleNode(obj.children[i]));
                                break;
                        }
                        break;
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    MathRuleNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathRuleNode.prototype.constructor = MathRuleNode;

    /**
     * Get name
     *
     * @method getName
     * @returns {String}
     */
    MathRuleNode.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get children
     *
     * @method getChildren
     * @returns {MathNode[]}
     */
    MathRuleNode.prototype.getChildren = function () {
        return this.children;
    };

    // Export
    scope.MathRuleNode = MathRuleNode;
})(MyScript);