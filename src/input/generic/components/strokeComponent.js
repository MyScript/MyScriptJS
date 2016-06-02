'use strict';

(function (scope) {
    /**
     * Represent a simple StrokeComponent input component
     *
     * @class StrokeComponent
     * @extends AbstractComponent
     * @constructor
     */
    function StrokeComponent(obj) {
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
            if (obj.x) {
                this.x = obj.x;
            }
            if (obj.y) {
                this.y = obj.y;
            }
            if (obj.t) {
                this.t = obj.t;
            }
            if (obj.p) {
                this.p = obj.p;
            }
            if (obj.d) {
                this.d = obj.d;
            }
            if (obj.l) {
                this.l = obj.l;
            }
            if (obj.color) {
                this.color = obj.color;
            }
            if (obj.alpha) {
                this.alpha = obj.alpha;
            }
            if (obj.width) {
                this.width = obj.width;
            }
        }
    }

    /**
     * Inheritance property
     */
    StrokeComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    StrokeComponent.prototype.constructor = StrokeComponent;

    /**
     * @method toJSON
     * @returns {Object}
     */
    StrokeComponent.prototype.toJSON = function () {
        return {type: this.type, x: this.x, y: this.y, t: this.t};
    };

    /**
     * Get the list of x coordinates
     *
     * @method getX
     * @returns {Number[]}
     */
    StrokeComponent.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set the list of x coordinates
     *
     * @method setX
     * @param {Number[]} x
     */
    StrokeComponent.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Add a x to the list of x coordinates
     *
     * @method addX
     * @param {Number} x
     */
    StrokeComponent.prototype.addX = function (x) {
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
    StrokeComponent.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set the list of y coordinates
     *
     * @method setY
     * @param {Number[]} y
     */
    StrokeComponent.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     * Add a y to the list of y coordinates
     *
     * @method addY
     * @param {Number} y
     */
    StrokeComponent.prototype.addY = function (y) {
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
    StrokeComponent.prototype.getT = function () {
        return this.t;
    };

    /**
     * Set the list of timestamps
     *
     * @method setT
     * @param {Number[]} t
     */
    StrokeComponent.prototype.setT = function (t) {
        this.t = t;
    };

    /**
     * Add a timestamp to the list
     *
     * @method addT
     * @param {Number} t
     */
    StrokeComponent.prototype.addT = function (t) {
        if ((t !== null) && (t !== undefined)) {
            this.t.push(t);
        }
    };

    StrokeComponent.prototype.getLength = function () {
        return this.x.length;
    };

    /**
     * Get the boundingBox
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    StrokeComponent.prototype.getBoundingBox = function () {
        var boundingBox = new scope.Rectangle();
        boundingBox.setX(Math.min.apply(Math, this.getX()));
        boundingBox.setY(Math.min.apply(Math, this.getY()));
        boundingBox.setWidth(Math.max.apply(Math, this.getX()) - boundingBox.getX());
        boundingBox.setHeight(Math.max.apply(Math, this.getY()) - boundingBox.getY());
        return boundingBox;
    };

    StrokeComponent.prototype.toFixed = function (precision) {
        if (precision !== undefined) {
            for (var i in this.x) {
                this.x[i] = this.x[i].toFixed(precision);
                this.y[i] = this.y[i].toFixed(precision);
            }
        }
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

    StrokeComponent.prototype.getWidth = function () {
        return this.width;
    };

    StrokeComponent.prototype.setWidth = function (width) {
        this.width = width;
    };

    StrokeComponent.prototype.addPoint = function (x, y, t) {
        if (_filterPointByAcquisitionDelta(x, y, this.getX(), this.getY(), this.getLastIndexPoint(), this.getWidth(), this.getLength())) {
            this.addX(x);
            this.addY(y);
            this.addT(t);
            this.addP(_computePressure(x, y, this.getX(), this.getY(), this.getL(), this.getLastIndexPoint()));
            this.addD(_computeDistance(x, y, this.getX(), this.getY(), this.getLastIndexPoint()));
            this.addL(_computeLength(x, y, this.getX(), this.getY(), this.getL(), this.getLastIndexPoint()));
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

    function _computeDistance(x, y, xArray, yArray, lastIndexPoint) {
        var distance = Math.sqrt(Math.pow((y - yArray[lastIndexPoint - 1]), 2) + Math.pow((x - xArray[lastIndexPoint - 1]), 2));

        if (isNaN(distance)) {
            distance = 0;
        }

        return distance;
    }

    function _computeLength(x, y, xArray, yArray, lArray, lastIndexPoint) {
        var length = lArray[lastIndexPoint - 1] + _computeDistance(x, y, xArray, yArray, lastIndexPoint);

        if (isNaN(length)) {
            length = 0;
        }

        return length;
    }

    function _computePressure(x, y, xArray, yArray, lArray, lastIndexPoint) {
        var ratio = 1.0;
        var distance = _computeDistance(x, y, xArray, yArray, lastIndexPoint);
        var length = _computeLength(x, y, xArray, yArray, lArray, lastIndexPoint);

        if(length === 0) {
            ratio = 0.5;
        } else if(distance == length){
            ratio = 1.0;
        } else  if (distance < 10) {
            ratio = 0.2 + Math.pow(0.1 * distance, 0.4);
        } else if (distance > length - 10) {
            ratio = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
        }
        var pressure = ratio * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(distance));
        if (isNaN(parseFloat(pressure))) {
            pressure = 0.5;
        }
        return pressure;
    }

    function _filterPointByAcquisitionDelta(x, y, xArray, yArray, lastIndexPoint, width, length) {
        var delta = (2 + (width / 4));
        var ret = false;
        if (length === 0 || Math.abs(xArray[lastIndexPoint] - x) >= delta || Math.abs(yArray[lastIndexPoint] - y) >= delta) {
            ret = true;
        }
        return ret;
    }

    // Export
    scope.StrokeComponent = StrokeComponent;
})(MyScript);
