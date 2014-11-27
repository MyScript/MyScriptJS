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
        var height = Math.max.apply(Math, [
            this.getChildren()[0].getBoundingBox().getHeight(),
            this.getChildren()[1].getBoundingBox().getHeight(),
            this.getChildren()[2].getBoundingBox().getHeight()
        ]);

        // Normalize height
        for (var i in this.getChildren()) {
            this.getChildren()[i].getBoundingBox().setHeight(height);
        }

        var width = Math.max.apply(Math, [
            this.getChildren()[0].getBoundingBox().getWidth(),
            this.getChildren()[1].getBoundingBox().getWidth(),
            this.getChildren()[2].getBoundingBox().getWidth()
        ]);

        // Normalize width
        this.getChildren()[0].getBoundingBox().setWidth(width * (1/3));
        this.getChildren()[1].getBoundingBox().setWidth(width);
        this.getChildren()[2].getBoundingBox().setWidth(width * (1/3));

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