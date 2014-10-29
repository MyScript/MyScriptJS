(function (scope) {

    /**
     * @constructor
     */
    function TextRecognitionData () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionData}
     */
    TextRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     *
     * @type {TextRecognitionData}
     */
    TextRecognitionData.prototype.constructor = TextRecognitionData;

    /**
     * @returns {string} inputMode
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