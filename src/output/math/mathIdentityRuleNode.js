(function (scope) {

    /**
     * Math identity rule node
     *
     * @class MathIdentityRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathIdentityRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathIdentityRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathIdentityRuleNode.prototype.constructor = MathIdentityRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathIdentityRuleNode.prototype.computeBoxes = function () {
        // Normalize height // Nothing to do
        // Positioning boxes // Nothing to do
    };

    // Export
    scope.MathIdentityRuleNode = MathIdentityRuleNode;
})(MyScript);