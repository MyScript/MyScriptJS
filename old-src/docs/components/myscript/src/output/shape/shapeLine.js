'use strict';

(function (scope) {
    /**
     * Shape line
     *
     * @class ShapeLine
     * @extends AbstractShapePrimitive
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeLine(obj) {
        scope.AbstractShapePrimitive.call(this, obj);
        if (obj) {
            this.firstPoint = new scope.Point(obj.firstPoint);
            this.lastPoint = new scope.Point(obj.lastPoint);
        }
    }

    /**
     * Inheritance property
     */
    ShapeLine.prototype = new scope.AbstractShapePrimitive();

    /**
     * Constructor property
     */
    ShapeLine.prototype.constructor = ShapeLine;

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {Point}
     */
    ShapeLine.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {Point}
     */
    ShapeLine.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    // Export
    scope.ShapeLine = ShapeLine;
})(MyScript);