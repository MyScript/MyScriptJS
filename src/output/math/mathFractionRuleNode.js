(function (scope) {

    /**
     * Math fraction rule node
     *
     * @class MathFractionRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathFractionRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathFractionRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathFractionRuleNode.prototype.constructor = MathFractionRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathFractionRuleNode.prototype.computeBoxes = function () {

        //var termsHeights = [
        //    this.getChildren()[0].getHeight(),
        //    this.getChildren()[1].getHeight(),
        //    this.getChildren()[2].getHeight()
        //];
        //var normalHeight = Math.max.apply(Math, termsHeights);
        //
        //// Normalize height
        //for (var i in this.getChildren()) {
        //    if (i > 0) { // Except fraction bar
        //        this.getChildren()[i].setWidth((normalHeight * this.getChildren()[i].getWidth()) / this.getChildren()[i].getHeight());
        //        this.getChildren()[i].setHeight(normalHeight);
        //    }
        //}
        //
        //var widths = [
        //    this.getChildren()[0].getWidth(),
        //    this.getChildren()[1].getWidth(),
        //    this.getChildren()[2].getWidth()
        //];
        //var maxWidth = Math.max.apply(Math, widths);
        //this.getChildren()[0].setWidth(maxWidth);


        // Positioning boxes - ref = Fraction bar // Ugly hack TODO: find another way
        // Top term
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - this.getChildren()[1].getBoundingBox().getHeight());
        // Bottom term
        this.getChildren()[2].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
        this.getChildren()[2].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() + this.getChildren()[0].getBoundingBox().getHeight());
    };

    // Export
    scope.MathFractionRuleNode = MathFractionRuleNode;
})(MyScript);