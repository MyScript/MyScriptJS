(function (scope) {

    /**
     * @constructor
     */
    function GetLanguagesData () {
    }

    /**
     * @returns {string}
     */
    GetLanguagesData.prototype.getApplicationKey = function () {
        return this.apiKey;
    };

    /**
     * @param {string}
     */
    GetLanguagesData.prototype.setApplicationKey = function (applicationKey) {
        this.apiKey = applicationKey;
    };

    /**
     * @returns {string} inputMode
     */
    GetLanguagesData.prototype.getInputMode = function () {
        return this.inputMode;
    };

    /**
     * @param {string} inputMode
     */
    GetLanguagesData.prototype.setInputMode = function (inputMode) {
        this.inputMode = inputMode;
    };

    // Export
    scope.GetLanguagesData = GetLanguagesData;
})(MyScript);