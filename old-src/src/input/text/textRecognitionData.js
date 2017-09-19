'use strict';

(function (scope) {
    /**
     * Recognition data for text input
     *
     * @class TextRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function TextRecognitionData() {
    }

    /**
     * Inheritance property
     */
    TextRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    TextRecognitionData.prototype.constructor = TextRecognitionData;

    /**
     * Get text input
     *
     * @method getRecognitionInput
     * @returns {TextRecognitionInput} input
     */
    TextRecognitionData.prototype.getRecognitionInput = function () {
        return this.textInput;
    };

    /**
     * Set text input
     *
     * @method setRecognitionInput
     * @param {TextRecognitionInput} input
     */
    TextRecognitionData.prototype.setRecognitionInput = function (input) {
        this.textInput = JSON.stringify(input);
    };

    // Export
    scope.TextRecognitionData = TextRecognitionData;
})(MyScript);
