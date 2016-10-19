'use strict';

(function (scope) {
    /**
     * Analyzer ink range
     *
     * @class AnalyzerInkRange
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerInkRange(obj) {
        if (obj) {
            this.firstPoint = new scope.Point(obj.firstPoint);
            this.lastPoint = new scope.Point(obj.lastPoint);
            this.stroke = new scope.AnalyzerRecognizedStroke(obj.stroke);
        }
    }

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {Point}
     */
    AnalyzerInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {Point}
     */
    AnalyzerInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    /**
     * Get stroke
     *
     * @method getStroke
     * @returns {null|*}
     */
    AnalyzerInkRange.prototype.getStroke = function () {
        return this.stroke;
    };

    // Export
    scope.AnalyzerInkRange = AnalyzerInkRange;
})(MyScript);