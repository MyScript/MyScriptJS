(function (scope) {

    /**
     *
     * @constructor
     */
    function QuadraticPoint (obj) {
        scope.Point.call(this, obj);
        this.pressure = 0.5;
        this.distance = 0.0;
        this.length = 0.0;
        this.ux = 0.0;
        this.uy = 0.0;
        this.x1 = 0.0;
        this.x2 = 0.0;
        this.y1 = 0.0;
        this.y2 = 0.0;
    }

    /**
     *
     * @type {MyScript.Point}
     */
    QuadraticPoint.prototype = new scope.Point();

    /**
     *
     * @type {QuadraticPoint}
     */
    QuadraticPoint.prototype.constructor = QuadraticPoint;

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getPressure = function () {
        return this.pressure;
    };

    /**
     *
     * @param {number} pressure
     */
    QuadraticPoint.prototype.setPressure = function (pressure) {
        this.pressure = pressure;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getDistance = function () {
        return this.distance;
    };

    /**
     *
     * @param {number} distance
     */
    QuadraticPoint.prototype.setDistance = function (distance) {
        this.distance = distance;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getLength = function () {
        return this.length;
    };

    /**
     *
     * @param {number} length
     */
    QuadraticPoint.prototype.setLength = function (length) {
        this.length = length;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getUx = function () {
        return this.ux;
    };

    /**
     *
     * @param {number} ux
     */
    QuadraticPoint.prototype.setUx = function (ux) {
        this.ux = ux;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getUy = function () {
        return this.uy;
    };

    /**
     *
     * @param {number} uy
     */
    QuadraticPoint.prototype.setUy = function (uy) {
        this.uy = uy;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getX1 = function () {
        return this.x1;
    };

    /**
     *
     * @param {number} x1
     */
    QuadraticPoint.prototype.setX1 = function (x1) {
        this.x1 = x1;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getX2 = function () {
        return this.x2;
    };

    /**
     *
     * @param {number} x2
     */
    QuadraticPoint.prototype.setX2 = function (x2) {
        this.x2 = x2;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getY1 = function () {
        return this.y1;
    };

    /**
     *
     * @param {number} y1
     */
    QuadraticPoint.prototype.setY1 = function (y1) {
        this.y1 = y1;
    };

    /**
     *
     * @returns {number}
     */
    QuadraticPoint.prototype.getY2 = function () {
        return this.y2;
    };

    /**
     *
     * @param {number} y2
     */
    QuadraticPoint.prototype.setY2 = function (y2) {
        this.y2 = y2;
    };

    // Export
    scope.QuadraticPoint = QuadraticPoint;
})(MyScript);