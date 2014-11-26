(function (scope) {

    /**
     * Math underscript rule node
     *
     * @class MathUnderscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathUnderscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathUnderscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathUnderscriptRuleNode.prototype.constructor = MathUnderscriptRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathUnderscriptRuleNode.prototype.computeBoxes = function () {
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

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
        // Top term
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - this.getChildren()[1].getBoundingBox().getHeight());
    };

    // Export
    scope.MathUnderscriptRuleNode = MathUnderscriptRuleNode;
})(MyScript);