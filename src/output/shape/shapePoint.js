(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapePoint () {
        scope.Point.call(this);
    }

    /**
     *
     * @type {Point}
     */
    ShapePoint.prototype.__proto__ = new scope.Point();

    // Export
    scope.ShapePoint = ShapePoint;
})(MyScript);