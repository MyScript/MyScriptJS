/**
 *
 * @param scope
 */
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
    AnalyzerLineData.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {AnalyzerLineData}
     */
    scope.AnalyzerLineData = AnalyzerLineData;
})(MyScript);