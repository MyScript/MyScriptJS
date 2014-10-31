(function (scope) {

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
     * @returns {MyScript.Promise}
     */
    ShapeRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var input = new scope.ShapeRecognitionInput();
            input.setComponents(components);
            input.setDoBeautification(parameters.hasBeautification());
            input.setRejectDetectionSensitivity(parameters.getRejectDetectionSensitivity());

            var data = new scope.ShapeRecognitionData();
            data.setApplicationKey(applicationKey);
            data.setInput(input);
            data.setInstanceId(instanceId);

            self.http.post(self.url + '/shape/doSimpleRecognition.json', data).then(
                function success (response) {
                    resolve(new scope.ShapeResult(response));
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    /**
     * Clear shape recognition session
     *
     * @method clearShapeRecognitionSession
     * @param {String} applicationKey
     * @param {String} instanceId
     * @returns {MyScript.Promise}
     */
    ShapeRecognizer.prototype.clearShapeRecognitionSession = function (applicationKey, instanceId) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var data = {
                instanceId: instanceId
            };

            self.http.post(self.url + '/shape/clearSessionId.json', data).then(
                function success (response) {
                    resolve(response);
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.ShapeRecognizer = ShapeRecognizer;
})(MyScript);