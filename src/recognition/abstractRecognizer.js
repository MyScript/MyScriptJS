(function (scope) {

    /**
     * Abstract recognizer interface
     * @constructor
     */
    function AbstractRecognizer (url) {
        this.url = url;
        this.inputCorrector = new scope.InputCorrector();
        this.http = new scope.NetworkInterface();
    }

    /**
     * Get the recognition languages available for an application and a specific inputMode
     * @param {string} applicationKey
     * @param {string} inputMode
     */
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, inputMode) {

        var data = {
            apiKey: applicationKey,
            inputMode: inputMode
        };

        return this.http.get(this.url + '/hwr/languages.json', data).then(
            function (result) {
                return result.data.result;
            }
        );
    };

    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript);