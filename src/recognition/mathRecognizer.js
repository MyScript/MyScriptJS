'use strict';

(function (scope) {
    /**
     * Math recognizer interface
     *
     * @class MathRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MathRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.MathParameter();
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
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do math recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {MathParameter} [parameters]
     * @returns {Promise}
     */
    MathRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var input = new scope.MathRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setResultTypes(parameters.getResultTypes());
            input.setColumnar(parameters.isColumnar());
            input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
            input.setUserResources(parameters.getUserResources());
        } else {
            input.setResultTypes(this.getParameters().getResultTypes());
            input.setColumnar(this.getParameters().isColumnar());
            input.setScratchOutDetectionSensitivity(this.getParameters().getScratchOutDetectionSensitivity());
            input.setUserResources(this.getParameters().getUserResources());
        }

        var data = new scope.MathRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setMathRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.MathResult(response);
            },
            function error (response) {
                throw response;
            }
        );
    };

    // Export
    scope.MathRecognizer = MathRecognizer;
})(MyScript);