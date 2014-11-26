(function (scope) {

    /**
     * Math under-overscript rule node
     *
     * @class MathUnderOverscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathUnderOverscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathUnderOverscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathUnderOverscriptRuleNode.prototype.constructor = MathUnderOverscriptRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathUnderOverscriptRuleNode.prototype.computeBoxes = function () {
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

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - (this.getChildren()[0].getBoundingBox().getHeight() / 2));
    };

    // Export
    scope.MathUnderOverscriptRuleNode = MathUnderOverscriptRuleNode;
})(MyScript);