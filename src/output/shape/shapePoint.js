(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapePoint (obj) {
        scope.Point.call(this, obj);
        for (var prop in obj) {
            this[prop] = obj[prop];
        }
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