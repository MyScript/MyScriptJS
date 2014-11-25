(function (scope) {

    /**
     * Math pre-superscript rule node
     *
     * @class MathPreSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathPreSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathPreSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathPreSuperscriptRuleNode.prototype.constructor = MathPreSuperscriptRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathPreSuperscriptRuleNode.prototype.computeBoxes = function () {

        var xList = [],
            yList = [];

        for (var i in this.getBoundingBoxes()) {
            var rectangle = this.getBoundingBoxes()[i];
            xList.push(rectangle.getX());
            xList.push(rectangle.getX() + rectangle.getWidth());
            yList.push(rectangle.getY());
            yList.push(rectangle.getY() + rectangle.getHeight());
        }

        var xMin = Math.min.apply(Math, xList);
        var xMax = Math.max.apply(Math, xList);
        var yMin = Math.min.apply(Math, yList);
        var yMax = Math.max.apply(Math, yList);

        for (var i in this.getBoundingBoxes()) {
            this.getBoundingBoxes()[i].setX(xMin);
            this.getBoundingBoxes()[i].setY(yMin);
            this.getBoundingBoxes()[i].setWidth(xMax - xMin);
            this.getBoundingBoxes()[i].setHeight(yMax - yMin);
        }

        var box = new scope.Rectangle();
        box.setX(xMin);
        box.setY(yMin);
        box.setWidth(xMax - xMin);
        box.setHeight(yMax - yMin);

        this.setBoundingBox(box);
    };

    // Export
    scope.MathPreSuperscriptRuleNode = MathPreSuperscriptRuleNode;
})(MyScript);