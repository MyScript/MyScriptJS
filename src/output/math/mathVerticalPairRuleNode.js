(function (scope) {

    /**
     * Math vertical pair rule node
     *
     * @class MathVerticalPairRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathVerticalPairRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathVerticalPairRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathVerticalPairRuleNode.prototype.constructor = MathVerticalPairRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathVerticalPairRuleNode.prototype.computeBoxes = function () {

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
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() + this.getChildren()[0].getBoundingBox().getHeight());
    };

    // Export
    scope.MathVerticalPairRuleNode = MathVerticalPairRuleNode;
})(MyScript);