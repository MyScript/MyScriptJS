(function (scope) {

    /**
     * @constructor
     */
    function AnalyzerRecognitionData () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionData}
     */
    AnalyzerRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     *
     * @type {AnalyzerRecognitionData}
     */
    AnalyzerRecognitionData.prototype.constructor = AnalyzerRecognitionData;

    /**
     * @returns {string} inputMode
     */
    AnalyzerRecognitionData.prototype.getInput = function () {
        return this.inputMode;
    };

    /**
     * @param {AnalyzerRecognitionInput} input
     */
    AnalyzerRecognitionData.prototype.setInput = function (input) {
        this.analyzerInput = JSON.stringify(input);
    };

    // Export
    scope.AnalyzerRecognitionData = AnalyzerRecognitionData;
})(MyScript);