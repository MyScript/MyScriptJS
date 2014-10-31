(function (scope) {

    /**
     * Recognition data for analyzer input
     *
     * @class AnalyzerRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function AnalyzerRecognitionData () {
    }

    /**
     * Inheritance property
     */
    AnalyzerRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    AnalyzerRecognitionData.prototype.constructor = AnalyzerRecognitionData;

    /**
     * Get analyzer input
     * @returns {String}
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