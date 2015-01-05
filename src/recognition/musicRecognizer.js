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
     * @returns {QReturnValue}
     */
    MusicRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components, hmacKey) {

        var input = new scope.MusicRecognitionInput();
        input.setComponents(components);
        input.setStaff(parameters.getStaff());
        input.setDivisions(parameters.getDivisions());
        input.setResultTypes(parameters.getResultTypes());
        input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
        input.setUserResources(parameters.getUserResources());

        var data = new scope.MusicRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setMusicRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post(this.url + '/music/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.MusicResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.MusicRecognizer = MusicRecognizer;
})(MyScript);