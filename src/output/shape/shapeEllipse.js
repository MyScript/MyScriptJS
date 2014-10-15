/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeEllipse () {
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
    ShapeEllipse.prototype = Object.create(scope.AbstractDecoratedShape.prototype);

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

    /**
     *
     * @type {ShapeEllipse}
     */
    scope.ShapeEllipse = ShapeEllipse;
})(MyScript);