(function (scope) {

    /**
     *
     * @param {string} url
     * @constructor
     */
    function MathRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
    }

    /**
     *
     * @type {MyScript.AbstractRecognizer}
     */
    MathRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     *
     * @type {MathRecognizer}
     */
    MathRecognizer.prototype.constructor = MathRecognizer;

    MathRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var input = new scope.MathRecognitionInput();
            input.setComponents(components);
            input.setResultTypes(parameters.getResultTypes());
            input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
            input.setUserResources(parameters.getUserResources());
            input.setSwitchToChildren(true);

            var data = new scope.MathRecognitionData();
            data.setApplicationKey(applicationKey);
            data.setInput(input);
            data.setInstanceId(instanceId);

            self.http.post(self.url + '/equation/doSimpleRecognition.json', data).then(
                function success (response) {
                    resolve(new scope.MathResult(response));
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.MathRecognizer = MathRecognizer;
})(MyScript);