(function (scope) {

    /**
     * Math superscript rule node
     *
     * @class MathSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSuperscriptRuleNode.prototype.constructor = MathSuperscriptRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathSuperscriptRuleNode.prototype.computeBoxes = function () {
        var height = Math.max.apply(Math, [
            this.getChildren()[0].getBoundingBox().getHeight(),
            this.getChildren()[1].getBoundingBox().getHeight()
        ]);

        // Normalize height
        this.getChildren()[0].getBoundingBox().setHeight(height);
        this.getChildren()[1].getBoundingBox().setHeight(height * (2 /3));

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
        this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
        this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - (height * (1 /3)));
    };

    // Export
    scope.MathSuperscriptRuleNode = MathSuperscriptRuleNode;
})(MyScript);