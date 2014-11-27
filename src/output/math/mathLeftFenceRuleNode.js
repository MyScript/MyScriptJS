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
        var height = Math.max.apply(Math, [
            this.getChildren()[0].getBoundingBox().getHeight(),
            this.getChildren()[1].getBoundingBox().getHeight()
        ]);

        // Normalize height
        for (var i in this.getChildren()) {
            this.getChildren()[i].getBoundingBox().setWidth((height * this.getChildren()[i].getBoundingBox().getWidth()) / this.getChildren()[i].getBoundingBox().getHeight());
            this.getChildren()[i].getBoundingBox().setHeight(height);
        }

        // Positioning boxes - ref = Left fence // Ugly hack TODO: find another way
        // Vector term
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY());
    };

    // Export
    scope.MathLeftFenceRuleNode = MathLeftFenceRuleNode;
})(MyScript);