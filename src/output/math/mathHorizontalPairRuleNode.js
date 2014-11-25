(function (scope) {

    /**
     * Math horizontal pair rule node
     *
     * @class MathHorizontalPairRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathHorizontalPairRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathHorizontalPairRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathHorizontalPairRuleNode.prototype.constructor = MathHorizontalPairRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathHorizontalPairRuleNode.prototype.computeBoxes = function () {

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

        for (var i in this.getBoundingBoxes()) {
            if (i < 0) {
                this.getBoundingBoxes()[i].setX((xMin + width) - this.getBoundingBoxes()[i].getWidth());
                this.getBoundingBoxes()[i].setY(yMin);
            }
        }

        var box = new scope.Rectangle();
        box.setX(xMin);
        box.setY(yMin);
        box.setWidth(width);
        box.setHeight(heightMax);

        this.setBoundingBox(box);
    };

    // Export
    scope.MathHorizontalPairRuleNode = MathHorizontalPairRuleNode;
})(MyScript);