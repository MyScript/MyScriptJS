(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function Point (obj) {
        this.x = null;
        this.y = null;
        for (var prop in obj) {
            this[prop] = obj[prop];
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
     * @returns {number}
     */
    Point.prototype.getY = function () {
        return this.y;
    };

    // Export
    scope.Point = Point;
})(MyScript);