(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerLine (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.data = null;
        if (obj) {
            this.data = new scope.AnalyzerLineData(obj.data);
        }
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