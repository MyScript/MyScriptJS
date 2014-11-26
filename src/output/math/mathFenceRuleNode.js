(function (scope) {

    /**
     * Math fence rule node
     *
     * @class MathFenceRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathFenceRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathFenceRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathFenceRuleNode.prototype.constructor = MathFenceRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathFenceRuleNode.prototype.computeBoxes = function () {

        //var termsHeights = [
        //    this.getChildren()[0].getHeight(),
        //    this.getChildren()[1].getHeight(),
        //    this.getChildren()[2].getHeight()
        //];
        //var normalHeight = Math.max.apply(Math, termsHeights);
        //
        //// Normalize height
        //for (var i in this.getChildren()) {
        //    this.getChildren()[i].setWidth((normalHeight * this.getChildren()[i].getWidth()) / this.getChildren()[i].getHeight());
        //    this.getChildren()[i].setHeight(normalHeight);
        //}

        // Positioning boxes - ref = Left fence // Ugly hack TODO: find another way
        // Middle term
        this.getChildren()[0].getBoundingBox().setX(this.getChildren()[1].getBoundingBox().getX() - this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[0].getBoundingBox().setY(this.getChildren()[1].getBoundingBox().getY());
        // Right fence
        this.getChildren()[2].getBoundingBox().setX(this.getChildren()[1].getBoundingBox().getX() + this.getChildren()[1].getBoundingBox().getWidth());
        this.getChildren()[2].getBoundingBox().setY(this.getChildren()[1].getBoundingBox().getY());
    };

    // Export
    scope.MathFenceRuleNode = MathFenceRuleNode;
})(MyScript);