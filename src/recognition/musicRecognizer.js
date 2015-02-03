(function (scope) {
    'use strict';
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
        this.parameters = new scope.MusicParameter();
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
     * Get parameters
     *
     * @method getParameters
     * @returns {MusicParameter}
     */
    MusicRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MusicParameter} parameters
     */
    MusicRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do music recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {MusicParameter} [parameters]
     * @returns {QReturnValue}
     */
    MusicRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {

        var input = new scope.MusicRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setStaff(parameters.getStaff());
            input.setDivisions(parameters.getDivisions());
            input.setResultTypes(parameters.getResultTypes());
            input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
            input.setUserResources(parameters.getUserResources());
        } else {
            input.setStaff(this.getParameters().getStaff());
            input.setDivisions(this.getParameters().getDivisions());
            input.setResultTypes(this.getParameters().getResultTypes());
            input.setScratchOutDetectionSensitivity(this.getParameters().getScratchOutDetectionSensitivity());
            input.setUserResources(this.getParameters().getUserResources());
        }

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