'use strict';

(function (scope) {
    /**
     * Analyzer line data
     *
     * @class AnalyzerLineData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerLineData(obj) {
        if (obj) {
            this.p1 = new scope.Point(obj.p1);
            this.p2 = new scope.Point(obj.p2);
        }
    }

    /**
     * Get p1
     *
     * @method getP1
     * @returns {Point}
     */
    AnalyzerLineData.prototype.getP1 = function () {
        return this.p1;
    };

    /**
     * Get p2
     *
     * @method getP2
     * @returns {Point}
     */
    AnalyzerLineData.prototype.getP2 = function () {
        return this.p2;
    };

    // Export
    scope.AnalyzerLineData = AnalyzerLineData;
})(MyScript);