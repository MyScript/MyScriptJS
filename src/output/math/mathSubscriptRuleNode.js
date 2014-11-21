(function (scope) {

    /**
     * Math subscript rule node
     *
     * @class MathSubscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSubscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSubscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSubscriptRuleNode.prototype.constructor = MathSubscriptRuleNode;

    // Export
    scope.MathSubscriptRuleNode = MathSubscriptRuleNode;
})(MyScript);