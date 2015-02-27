'use strict';

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
     *
     * @method getAnalyzerRecognitionInput
     * @returns {AnalyzerRecognitionInput}
     */
    AnalyzerRecognitionData.prototype.getAnalyzerRecognitionInput = function () {
        return this.analyzerInput;
    };

    /**
     * Set analyzer input
     *
     * @method setAnalyzerRecognitionInput
     * @param {AnalyzerRecognitionInput} input
     */
    AnalyzerRecognitionData.prototype.setAnalyzerRecognitionInput = function (input) {
        this.analyzerInput = JSON.stringify(input);
    };

    // Export
    scope.AnalyzerRecognitionData = AnalyzerRecognitionData;
})(MyScript);