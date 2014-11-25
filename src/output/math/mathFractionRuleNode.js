(function (scope) {

    /**
     * Math fraction rule node
     *
     * @class MathFractionRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathFractionRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathFractionRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathFractionRuleNode.prototype.constructor = MathFractionRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathFractionRuleNode.prototype.computeBoxes = function () {

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
        var widthMax = Math.max.apply(Math, widthList);
        var height = 0;
        for (var i in heightList) {
            height += heightList[i];
        }

        // Ugly hack TODO: find another way
        // Top term
        this.getBoundingBoxes()[1].setX(xMin);
        this.getBoundingBoxes()[1].setY(yMin);
        // Fraction bar
        this.getBoundingBoxes()[0].setX(xMin);
        this.getBoundingBoxes()[0].setY(yMin + this.getBoundingBoxes()[1].getHeight());
        // Bottom term
        this.getBoundingBoxes()[2].setX(xMin);
        this.getBoundingBoxes()[2].setY((yMin + height) - this.getBoundingBoxes()[2].getHeight());

        var box = new scope.Rectangle();
        box.setX(xMin);
        box.setY(yMin);
        box.setWidth(widthMax);
        box.setHeight(height);

        this.setBoundingBox(box);
    };

    // Export
    scope.MathFractionRuleNode = MathFractionRuleNode;
})(MyScript);