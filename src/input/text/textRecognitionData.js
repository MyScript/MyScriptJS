(function (scope) {

    /**
     * Recognition data for text input
     *
     * @class TextRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function TextRecognitionData () {
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
     * @method getTextRecognitionInput
     * @returns {MyScript.TextRecognitionInput} inputMode
     */
    TextRecognitionData.prototype.getTextRecognitionInput = function () {
        return this.textInput;
    };

    /**
     * Set text input
     *
     * @method setTextRecognitionInput
     * @param {MyScript.TextRecognitionInput} input
     */
    TextRecognitionData.prototype.setTextRecognitionInput = function (input) {
        this.textInput = JSON.stringify(input);
    };

    // Export
    scope.TextRecognitionData = TextRecognitionData;
})(MyScript);