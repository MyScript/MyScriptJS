(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function Rectangle () {
    }

    /**
     *
     * @returns {number}
     */
    Rectangle.prototype.getX = function () {
        return this.x;
    };

    /**
     *
     * @param {number}
     */
    Rectangle.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     *
     * @returns {number}
     */
    Rectangle.prototype.getY = function () {
        return this.y;
    };

    /**
     *
     * @param {number}
     */
    Rectangle.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     *
     * @returns {Point}
     */
    Rectangle.prototype.getTopLeftPoint = function () {
        var point = new scope.Point();
        point.setX(this.x);
        point.setY(this.y);
        return point;
    };

    /**
     *
     * @param {Point} topLeftPoint
     */
    Rectangle.prototype.setTopLeftPoint = function (topLeftPoint) {
        this.x = topLeftPoint.getX();
        this.y = topLeftPoint.getY();
    };

    /**
     *
     * @returns {number}
     */
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };

    /**
     *
     * @param {number} width
     */
    Rectangle.prototype.setWidth = function (width) {
        this.width = width;
    };

    /**
     *
     * @returns {number}
     */
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };

    /**
     *
     * @returns {number} height
     */
    Rectangle.prototype.setHeight = function (height) {
        this.height = height;
    };

    // Export
    scope.Rectangle = Rectangle;
})(MyScript);