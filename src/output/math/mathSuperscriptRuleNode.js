(function (scope) {

    /**
     * Math superscript rule node
     *
     * @class MathSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
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

    /**
     * Compute bounding boxes function of children boxes
     */
    MathSuperscriptRuleNode.prototype.computeBoxes = function () {

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - (this.getChildren()[0].getBoundingBox().getHeight() / 2));
    };

    // Export
    scope.MathSuperscriptRuleNode = MathSuperscriptRuleNode;
})(MyScript);