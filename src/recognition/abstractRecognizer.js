(function (scope) {

    /**
     * Abstract recognizer interface
     * @param {string} url
     * @constructor
     */
    function AbstractRecognizer (url) {
        this.url = url;
        this.http = new scope.NetworkInterface();
    }

    /**
     * Get the recognition languages available for an application and a specific inputMode
     * @param {string} applicationKey
     * @param {string} inputMode
     */
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, inputMode) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var data = new scope.GetRecognitionLanguagesData();
            data.setApplicationKey(applicationKey);
            data.setInputMode(inputMode);

            self.http.get(self.url + '/hwr/languages.json', data).then(
                function success (response) {
                    resolve(response.result);
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript);