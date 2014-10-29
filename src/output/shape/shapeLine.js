(function (scope) {

    /**
     *
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