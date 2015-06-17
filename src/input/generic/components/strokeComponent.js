'use strict';

(function (scope) {
    /**
     * Represent a simple stroke input component
     *
     * @class StrokeComponent
     * @extends Stroke
     * @constructor
     */
    function StrokeComponent(obj) {
        scope.Stroke.call(this);
        this.p = [];
        this.d = [];
        this.l = [];
        this.color = undefined;
        this.alpha = undefined;
        this.width = 0;
        if (obj) {
            this.p = obj.p;
            this.d = obj.p;
            this.l = obj.l;
            this.color = obj.color;
            this.alpha = obj.alpha;
            this.width = obj.width;
        }
    }

    /**
     * Inheritance property
     */
    StrokeComponent.prototype = new scope.Stroke();

    /**
     * Constructor property
     */
    StrokeComponent.prototype.constructor = StrokeComponent;

    /**     *
     * @method toJSON
     * @returns {Object}
     */
    StrokeComponent.prototype.toJSON = function () {
        return {type: this.type, x: this.x, y: this.y, t: this.t};
    };

    StrokeComponent.prototype.getP = function () {
        return this.p;
    };

    StrokeComponent.prototype.setP = function (p) {
        this.p = p;
    };

    StrokeComponent.prototype.addP = function (p) {
        if ((p !== null) && (p !== undefined)) {
            this.p.push(p);
        }
    };

    StrokeComponent.prototype.getD = function () {
        return this.d;
    };

    StrokeComponent.prototype.setD = function (d) {
        this.d = d;
    };

    StrokeComponent.prototype.addD = function (d) {
        if ((d !== null) && (d !== undefined)) {
            this.d.push(d);
        }
    };

    StrokeComponent.prototype.getL = function () {
        return this.l;
    };

    StrokeComponent.prototype.setL = function (l) {
        this.l = l;
    };

    StrokeComponent.prototype.addL = function (l) {
        if ((l !== null) && (l !== undefined)) {
            this.l.push(l);
        }
    };

    StrokeComponent.prototype.getColor = function () {
        return this.color;
    };

    StrokeComponent.prototype.setColor = function (color) {
        this.color = color;
    };

    StrokeComponent.prototype.getAlpha = function () {
        return this.alpha;
    };

    StrokeComponent.prototype.setAlpha = function (alpha) {
        this.alpha = alpha;
    };

    StrokeComponent.prototype.getWidth = function () {
        return this.width;
    };

    StrokeComponent.prototype.setWidth = function (width) {
        this.width = width;
    };

    StrokeComponent.prototype.addPoint = function (x, y, t) {
        if (this.filterPointByAcquisitionDelta(x, y)) {
            this.addX(x);
            this.addY(y);
            this.addT(t);
            this.addP(this.computeP(x, y));
            this.addD(this.computeD(x, y));
            this.addL(this.computeL(x, y));
        }
    };

    StrokeComponent.prototype.getLastIndexPoint = function () {
        return this.x.length - 1;
    };

    StrokeComponent.prototype.getPointByIndex = function (index) {
        var point;
        if (index !== undefined && index >= 0 && index < this.getLength()) {
            point = {
                x: this.getX()[index],
                y: this.getY()[index],
                t: this.getT()[index],
                p: this.getP()[index],
                d: this.getD()[index],
                l: this.getL()[index]
            };
        }
        return point;
    };

    StrokeComponent.prototype.computeD = function (x, y) {
        var distance = Math.sqrt(Math.pow((y - this.getY()[this.getLastIndexPoint() - 1]), 2) + Math.pow((x - this.getX()[this.getLastIndexPoint() - 1]), 2));

        if (isNaN(distance)) {
            distance = 0;
        }

        return distance;
    };

    StrokeComponent.prototype.computeL = function (x, y) {
        var length = this.getL()[this.getLastIndexPoint() - 1] + this.computeD(x, y);

        if (isNaN(length)) {
            length = 0;
        }

        return length;
    };

    StrokeComponent.prototype.computeP = function (x, y) {
        var ratio = 1.0;
        var distance = this.computeD(x, y);
        var length = this.computeL(x, y);
        if (distance < 10) {
            ratio = 0.2 + Math.pow(0.1 * distance, 0.4);
        } else if (distance > length - 10) {
            ratio = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
        }
        var pressure = ratio * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(distance));
        if (isNaN(parseFloat(pressure))) {
            pressure = 0.5;
        }
        return pressure;
    };

    StrokeComponent.prototype.filterPointByAcquisitionDelta = function (x, y) {
        var delta = (2 + (this.getWidth() / 4));
        var ret = false;
        if (this.getLength() === 0 || Math.abs(this.getX()[this.getLastIndexPoint()] - x) >= delta || Math.abs(this.getY()[this.getLastIndexPoint()] - y) >= delta) {
            ret = true;
        }
        return ret;
    };

    // Export
    scope.StrokeComponent = StrokeComponent;
})(MyScript);