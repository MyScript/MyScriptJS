(function (scope) {

    /**
     * List of languages recognition input
     * @constructor
     */
    function GetRecognitionLanguagesData () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionData}
     */
    GetRecognitionLanguagesData.prototype = new scope.AbstractRecognitionData();

    /**
     *
     * @type {GetRecognitionLanguagesData}
     */
    GetRecognitionLanguagesData.prototype.constructor = GetRecognitionLanguagesData;

    /**
     * Get the recognition input mode
     * @returns {string} inputMode
     */
    GetRecognitionLanguagesData.prototype.getInputMode = function () {
        return this.inputMode;
    };

    /**
     * Set the recognition input mode
     * @param {string} inputMode
     */
    GetRecognitionLanguagesData.prototype.setInputMode = function (inputMode) {
        this.inputMode = inputMode;
    };

    // Export
    scope.GetRecognitionLanguagesData = GetRecognitionLanguagesData;
})(MyScript);