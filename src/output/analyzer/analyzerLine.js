(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerLine () {
        scope.AnalyzerElement.call(this);
        this.data = null;
    }

    /**
     *
     * @type {AnalyzerElement}
     */
    AnalyzerLine.prototype.__proto__ = new scope.AnalyzerElement();

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