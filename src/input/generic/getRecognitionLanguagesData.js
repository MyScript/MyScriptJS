(function (scope) {

    /**
     * List of languages recognition input
     *
     * @class GetRecognitionLanguagesData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function GetRecognitionLanguagesData () {
    }

    /**
     * Inheritance property
     */
    GetRecognitionLanguagesData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    GetRecognitionLanguagesData.prototype.constructor = GetRecognitionLanguagesData;

    /**
     * Get the recognition input mode
     * @returns {String} inputMode
     */
    GetRecognitionLanguagesData.prototype.getInputMode = function () {
        return this.inputMode;
    };

    /**
     * Set the recognition input mode
     * @param {String} inputMode
     */
    GetRecognitionLanguagesData.prototype.setInputMode = function (inputMode) {
        this.inputMode = inputMode;
    };

    // Export
    scope.GetRecognitionLanguagesData = GetRecognitionLanguagesData;
})(MyScript);