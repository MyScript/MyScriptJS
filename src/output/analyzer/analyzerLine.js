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
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerLine.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerLine}
     */
    AnalyzerLine.prototype.constructor = AnalyzerLine;

    /**
     *
     * @returns {AnalyzerLineData}
     */
    AnalyzerLine.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.AnalyzerLine = AnalyzerLine;
})(MyScript);