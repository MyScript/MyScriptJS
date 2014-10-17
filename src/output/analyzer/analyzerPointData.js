(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerPointData () {
    }

    /**
     *
     * @type {Point}
     */
    AnalyzerPointData.prototype.__proto__ = new scope.Point();

    // Export
    scope.AnalyzerPointData = AnalyzerPointData;
})(MyScript);