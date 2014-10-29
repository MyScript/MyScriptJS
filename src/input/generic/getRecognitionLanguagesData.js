(function (scope) {

    /**
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
     * @returns {string} inputMode
     */
    GetRecognitionLanguagesData.prototype.getInputMode = function () {
        return this.inputMode;
    };

    /**
     * @param {string} inputMode
     */
    GetRecognitionLanguagesData.prototype.setInputMode = function (inputMode) {
        this.inputMode = inputMode;
    };

    // Export
    scope.GetRecognitionLanguagesData = GetRecognitionLanguagesData;
})(MyScript);