'use strict';

(function (scope) {
    /**
     * Recognition data for analyzer input
     *
     * @class AnalyzerRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function AnalyzerRecognitionData() {
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
     * @method getRecognitionInput
     * @returns {AnalyzerRecognitionInput}
     */
    AnalyzerRecognitionData.prototype.getRecognitionInput = function () {
        return this.analyzerInput;
    };

    /**
     * Set analyzer input
     *
     * @method setRecognitionInput
     * @param {AnalyzerRecognitionInput} input
     */
    AnalyzerRecognitionData.prototype.setRecognitionInput = function (input) {
        this.analyzerInput = JSON.stringify(input);
    };

    // Export
    scope.AnalyzerRecognitionData = AnalyzerRecognitionData;
})(MyScript);
