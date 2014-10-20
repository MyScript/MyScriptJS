(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function ShapeEllipse (obj) {
        scope.AbstractDecoratedShape.call(this, obj);
        this.center = null;
        this.minRadius = null;
        this.maxRadius = null;
        this.orientation = null;
        this.startAngle = null;
        this.sweepAngle = null;
        if (obj) {
            this.center = new scope.ShapePoint(obj.center);
            this.minRadius = obj.minRadius;
            this.maxRadius = obj.maxRadius;
            this.orientation = obj.orientation;
            this.startAngle = obj.startAngle;
            this.sweepAngle = obj.sweepAngle;
        }
    }

    /**
     *
     * @type {MyScript.AbstractDecoratedShape}
     */
    ShapeEllipse.prototype = new scope.AbstractDecoratedShape();

    /**
     *
     * @type {ShapeEllipse}
     */
    ShapeEllipse.prototype.constructor = ShapeEllipse;

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