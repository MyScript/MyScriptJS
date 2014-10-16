(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerPointData () {
        scope.Point.call(this);
    }

    /**
     *
     * @type {Point}
     */
    AnalyzerPointData.prototype.__proto__ = new scope.Point();

    // Export
    scope.AnalyzerPointData = AnalyzerPointData;
})(MyScript);