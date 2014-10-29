(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function Point (obj) {
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
        }
    }

    /**
     *
     * @returns {number}
     */
    Point.prototype.getX = function () {
        return this.x;
    };

    /**
     *
     * @param {number} x
     */
    Point.prototype.setX = function (x) {
        this.x = x;
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
     * @param {number} y
     */
    Point.prototype.setY = function (y) {
        this.y = y;
    };

    // Export
    scope.Point = Point;
})(MyScript);