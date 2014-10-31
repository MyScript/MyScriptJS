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
     * @returns {Number}
     */
    Point.prototype.getX = function () {
        return this.x;
    };

    /**
     *
     * @param {Number} x
     */
    Point.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     *
     * @returns {Number}
     */
    Point.prototype.getY = function () {
        return this.y;
    };

    /**
     *
     * @param {Number} y
     */
    Point.prototype.setY = function (y) {
        this.y = y;
    };

    // Export
    scope.Point = Point;
})(MyScript);