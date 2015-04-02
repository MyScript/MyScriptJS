'use strict';

(function (scope) {
    /**
     * Math overscript rule node
     *
     * @class MathOverscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathOverscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathOverscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathOverscriptRuleNode.prototype.constructor = MathOverscriptRuleNode;

    // Export
    scope.MathOverscriptRuleNode = MathOverscriptRuleNode;
})(MyScript);
