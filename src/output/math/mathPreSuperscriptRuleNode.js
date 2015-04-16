'use strict';

(function (scope) {
    /**
     * Math pre-superscript rule node
     *
     * @class MathPreSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathPreSuperscriptRuleNode(obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathPreSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathPreSuperscriptRuleNode.prototype.constructor = MathPreSuperscriptRuleNode;

    // Export
    scope.MathPreSuperscriptRuleNode = MathPreSuperscriptRuleNode;
})(MyScript);
