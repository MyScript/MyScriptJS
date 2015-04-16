'use strict';

(function (scope) {
    /**
     * Math horizontal pair rule node
     *
     * @class MathHorizontalPairRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathHorizontalPairRuleNode(obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathHorizontalPairRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathHorizontalPairRuleNode.prototype.constructor = MathHorizontalPairRuleNode;

    // Export
    scope.MathHorizontalPairRuleNode = MathHorizontalPairRuleNode;
})(MyScript);
