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
        //var height = Math.max.apply(Math, [
        //    this.getChildren()[0].getBoundingBox().getHeight(),
        //    this.getChildren()[1].getBoundingBox().getHeight(),
        //    this.getChildren()[2].getBoundingBox().getHeight()
        //]);
        //
        //// Normalize height
        //for (var i in this.getChildren()) {
        //    this.getChildren()[i].getBoundingBox().setWidth((height * this.getChildren()[i].getBoundingBox().getWidth()) / this.getChildren()[i].getBoundingBox().getHeight());
        //    this.getChildren()[i].getBoundingBox().setHeight(height);
        //}

        var width = Math.max.apply(Math, [
            this.getChildren()[0].getBoundingBox().getWidth(),
            this.getChildren()[1].getBoundingBox().getWidth(),
            this.getChildren()[2].getBoundingBox().getWidth()
        ]);

        // Normalize width
        for (var i in this.getChildren()) {
            this.getChildren()[i].getBoundingBox().setWidth(width);
            this.getChildren()[i].getBoundingBox().setWidth(width);
        }

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - (this.getChildren()[0].getBoundingBox().getHeight() / 2));
    };

    // Export
    scope.MathUnderOverscriptRuleNode = MathUnderOverscriptRuleNode;
})(MyScript);