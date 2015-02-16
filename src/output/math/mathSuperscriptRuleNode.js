(function (scope) {
    'use strict';
    /**
     * Math superscript rule node
     *
     * @class MathSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSuperscriptRuleNode.prototype.constructor = MathSuperscriptRuleNode;

    // Export
    scope.MathSuperscriptRuleNode = MathSuperscriptRuleNode;
})(MyScript);
