(function (scope) {

    /**
     * Math overscript rule node
     *
     * @class MathOverscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathOverscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathOverscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathOverscriptRuleNode.prototype.constructor = MathOverscriptRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathOverscriptRuleNode.prototype.computeBoxes = function () {
        //var termsHeights = [
        //    this.getChildren()[0].getHeight(),
        //    this.getChildren()[1].getHeight()
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

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
        // Top term
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - this.getChildren()[1].getBoundingBox().getHeight());
    };

    // Export
    scope.MathOverscriptRuleNode = MathOverscriptRuleNode;
})(MyScript);