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

        var xList = [],
            yList = [],
            widthList = [],
            heightList = [];

        for (var i in this.getBoundingBoxes()) {
            var rectangle = this.getBoundingBoxes()[i];
            xList.push(rectangle.getX());
            yList.push(rectangle.getY());
            heightList.push(rectangle.getHeight());
            widthList.push(rectangle.getWidth());
        }

        var xMin = Math.min.apply(Math, xList);
        var yMin = Math.min.apply(Math, yList);
        var heightMax = Math.max.apply(Math, heightList);
        var width = 0;
        for (var i in widthList) {
            width += widthList[i];
        }

        // Ugly hack TODO: find another way
        // Left fence
        this.getBoundingBoxes()[1].setX(xMin);
        this.getBoundingBoxes()[1].setY(yMin);
        // Middle term
        this.getBoundingBoxes()[0].setX(xMin + this.getBoundingBoxes()[1].getWidth());
        this.getBoundingBoxes()[0].setY(yMin);
        // Right fence
        this.getBoundingBoxes()[2].setX(width - this.getBoundingBoxes()[2].getWidth());
        this.getBoundingBoxes()[2].setY(yMin);

        var box = new scope.Rectangle();
        box.setX(xMin);
        box.setY(yMin);
        box.setWidth(width);
        box.setHeight(heightMax);

        this.setBoundingBox(box);
    };

    // Export
    scope.MathFenceRuleNode = MathFenceRuleNode;
})(MyScript);