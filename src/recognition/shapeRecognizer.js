(function (scope) {
    'use strict';
    /**
     * Shape recognizer interface
     *
     * @class ShapeRecognizer
     * @extends AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function ShapeRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
        this.parameters = new scope.ShapeParameter();
    }

    /**
     * Inheritance property
     */
    ShapeRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    ShapeRecognizer.prototype.constructor = ShapeRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {ShapeParameter}
     */
    ShapeRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {ShapeParameter} parameters
     */
    ShapeRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do shape recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {ShapeParameter} [parameters]
     * @returns {QReturnValue}
     */
    ShapeRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {

        var input = new scope.ShapeRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setDoBeautification(parameters.hasBeautification());
            input.setRejectDetectionSensitivity(parameters.getRejectDetectionSensitivity());
        } else {
            input.setDoBeautification(this.getParameters().hasBeautification());
            input.setRejectDetectionSensitivity(this.getParameters().getRejectDetectionSensitivity());
        }

        var data = new scope.ShapeRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setShapeRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post(this.url + '/shape/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.ShapeResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    /**
     * Clear shape recognition session
     *
     * @method clearShapeRecognitionSession
     * @param {String} applicationKey
     * @param {String} instanceId
     * @returns {QReturnValue}
     */
    ShapeRecognizer.prototype.clearShapeRecognitionSession = function (applicationKey, instanceId) {

        var data = {
            instanceSessionId: instanceId
        };

        return this.http.post(this.url + '/shape/clearSessionId.json', data).then(
            function success (response) {
                return response;
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.ShapeRecognizer = ShapeRecognizer;
})(MyScript);