(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerLineData () {
        this.p1 = null;
        this.p2 = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerLineData.prototype.__proto__ = new Object();

    /**
     * @returns {AnalyzerPointData}
     */
    AnalyzerLineData.prototype.getP1 = function () {
        return this.p1;
    };

    /**
     * @returns {AnalyzerPointData}
     */
    AnalyzerLineData.prototype.getP2 = function () {
        return this.p2;
    };

    // Export
    scope.AnalyzerLineData = AnalyzerLineData;
})(MyScript);