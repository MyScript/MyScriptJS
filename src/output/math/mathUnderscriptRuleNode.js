'use strict';

(function (scope) {
    /**
     * Math underscript rule node
     *
     * @class MathUnderscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathUnderscriptRuleNode(obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathUnderscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathUnderscriptRuleNode.prototype.constructor = MathUnderscriptRuleNode;

    // Export
    scope.MathUnderscriptRuleNode = MathUnderscriptRuleNode;
})(MyScript);
