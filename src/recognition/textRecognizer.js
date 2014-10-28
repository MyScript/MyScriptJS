(function (scope) {

    /**
     *
     * @param {string} url
     * @constructor
     */
    function TextRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
    }

    /**
     *
     * @type {MyScript.AbstractRecognizer}
     */
    TextRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     *
     * @type {TextRecognizer}
     */
    TextRecognizer.prototype.constructor = TextRecognizer;

    TextRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var inputUnit = new scope.TextInputUnit();
            inputUnit.setComponents(components);

            var input = self.inputCorrector.getTextInput(parameters, new Array(inputUnit));

            var data = {
                apiKey: applicationKey,
                instanceId: instanceId,
                hwrInput: JSON.stringify(input)
            };

            self.http.post(self.url + '/hwr/doSimpleRecognition.json', data).then(
                function success (response) {
                    resolve(new scope.TextResult(response));
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.TextRecognizer = TextRecognizer;
})(MyScript);