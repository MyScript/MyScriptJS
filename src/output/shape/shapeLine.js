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
     * @type {MyScript.AbstractDecoratedShape}
     */
    ShapeLine.prototype = new scope.AbstractDecoratedShape();

    /**
     *
     * @type {ShapeLine}
     */
    ShapeLine.prototype.constructor = ShapeLine;

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