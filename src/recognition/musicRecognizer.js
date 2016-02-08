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
        data.setRecognitionInput(input);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, data, applicationKey, hmacKey, instanceId); // super
    };

    // Export
    scope.MusicRecognizer = MusicRecognizer;
})(MyScript);
