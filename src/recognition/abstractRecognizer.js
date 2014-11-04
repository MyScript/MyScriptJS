(function (scope) {

    /**
     * Abstract recognizer interface
     *
     * @class AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function AbstractRecognizer (url) {
        this.url = url;
        this.http = new scope.NetworkInterface();
    }

    /**
     * Get the recognition languages available for an application and a specific inputMode
     *
     * @method getAvailableLanguageList
     * @param {String} applicationKey
     * @param {String} inputMode
     * @returns {QReturnValue}
     */
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, hmacKey, inputMode) {
        var data = new scope.GetRecognitionLanguagesData();
        data.setApplicationKey(applicationKey);
        data.setInputMode(inputMode);
        data.setHMAC(this.computeHMAC(applicationKey, '', hmacKey));

        return this.http.get(this.url + '/hwr/languages.json', data).then(
            function success (response) {
                return response.result;
            },
            function error (response) {
                return response;
            }
        );
    };

    AbstractRecognizer.prototype.computeHMAC = function (appKey, data, hmacKey) {
        var jsonInput = data != '' ? JSON.stringify(data) : '';
        return CryptoJS.HmacSHA512(jsonInput, appKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript);