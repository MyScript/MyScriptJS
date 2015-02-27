'use strict';

(function (scope) {
    /**
     * Math vertical pair rule node
     *
     * @class MathVerticalPairRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathVerticalPairRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathVerticalPairRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathVerticalPairRuleNode.prototype.constructor = MathVerticalPairRuleNode;

    // Export
    scope.MathVerticalPairRuleNode = MathVerticalPairRuleNode;
})(MyScript);
