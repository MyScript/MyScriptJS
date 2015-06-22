'use strict';

(function (scope) {
    /**
     * Represent a simple stroke input component
     *
     * @class Stroke
     * @extends AbstractComponent
     * @constructor
     */
    function Stroke(obj) {
        scope.AbstractComponent.call(this);
        this.type = 'stroke';
        this.x = [];
        this.y = [];
        this.t = [];
        this.p = [];
        this.d = [];
        this.l = [];
        this.color = undefined;
        this.alpha = undefined;
        this.width = 0;
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.t = obj.t;
            this.p = obj.p;
            this.d = obj.p;
            this.l = obj.l;
            this.color = obj.color;
            this.alpha = undefined;
            this.width = obj.width;
        }
    }

    /**
     * Inheritance property
     */
    Stroke.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    Stroke.prototype.constructor = Stroke;

    /**     *
     * @method toJSON
     * @returns {Object}
     */
    Stroke.prototype.toJSON = function () {
        return {type: this.type, x: this.x,y: this.y,t: this.t};
    };

    /**
     * Get the list of x coordinates
     *
     * @method getX
     * @returns {Number[]}
     */
    Stroke.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set the list of x coordinates
     *
     * @method setX
     * @param {Number[]} x
     */
    Stroke.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Add a x to the list of x coordinates
     *
     * @method addX
     * @param {Number} x
     */
    Stroke.prototype.addX = function (x) {
        if ((x !== null) && (x !== undefined)) {
            this.x.push(x);
        }
    };

    /**
     * Get the list of y coordinates
     *
     * @method getY
     * @returns {Number[]}
     */
    Stroke.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set the list of y coordinates
     *
     * @method setY
     * @param {Number[]} y
     */
    Stroke.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     * Add a y to the list of y coordinates
     *
     * @method addY
     * @param {Number} y
     */
    Stroke.prototype.addY = function (y) {
        if ((y !== null) && (y !== undefined)) {
            this.y.push(y);
        }
    };

    /**
     * Get the list of timestamps
     *
     * @method getT
     * @returns {Number[]}
     */
    Stroke.prototype.getT = function () {
        return this.t;
    };

    /**
     * Set the list of timestamps
     *
     * @method setT
     * @param {Number[]} t
     */
    Stroke.prototype.setT = function (t) {
        this.t = t;
    };

    /**
     * Add a timestamp to the list
     *
     * @method addT
     * @param {Number} t
     */
    Stroke.prototype.addT = function (t) {
        if ((t !== null) && (t !== undefined)) {
            this.t.push(t);
        }
    };

    Stroke.prototype.getP = function () {
        return this.p;
    };

    Stroke.prototype.setP = function (p) {
        this.p = p;
    };

    Stroke.prototype.addP = function (p) {
        if ((p !== null) && (p !== undefined)) {
            this.p.push(p);
        }
    };

    Stroke.prototype.getD = function () {
        return this.d;
    };

    Stroke.prototype.setD = function (d) {
        this.d = d;
    };

    Stroke.prototype.addD = function (d) {
        if ((d !== null) && (d !== undefined)) {
            this.d.push(d);
        }
    };

    Stroke.prototype.getL = function () {
        return this.l;
    };

    Stroke.prototype.setL = function (l) {
        this.l = l;
    };

    Stroke.prototype.addL = function (l) {
        if ((l !== null) && (l !== undefined)) {
            this.l.push(l);
        }
    };

    Stroke.prototype.getColor = function () {
        return this.color;
    };

    Stroke.prototype.setColor = function (color) {
        this.color = color;
    };

    Stroke.prototype.getAlpha = function () {
        return this.alpha;
    };

    Stroke.prototype.setAlpha = function (alpha) {
        this.alpha = alpha;
    };

    Stroke.prototype.getWidth = function () {
        return this.width;
    };

    Stroke.prototype.setWidth = function (width) {
        this.width = width;
    };

    Stroke.prototype.addPoint = function (x, y, t) {
        if(this.filterPointByAcquisitionDelta(x, y)){
            this.addX(x);
            this.addY(y);
            this.addT(t);
            this.addP(this.computeP(x, y));
            this.addD(this.computeD(x, y));
            this.addL(this.computeL(x, y));
        }
    };

    Stroke.prototype.getLastIndexPoint = function () {
        return this.x.length - 1;
    };

    Stroke.prototype.getLength = function () {
        return this.x.length;
    };

    Stroke.prototype.getPointByIndex = function (index){
        var point;
        if(index !== undefined && index >= 0 && index < this.getLength()){
            point = {
                x : this.getX()[index],
                y : this.getY()[index],
                t : this.getT()[index],
                p : this.getP()[index],
                d : this.getD()[index],
                l : this.getL()[index]
            };
        }
      return point;
    };

    Stroke.prototype.computeD = function (x, y) {
        var distance = Math.sqrt(Math.pow((y - this.getY()[this.getLastIndexPoint() - 1]), 2) + Math.pow((x - this.getX()[this.getLastIndexPoint() - 1]), 2));

        if (isNaN(distance)){
            distance = 0;
        }

        return distance;
    };

    Stroke.prototype.computeL = function (x, y) {
        var length = this.getL()[this.getLastIndexPoint() - 1] + this.computeD(x,y);

        if (isNaN(length)){
            length = 0;
        }

        return length;
    };

    Stroke.prototype.computeP = function (x, y) {
        var ratio = 1.0;
        var distance = this.computeD(x,y);
        var length = this.computeL(x,y);
        if (distance < 10){
            ratio = 0.2 + Math.pow(0.1 * distance, 0.4);
        }else if (distance > length - 10){
            ratio = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
        }
        var pressure = ratio * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(distance));
        if (isNaN(parseFloat(pressure))){
            pressure = 0.5;
        }
        return pressure;
    };

    Stroke.prototype.filterPointByAcquisitionDelta = function (x, y){
        var delta = (2 + (this.getWidth() / 4));
        var ret = false;
        if (this.getLength() === 0 || Math.abs(this.getX()[this.getLastIndexPoint()] - x) >= delta || Math.abs(this.getY()[this.getLastIndexPoint()] - y) >= delta){
            ret = true;
        }
        return ret;
    };

    /**
     * Get the boundingBox
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    Stroke.prototype.getBoundingBox = function () {
        var boundingBox = new scope.Rectangle();
        boundingBox.setX(Math.min.apply(Math, this.getX()));
        boundingBox.setY(Math.min.apply(Math, this.getY()));
        boundingBox.setWidth(Math.max.apply(Math, this.getX()) - boundingBox.getX());
        boundingBox.setHeight(Math.max.apply(Math, this.getY()) - boundingBox.getY());
        return boundingBox;
    };

    // Export
    scope.Stroke = Stroke;
})(MyScript);