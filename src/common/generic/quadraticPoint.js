'use strict';

(function (scope) {
    /**
     * Complex Point object used for quadratic calculation
     *
     * @deprecated
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
        this.p1 = new scope.Point(obj);
        this.p2 = new scope.Point(obj);
        if (obj) {
            this.pressure = obj.pressure;
            this.distance = obj.distance;
            this.length = obj.length;
            this.cos = obj.cos;
            this.sin = obj.sin;
            this.p1 = new scope.Point(obj.p1);
            this.p2 = new scope.Point(obj.p2);
        }
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
     * Get p1
     *
     * @method getP1
     * @returns {Point}
     */
    QuadraticPoint.prototype.getP1 = function () {
        return this.p1;
    };

    /**
     * Set p1
     *
     * @method setP1
     * @param {Point} p1
     */
    QuadraticPoint.prototype.setP1 = function (p1) {
        this.p1 = p1;
    };

    /**
     * Get p2
     *
     * @method getP2
     * @returns {Point}
     */
    QuadraticPoint.prototype.getP2 = function () {
        return this.p2;
    };

    /**
     * Set p2
     *
     * @method setP2
     * @param {Point} p2
     */
    QuadraticPoint.prototype.setP2 = function (p2) {
        this.p2 = p2;
    };

    // Export
    scope.QuadraticPoint = QuadraticPoint;
})(MyScript);