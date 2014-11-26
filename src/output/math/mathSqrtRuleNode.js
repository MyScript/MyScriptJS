(function (scope) {

    /**
     * Math sqrt rule node
     *
     * @class MathSqrtRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSqrtRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSqrtRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSqrtRuleNode.prototype.constructor = MathSqrtRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathSqrtRuleNode.prototype.computeBoxes = function () {

        // Positioning boxes - ref = Sqrt // Ugly hack TODO: find another way
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + (this.getChildren()[0].getBoundingBox().getWidth() - this.getChildren()[1].getBoundingBox().getWidth()));
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() + (this.getChildren()[0].getBoundingBox().getHeight() - this.getChildren()[1].getBoundingBox().getHeight()));
    };

    // Export
    scope.MathSqrtRuleNode = MathSqrtRuleNode;
})(MyScript);