'use strict';

(function (scope) {
    /**
     * Text ink ranges
     *
     * @class TextInkRange
     * @param {Object} [obj]
     * @constructor
     */
    function TextInkRange(obj) {
        if (obj) {
            if (typeof obj === 'string') {
                var cpt = obj.split(/[:-]+/);
                this.startUnit = Number(cpt[0]);
                this.startComponent = Number(cpt[1]);
                this.startPoint = Number(cpt[2]);
                this.endUnit = Number(cpt[3]);
                this.endComponent = Number(cpt[4]);
                this.endPoint = Number(cpt[5]);
            } else {
                this.startUnit = obj.startUnit;
                this.startComponent = obj.startComponent;
                this.startPoint = obj.startPoint;
                this.endUnit = obj.endUnit;
                this.endComponent = obj.endComponent;
                this.endPoint = obj.endPoint;
            }
        }
    }

    /**
     * Get start unit
     *
     * @method getStartUnit
     * @returns {Number}
     */
    TextInkRange.prototype.getStartUnit = function () {
        return this.startUnit;
    };

    /**
     * Get end unit
     *
     * @method getEndUnit
     * @returns {Number}
     */
    TextInkRange.prototype.getEndUnit = function () {
        return this.endUnit;
    };

    /**
     * Get start component
     *
     * @method getStartComponent
     * @returns {Number}
     */
    TextInkRange.prototype.getStartComponent = function () {
        return this.startComponent;
    };

    /**
     * Get end component
     *
     * @method getEndComponent
     * @returns {Number}
     */
    TextInkRange.prototype.getEndComponent = function () {
        return this.endComponent;
    };

    /**
     * Get start point
     *
     * @method getStartPoint
     * @returns {Number}
     */
    TextInkRange.prototype.getStartPoint = function () {
        return this.startPoint;
    };

    /**
     * Get end point
     *
     * @method getEndPoint
     * @returns {Number}
     */
    TextInkRange.prototype.getEndPoint = function () {
        return this.endPoint;
    };

    // Export
    scope.TextInkRange = TextInkRange;
})(MyScript);
