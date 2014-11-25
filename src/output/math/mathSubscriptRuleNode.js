(function (scope) {

    /**
     * Math subscript rule node
     *
     * @class MathSubscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSubscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSubscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSubscriptRuleNode.prototype.constructor = MathSubscriptRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathSubscriptRuleNode.prototype.computeBoxes = function () {

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

        var width = 0;
        for (var i in widthList) {
            width += widthList[i];
        }

        var height = 0;
        for (var i in heightList) {
            height += heightList[i];
        }

        // Ugly hack TODO: find another way
        // Exponentiable term
        this.getBoundingBoxes()[0].setX(xMin);
        this.getBoundingBoxes()[0].setY(yMin);
        // Sub term
        this.getBoundingBoxes()[1].setX((xMin + width) - this.getBoundingBoxes()[1].getWidth());
        this.getBoundingBoxes()[1].setY(yMin);

        var box = new scope.Rectangle();
        box.setX(xMin);
        box.setY(yMin);
        box.setWidth(width);
        box.setHeight(height);

        this.setBoundingBox(box);
    };

    // Export
    scope.MathSubscriptRuleNode = MathSubscriptRuleNode;
})(MyScript);