/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeInkRange () {
        this.firstStroke = null;
        this.lastStroke = null;
        this.firstPoint = null;
        this.lastPoint = null;
    }

    /**
     *
     * @type {Object}
     */
    ShapeInkRange.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {ShapeInkRange}
     */
    scope.ShapeInkRange = ShapeInkRange;
})(MyScript);