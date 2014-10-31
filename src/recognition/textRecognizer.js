(function (scope) {

    /**
     *
     * @param {String} url
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

            var input = new scope.TextRecognitionInput();
            input.setParameters(parameters);
            input.setInputUnits(new Array(inputUnit));
            input.setSwitchToChildren(true);

            var data = new scope.TextRecognitionData();
            data.setApplicationKey(applicationKey);
            data.setInput(input);
            data.setInstanceId(instanceId);

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