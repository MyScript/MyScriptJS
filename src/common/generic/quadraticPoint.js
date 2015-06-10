'use strict';

(function (scope) {
    /**
     * Complex Point object used for quadratic calculation
     *
     * @class QuadraticPoint
     * @extends Point
     * @param {Object} [obj]
     * @constructor
     */
    function QuadraticPoint(obj) {
        scope.Point.call(this, obj);
        this.pressure = 0.5;
        this.distance = 0.0;
        this.length = 0.0;
        this.cos = 0.0;
        this.sin = 0.0;
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
     * @returns {Number}
     */
    QuadraticPoint.prototype.getPressure = function () {
        return this.pressure;
    };

    /**
     * Set pressure
     *
     * @method setPressure
     * @param {Number} pressure
     */
    QuadraticPoint.prototype.setPressure = function (pressure) {
        this.pressure = pressure;
    };

    /**
     * Get distance
     *
     * @method getDistance
     * @returns {Number}
     */
    QuadraticPoint.prototype.getDistance = function () {
        return this.distance;
    };

    /**
     * Set distance
     *
     * @method setDistance
     * @param {Number} distance
     */
    QuadraticPoint.prototype.setDistance = function (distance) {
        this.distance = distance;
    };

    /**
     * Get length
     *
     * @method getLength
     * @returns {Number}
     */
    QuadraticPoint.prototype.getLength = function () {
        return this.length;
    };

    /**
     * Set length
     *
     * @method setLength
     * @param {Number} length
     */
    QuadraticPoint.prototype.setLength = function (length) {
        this.length = length;
    };

    /**
     * Get cos
     *
     * @method getCos
     * @returns {Number}
     */
    QuadraticPoint.prototype.getCos = function () {
        return this.cos;
    };

    /**
     * Set cos
     *
     * @method setCos
     * @param {Number} cos
     */
    QuadraticPoint.prototype.setCos = function (cos) {
        this.cos = cos;
    };

    /**
     * Get sin
     *
     * @method getSin
     * @returns {Number}
     */
    QuadraticPoint.prototype.getSin = function () {
        return this.sin;
    };

    /**
     * Set sin
     *
     * @method setSin
     * @param {Number} sin
     */
    QuadraticPoint.prototype.setSin = function (sin) {
        this.sin = sin;
    };

    /**
     * Get x1
     *
     * @method getX1
     * @returns {Number}
     */
    QuadraticPoint.prototype.getX1 = function () {
        return this.x1;
    };

    /**
     * Set x1
     *
     * @method setX1
     * @param {Number} x1
     */
    QuadraticPoint.prototype.setX1 = function (x1) {
        this.x1 = x1;
    };

    /**
     * Get x2
     *
     * @method getX2
     * @returns {Number}
     */
    QuadraticPoint.prototype.getX2 = function () {
        return this.x2;
    };

    /**
     * Set x2
     *
     * @method setX2
     * @param {Number} x2
     */
    QuadraticPoint.prototype.setX2 = function (x2) {
        this.x2 = x2;
    };

    /**
     * Get y1
     *
     * @method getY1
     * @returns {Number}
     */
    QuadraticPoint.prototype.getY1 = function () {
        return this.y1;
    };

    /**
     * Set y2
     *
     * @method setY1
     * @param {Number} y1
     */
    QuadraticPoint.prototype.setY1 = function (y1) {
        this.y1 = y1;
    };

    /**
     * Get y2
     *
     * @method getY2
     * @returns {Number}
     */
    QuadraticPoint.prototype.getY2 = function () {
        return this.y2;
    };

    /**
     * Set y2
     *
     * @method setY2
     * @param {Number} y2
     */
    QuadraticPoint.prototype.setY2 = function (y2) {
        this.y2 = y2;
    };

    // Export
    scope.QuadraticPoint = QuadraticPoint;
})(MyScript);