(function (scope) {
    'use strict';
    /**
     * Analyzer line data
     *
     * @class AnalyzerLineData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerLineData (obj) {
        if (obj) {
            this.p1 = new scope.AnalyzerPointData(obj.p1);
            this.p2 = new scope.AnalyzerPointData(obj.p2);
        }
    }

    /**
     * Get p1
     *
     * @method getP1
     * @returns {AnalyzerPointData}
     */
    AnalyzerLineData.prototype.getP1 = function () {
        return this.p1;
    };

    /**
     * Get p2
     *
     * @method getP2
     * @returns {AnalyzerPointData}
     */
    AnalyzerLineData.prototype.getP2 = function () {
        return this.p2;
    };

    // Export
    scope.AnalyzerLineData = AnalyzerLineData;
})(MyScript);