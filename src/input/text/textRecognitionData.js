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
     * @method getInput
     * @returns {String} inputMode
     */
    TextRecognitionData.prototype.getInput = function () {
        return this.hwrInput;
    };

    /**
     * Set text input
     *
     * @method setInput
     * @param {TextRecognitionInput} input
     */
    TextRecognitionData.prototype.setInput = function (input) {
        this.hwrInput = JSON.stringify(input);
    };

    // Export
    scope.TextRecognitionData = TextRecognitionData;
})(MyScript);