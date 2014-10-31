(function (scope) {

    /**
     * Complex Point object used for quadratic calculation
     *
     * @class QuadraticPoint
     * @param {Object} obj
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
     * Inheritance property
     */
    QuadraticPoint.prototype = new scope.Point();

    /**
     * Constructor property
     */
    QuadraticPoint.prototype.constructor = QuadraticPoint;

    /**
     * Get pressure
     *
     * @method getPressure
     * @returns {number}
     */
    QuadraticPoint.prototype.getPressure = function () {
        return this.pressure;
    };

    /**
     * Set pressure
     *
     * @method setPressure
     * @param {number} pressure
     */
    QuadraticPoint.prototype.setPressure = function (pressure) {
        this.pressure = pressure;
    };

    /**
     * Get distance
     *
     * @method getDistance
     * @returns {number}
     */
    QuadraticPoint.prototype.getDistance = function () {
        return this.distance;
    };

    /**
     * Set distance
     *
     * @method setDistance
     * @param {number} distance
     */
    QuadraticPoint.prototype.setDistance = function (distance) {
        this.distance = distance;
    };

    /**
     * Get length
     *
     * @method getLength
     * @returns {number}
     */
    QuadraticPoint.prototype.getLength = function () {
        return this.length;
    };

    /**
     * Set length
     *
     * @method setLength
     * @param {number} length
     */
    QuadraticPoint.prototype.setLength = function (length) {
        this.length = length;
    };

    /**
     * Get ux
     *
     * @method getUx
     * @returns {number}
     */
    QuadraticPoint.prototype.getUx = function () {
        return this.ux;
    };

    /**
     * Set ux
     *
     * @method setUx
     * @param {number} ux
     */
    QuadraticPoint.prototype.setUx = function (ux) {
        this.ux = ux;
    };

    /**
     * Get uy
     *
     * @method getUy
     * @returns {number}
     */
    QuadraticPoint.prototype.getUy = function () {
        return this.uy;
    };

    /**
     * Set uy
     *
     * @method setUy
     * @param {number} uy
     */
    QuadraticPoint.prototype.setUy = function (uy) {
        this.uy = uy;
    };

    /**
     * Get x1
     *
     * @method getX1
     * @returns {number}
     */
    QuadraticPoint.prototype.getX1 = function () {
        return this.x1;
    };

    /**
     * Set x1
     *
     * @method setX1
     * @param {number} x1
     */
    QuadraticPoint.prototype.setX1 = function (x1) {
        this.x1 = x1;
    };

    /**
     * Get x2
     *
     * @method getX2
     * @returns {number}
     */
    QuadraticPoint.prototype.getX2 = function () {
        return this.x2;
    };

    /**
     * Set x2
     *
     * @method setX2
     * @param {number} x2
     */
    QuadraticPoint.prototype.setX2 = function (x2) {
        this.x2 = x2;
    };

    /**
     * Get y1
     *
     * @method getY1
     * @returns {number}
     */
    QuadraticPoint.prototype.getY1 = function () {
        return this.y1;
    };

    /**
     * Set y2
     *
     * @method setY1
     * @param {number} y1
     */
    QuadraticPoint.prototype.setY1 = function (y1) {
        this.y1 = y1;
    };

    /**
     * Get y2
     *
     * @method getY2
     * @returns {number}
     */
    QuadraticPoint.prototype.getY2 = function () {
        return this.y2;
    };

    /**
     * Set y2
     *
     * @method setY2
     * @param {number} y2
     */
    QuadraticPoint.prototype.setY2 = function (y2) {
        this.y2 = y2;
    };

    // Export
    scope.QuadraticPoint = QuadraticPoint;
})(MyScript);