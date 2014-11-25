(function (scope) {

    /**
     * Math sub-superscript rule node
     *
     * @class MathSubSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSubSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSubSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSubSuperscriptRuleNode.prototype.constructor = MathSubSuperscriptRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathSubSuperscriptRuleNode.prototype.computeBoxes = function () {

        var termWidth = Math.max.apply(Math, [this.getBoundingBoxes()[1].getWidth(), this.getBoundingBoxes()[2].getWidth()]);

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

        var width = this.getBoundingBoxes()[0].getWidth() + termWidth;

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
        // Super term
        this.getBoundingBoxes()[2].setX((xMin + width) - this.getBoundingBoxes()[2].getWidth());
        this.getBoundingBoxes()[2].setY(yMin);

        var box = new scope.Rectangle();
        box.setX(xMin);
        box.setY(yMin);
        box.setWidth(width);
        box.setHeight(height);

        this.setBoundingBox(box);
    };

    // Export
    scope.MathSubSuperscriptRuleNode = MathSubSuperscriptRuleNode;
})(MyScript);