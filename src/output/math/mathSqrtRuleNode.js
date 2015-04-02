'use strict';

(function (scope) {
    /**
     * Math sqrt rule node
     *
     * @class MathSqrtRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathSqrtRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSqrtRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSqrtRuleNode.prototype.constructor = MathSqrtRuleNode;

    // Export
    scope.MathSqrtRuleNode = MathSqrtRuleNode;
})(MyScript);
