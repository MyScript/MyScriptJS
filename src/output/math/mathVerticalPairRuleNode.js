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
        //var height = Math.max.apply(Math, [
        //    this.getChildren()[0].getBoundingBox().getHeight(),
        //    this.getChildren()[1].getBoundingBox().getHeight()
        //]);
        //
        //// Normalize height
        //for (var i in this.getChildren()) {
        //    this.getChildren()[i].getBoundingBox().setWidth((height * this.getChildren()[i].getBoundingBox().getWidth()) / this.getChildren()[i].getBoundingBox().getHeight());
        //    this.getChildren()[i].getBoundingBox().setHeight(height);
        //}

        var width = Math.max.apply(Math, [
            this.getChildren()[0].getBoundingBox().getWidth(),
            this.getChildren()[1].getBoundingBox().getWidth()
        ]);

        // Normalize width
        for (var i in this.getChildren()) {
            this.getChildren()[i].getBoundingBox().setWidth(width);
            this.getChildren()[i].getBoundingBox().setWidth(width);
        }

        // Positioning boxes - ref = Left fence // Ugly hack TODO: find another way
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() + this.getChildren()[0].getBoundingBox().getHeight());
    };

    // Export
    scope.MathVerticalPairRuleNode = MathVerticalPairRuleNode;
})(MyScript);