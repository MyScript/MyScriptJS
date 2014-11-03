(function (scope) {

    /**
     * Shape line
     *
     * @class ShapeLine
     * @extends AbstractDecoratedShape
     * @param {Object} obj
     * @constructor
     */
    function ShapeLine (obj) {
        scope.AbstractDecoratedShape.call(this, obj);
        if (obj) {
            this.firstPoint = new scope.ShapePoint(obj.firstPoint);
            this.lastPoint = new scope.ShapePoint(obj.lastPoint);
        }
    }

    /**
     * Inheritance property
     */
    ShapeLine.prototype = new scope.AbstractDecoratedShape();

    /**
     * Constructor property
     */
    ShapeLine.prototype.constructor = ShapeLine;

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {ShapePoint}
     */
    ShapeLine.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {ShapePoint}
     */
    ShapeLine.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    /**
     * Get line bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    ShapeLine.prototype.getBoundingBox = function () {
        return scope.MathUtils.getLineRect(
            this.getFirstPoint(),
            this.getLastPoint());
    };

    // Export
    scope.ShapeLine = ShapeLine;
})(MyScript);