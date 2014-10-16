(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeEllipse () {
        scope.AbstractDecoratedShape.call(this);
        this.center = null;
        this.minRadius = null;
        this.maxRadius = null;
        this.orientation = null;
        this.startAngle = null;
        this.sweepAngle = null;
    }

    /**
     *
     * @type {AbstractDecoratedShape}
     */
    ShapeEllipse.prototype.__proto__ = new scope.AbstractDecoratedShape();

    /**
     *
     * @returns {ShapePoint}
     */
    ShapeEllipse.prototype.getCenter = function () {
        return this.center;
    };

    /**
     *
     * @returns {number}
     */
    ShapeEllipse.prototype.getMinRadius = function () {
        return this.minRadius;
    };

    /**
     *
     * @returns {number}
     */
    ShapeEllipse.prototype.getMaxRadius = function () {
        return this.maxRadius;
    };

    /**
     *
     * @returns {string}
     */
    ShapeEllipse.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     *
     * @returns {number}
     */
    ShapeEllipse.prototype.getStartAngle = function () {
        return this.startAngle;
    };

    /**
     *
     * @returns {number}
     */
    ShapeEllipse.prototype.getSweepAngle = function () {
        return this.sweepAngle;
    };

    // Export
    scope.ShapeEllipse = ShapeEllipse;
})(MyScript);