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
     *
     * @method getInputMode
     * @returns {String} inputMode
     */
    GetRecognitionLanguagesData.prototype.getInputMode = function () {
        return this.inputMode;
    };

    /**
     * Set the recognition input mode
     *
     * @method setInputMode
     * @param {String} inputMode
     */
    GetRecognitionLanguagesData.prototype.setInputMode = function (inputMode) {
        this.inputMode = inputMode;
    };

    /**
     * @returns {string}
     */
    AbstractRecognitionData.prototype.getHMAC = function () {
        return this.hmac;
    };

    /**
     * @param {string} hmac
     */
    AbstractRecognitionData.prototype.setHMAC = function (hmac) {
        this.hmac = hmac;
    };

    // Export
    scope.GetRecognitionLanguagesData = GetRecognitionLanguagesData;
})(MyScript);