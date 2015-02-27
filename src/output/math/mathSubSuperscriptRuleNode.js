'use strict';

(function (scope) {
    /**
     * Math sub-superscript rule node
     *
     * @class MathSubSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathSubSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSubSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSubSuperscriptRuleNode.prototype.constructor = MathSubSuperscriptRuleNode;

    // Export
    scope.MathSubSuperscriptRuleNode = MathSubSuperscriptRuleNode;
})(MyScript);
