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
     * @returns {String} inputMode
     */
    TextRecognitionData.prototype.getInput = function () {
        return this.inputMode;
    };

    /**
     * @param {TextRecognitionInput} input
     */
    TextRecognitionData.prototype.setInput = function (input) {
        this.hwrInput = JSON.stringify(input);
    };

    // Export
    scope.TextRecognitionData = TextRecognitionData;
})(MyScript);