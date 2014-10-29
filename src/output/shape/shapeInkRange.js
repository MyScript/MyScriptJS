(function (scope) {

    /**
     *
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
     *
     * @returns {null|*}
     */
    ShapeInkRange.prototype.getFirstStroke = function () {
        return this.firstStroke;
    };

    /**
     *
     * @returns {null|*}
     */
    ShapeInkRange.prototype.getLastStroke = function () {
        return this.lastStroke;
    };

    /**
     *
     * @returns {ShapePoint}
     */
    ShapeInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     *
     * @returns {ShapePoint}
     */
    ShapeInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    // Export
    scope.ShapeInkRange = ShapeInkRange;
})(MyScript);