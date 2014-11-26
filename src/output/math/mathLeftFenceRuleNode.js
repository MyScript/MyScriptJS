(function (scope) {

    /**
     * Math rule node
     *
     * @class MathLeftFenceRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathLeftFenceRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathLeftFenceRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathLeftFenceRuleNode.prototype.constructor = MathLeftFenceRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathLeftFenceRuleNode.prototype.computeBoxes = function () {
        //var termsHeights = [
        //    this.getChildren()[0].getHeight(),
        //    this.getChildren()[1].getHeight()
        //];
        //var normalHeight = Math.max.apply(Math, termsHeights);
        //
        //// Normalize height
        //for (var i in this.getChildren()) {
        //    this.getChildren()[i].setWidth((normalHeight * this.getChildren()[i].getWidth()) / this.getChildren()[i].getHeight());
        //    this.getChildren()[i].setHeight(normalHeight);
        //}

        // Positioning boxes - ref = Left fence // Ugly hack TODO: find another way
        // Vector term
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY());
    };

    // Export
    scope.MathLeftFenceRuleNode = MathLeftFenceRuleNode;
})(MyScript);