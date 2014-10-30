(function (scope) {

    /**
     * Recognition data for analyzer input
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
     * Get analyzer input
     * @returns {string}
     */
    AnalyzerRecognitionData.prototype.getInput = function () {
        return this.analyzerInput;
    };

    /**
     * Set analyzer input
     * @param {AnalyzerRecognitionInput} input
     */
    AnalyzerRecognitionData.prototype.setInput = function (input) {
        this.analyzerInput = JSON.stringify(input);
    };

    // Export
    scope.AnalyzerRecognitionData = AnalyzerRecognitionData;
})(MyScript);