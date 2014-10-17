(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerPointData () {
    }

    /**
     *
     * @type {MyScript.Point}
     */
    AnalyzerPointData.prototype = new scope.Point();

    /**
     *
     * @type {AnalyzerPointData}
     */
    AnalyzerPointData.prototype.constructor = AnalyzerPointData;

    // Export
    scope.AnalyzerPointData = AnalyzerPointData;
})(MyScript);