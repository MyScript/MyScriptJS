'use strict';

(function (scope) {
    /**
     * Represent a simple StrokeComponent input component
     *
     * @class StrokeComponent
     * @constructor
     */
    function StrokeComponent(obj) {
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
     * Constructor property
     */
    StrokeComponent.prototype.constructor = StrokeComponent;

    /**
     * @method toJSON
     * @returns {Object}
     */
    StrokeComponent.prototype.toJSON = function () {
        //TODO Check why t is not managed by cloud backend
        return {type: this.type, x: this.x, y: this.y, t : this.t};
    };


    StrokeComponent.prototype.getLength = function () {
        return this.x.length;
    };

    StrokeComponent.prototype.addPoint = function (point) {
        if (_filterPointByAcquisitionDelta(point.x, point.y, this.x, this.y, this.getLastIndexPoint(), this.width, this.x.length)) {
            this.x.push(point.x);
            this.y.push(point.y);
            this.t.push(point.t);
            this.p.push(_computePressure(point.x, point.y, this.x, this.y, this.l, this.getLastIndexPoint()));
            this.d.push(_computeDistance(point.x, point.y, this.x, this.y, this.getLastIndexPoint()));
            this.l.push(_computeLength(point.x, point.y, this.x, this.y, this.l, this.getLastIndexPoint()));
        }
    };

    StrokeComponent.prototype.getLastIndexPoint = function () {
        return this.x.length - 1;
    };

    StrokeComponent.prototype.getPointByIndex = function (index) {
        var point;
        if (index !== undefined && index >= 0 && index < this.x.length) {
            point = {
                x: this.x[index],
                y: this.y[index],
                t: this.t[index],
                p: this.p[index],
                d: this.d[index],
                l: this.l[index]
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
