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
     * @param {String} hmacKey
     * @returns {QReturnValue}
     */
    MathRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components, hmacKey) {
        var input = new scope.MathRecognitionInput();
        input.setComponents(components);
        input.setResultTypes(parameters.getResultTypes());
        input.setIsColumnar(parameters.getIsColumnar());
        input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
        input.setUserResources(parameters.getUserResources());

        var data = new scope.MathRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setMathRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post(this.url + '/math/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.MathResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.MathRecognizer = MathRecognizer;
})(MyScript);