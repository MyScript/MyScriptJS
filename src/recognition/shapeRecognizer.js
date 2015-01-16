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
     * Do shape recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {ShapeParameter} parameters
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @returns {QReturnValue}
     */

    ShapeRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components, hmacKey) {

        var input = new scope.ShapeRecognitionInput();
        input.setComponents(components);
        input.setDoBeautification(parameters.hasBeautification());
        input.setRejectDetectionSensitivity(parameters.getRejectDetectionSensitivity());

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