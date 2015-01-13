(function (scope) {

    /**
     * Shape ink range
     *
     * @class ShapeInkRange
     * @param {Object} obj
     * @constructor
     */
    function ShapeInkRange (obj) {
        if (obj) {
            this.firstStroke = this.firstStroke;
            this.lastStroke = this.lastStroke;
            this.firstPoint = new scope.ShapePoint(obj.firstPoint);
            this.lastPoint = new scope.ShapePoint(obj.lastPoint);
        }
    }

    /**
     * Get first stroke
     *
     * @method getFirstStroke
     * @returns {Number}
     */
    ShapeInkRange.prototype.getFirstStroke = function () {
        return this.firstStroke;
    };

    /**
     * Get last stroke
     *
     * @method getLastStroke
     * @returns {Number}
     */
    ShapeInkRange.prototype.getLastStroke = function () {
        return this.lastStroke;
    };

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {MyScript.ShapePoint}
     */
    ShapeInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {MyScript.ShapePoint}
     */
    ShapeInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    // Export
    scope.ShapeInkRange = ShapeInkRange;
})(MyScript);