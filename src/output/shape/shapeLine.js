/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeLine () {
        this.firstPoint = null;
        this.lastPoint = null;
    }

    /**
     *
     * @type {AbstractDecoratedShape}
     */
    ShapeLine.prototype = Object.create(scope.AbstractDecoratedShape.prototype);

    /**
     *
     * @returns {ShapePoint}
     */
    ShapeLine.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     *
     * @returns {ShapePoint}
     */
    ShapeLine.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    /**
     *
     * @type {ShapeLine}
     */
    scope.ShapeLine = ShapeLine;
})(MyScript);