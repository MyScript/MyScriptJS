(function (scope) {

    /**
     * Analyzer point data
     *
     * @class AnalyzerPointData
     * @extends Point
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerPointData (obj) {
        scope.Point.call(this, obj);
    }

    /**
     * Inheritance property
     */
    AnalyzerPointData.prototype = new scope.Point();

    /**
     * Constructor property
     */
    AnalyzerPointData.prototype.constructor = AnalyzerPointData;

    // Export
    scope.AnalyzerPointData = AnalyzerPointData;
})(MyScript);