'use strict';

(function (scope) {
    /**
     * Music recognizer interface
     *
     * @class MusicRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MusicRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
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
     * @returns {Promise}
     */
    MusicRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var input = new scope.MusicRecognitionInput();
        input.setComponents(components);
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        input.setStaff(params.getStaff());
        input.setDivisions(params.getDivisions());
        input.setResultTypes(params.getResultTypes());
        input.setScratchOutDetectionSensitivity(params.getScratchOutDetectionSensitivity());
        input.setUserResources(params.getUserResources());

        var data = new scope.MusicRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setMusicRecognitionInput(input);
        data.setInstanceId(instanceId);
        if (hmacKey) {
            data.setHmac(this.computeHmac(applicationKey, input, hmacKey));
        }

        return this.http.post('//' + this.host + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.MusicResult(response);
            },
            function error(response) {
                throw response;
            }
        );
    };

    // Export
    scope.MusicRecognizer = MusicRecognizer;
})(MyScript);