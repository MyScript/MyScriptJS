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
    ShapeLine.prototype.__proto__ = new scope.AbstractDecoratedShape();

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

    // Export
    scope.ShapeLine = ShapeLine;
})(MyScript);