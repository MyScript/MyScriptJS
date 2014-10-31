(function (scope) {

    /**
     * Music recognizer interface
     *
     * @class MusicRecognizer
     * @extends AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function MusicRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
    }

    /**
     * Inheritance property
     */
    MusicRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    MusicRecognizer.prototype.constructor = MusicRecognizer;

    /**
     * Do music recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {MusicParameter} parameters
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @returns {MyScript.Promise}
     */
    MusicRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components, hmacKey) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var input = new scope.MusicRecognitionInput();
            input.setComponents(components);
            input.setStaff(parameters.getStaff());
            input.setDivisions(parameters.getDivisions());
            input.setResultTypes(parameters.getResultTypes());
            input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
            input.setUserResources(parameters.getUserResources());

            var data = new scope.MusicRecognitionData();
            data.setApplicationKey(applicationKey);
            data.setInput(input);
            data.setInstanceId(instanceId);
            data.setHMAC(self.computeHMAC(applicationKey, input, hmacKey));

            self.http.post(self.url + '/music/doSimpleRecognition.json', data).then(
                function success (response) {
                    resolve(new scope.MusicResult(response));
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.MusicRecognizer = MusicRecognizer;
})(MyScript);