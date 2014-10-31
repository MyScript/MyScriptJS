(function (scope) {

    /**
     * Math recognizer interface
     *
     * @class MathRecognizer
     * @extends AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function MathRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
    }

    /**
     * Inheritance property
     */
    MathRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    MathRecognizer.prototype.constructor = MathRecognizer;

    /**
     * Do math recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {MathParameter} parameters
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {Array} components
     * @param {String} hmacKey
     * @returns {MyScript.Promise}
     */
    MathRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components, hmacKey) {

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
            data.setHMAC(self.computeHMAC(applicationKey, input, hmacKey));

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