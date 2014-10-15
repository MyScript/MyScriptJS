/**
 *
 * @param scope
 */
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
    ShapePoint.prototype = Object.create(scope.Point.prototype);

    /**
     *
     * @type {ShapePoint}
     */
    scope.ShapePoint = ShapePoint;
})(MyScript);