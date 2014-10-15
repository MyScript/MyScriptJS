/**
 *
 * @param scope
 */
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
    AnalyzerPointData.prototype = Object.create(scope.Point.prototype);

    /**
     *
     * @type {AnalyzerPointData}
     */
    scope.AnalyzerPointData = AnalyzerPointData;
})(MyScript);