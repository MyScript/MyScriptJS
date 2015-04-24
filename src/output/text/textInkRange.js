'use strict';

(function (scope) {
    /**
     * Text ink ranges
     *
     * @class TextInkRange
     * @param {Object} [obj]
     * @constructor
     */
    function TextInkRange (obj) {
        if (obj) {
            var cpt = obj.split(/[:-]+/);
            this.startUnit = Number(cpt[0]);
            this.startStroke = Number(cpt[1]);
            this.startPoint = Number(cpt[2]);
            this.endUnit = Number(cpt[3]);
            this.endStroke = Number(cpt[4]);
            this.endPoint = Number(cpt[5]);
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
     * Get start stroke
     *
     * @method getStartStroke
     * @returns {Number}
     */
    TextInkRange.prototype.getStartStroke = function () {
        return this.startStroke;
    };

    /**
     * Get end stroke
     *
     * @method getEndStroke
     * @returns {Number}
     */
    TextInkRange.prototype.getEndStroke = function () {
        return this.endStroke;
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