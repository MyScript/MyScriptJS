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
     * @returns {Number}
     */
    Rectangle.prototype.getX = function () {
        return this.x;
    };

    /**
     *
     * @param {Number}
     */
    Rectangle.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     *
     * @returns {Number}
     */
    Rectangle.prototype.getY = function () {
        return this.y;
    };

    /**
     *
     * @param {Number}
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
     * @returns {Number}
     */
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };

    /**
     *
     * @param {Number} width
     */
    Rectangle.prototype.setWidth = function (width) {
        this.width = width;
    };

    /**
     *
     * @returns {Number}
     */
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };

    /**
     *
     * @returns {Number} height
     */
    Rectangle.prototype.setHeight = function (height) {
        this.height = height;
    };

    // Export
    scope.Rectangle = Rectangle;
})(MyScript);