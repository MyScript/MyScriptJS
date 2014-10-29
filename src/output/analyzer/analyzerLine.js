(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerLine (obj) {
        scope.AnalyzerElement.call(this, obj);
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