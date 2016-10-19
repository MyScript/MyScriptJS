'use strict';

(function (scope) {
    /**
     * Point
     *
     * @class Point
     * @param {Object} [obj]
     * @constructor
     */
    function Point(obj) {
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
        }
    }

    /**
     * Get x
     *
     * @method getX
     * @returns {Number}
     */
    Point.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set x
     *
     * @method setX
     * @param {Number} x
     */
    Point.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Get y
     *
     * @method getY
     * @returns {Number}
     */
    Point.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set y
     *
     * @method setY
     * @param {Number} y
     */
    Point.prototype.setY = function (y) {
        this.y = y;
    };

    // Export
    scope.Point = Point;
})(MyScript);