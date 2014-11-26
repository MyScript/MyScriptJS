(function (scope) {

    /**
     * Math sub-superscript rule node
     *
     * @class MathSubSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
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

    /**
     * Compute bounding boxes function of children boxes
     */
    MathSubSuperscriptRuleNode.prototype.computeBoxes = function () {

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() + (this.getChildren()[0].getBoundingBox().getHeight() / 2));
        this.getChildren()[2].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[2].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - (this.getChildren()[0].getBoundingBox().getHeight() / 2));
    };

    // Export
    scope.MathSubSuperscriptRuleNode = MathSubSuperscriptRuleNode;
})(MyScript);