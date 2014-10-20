(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapePoint (obj) {
        scope.Point.call(this, obj);
    }

    /**
     *
     * @type {MyScript.Point}
     */
    ShapePoint.prototype = new scope.Point();

    /**
     *
     * @type {ShapePoint}
     */
    ShapePoint.prototype.constructor = ShapePoint;

    // Export
    scope.ShapePoint = ShapePoint;
})(MyScript);