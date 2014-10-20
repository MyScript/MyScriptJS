(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerPointData (obj) {
        scope.Point.call(this, obj);
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