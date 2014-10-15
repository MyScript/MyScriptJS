/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerLine () {
        this.data = null;
    }

    /**
     *
     * @type {AnalyzerElement}
     */
    AnalyzerLine.prototype = Object.create(scope.AnalyzerElement.prototype);

    /**
     *
     * @returns {AnalyzerLineData}
     */
    AnalyzerLine.prototype.getData = function () {
        return this.data;
    };

    /**
     *
     * @type {AnalyzerLine}
     */
    scope.AnalyzerLine = AnalyzerLine;
})(MyScript);