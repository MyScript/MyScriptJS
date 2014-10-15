/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function Point () {
        this.x = null;
        this.y = null;
    }

    /**
     *
     * @type {Object}
     */
    Point.prototype = Object.create(Object.prototype);

    /**
     *
     * @returns {number}
     */
    Point.prototype.getX = function () {
        return this.x;
    };

    /**
     *
     * @returns {number}
     */
    Point.prototype.getY = function () {
        return this.y;
    };

    /**
     *
     * @type {Point}
     */
    scope.Point = Point;
})(MyScript);