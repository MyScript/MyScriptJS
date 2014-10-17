(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapePoint () {
    }

    /**
     *
     * @type {Point}
     */
    ShapePoint.prototype.__proto__ = new scope.Point();

    // Export
    scope.ShapePoint = ShapePoint;
})(MyScript);