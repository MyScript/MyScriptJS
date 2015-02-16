(function (scope) {
    'use strict';
    /**
     * Shape point
     *
     * @class ShapePoint
     * @extends Point
     * @param {Object} [obj]
     * @constructor
     */
    function ShapePoint (obj) {
        scope.Point.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ShapePoint.prototype = new scope.Point();

    /**
     * Constructor property
     */
    ShapePoint.prototype.constructor = ShapePoint;

    // Export
    scope.ShapePoint = ShapePoint;
})(MyScript);