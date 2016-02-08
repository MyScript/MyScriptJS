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
    function MathRecognizer(host) {
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
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        input.setResultTypes(params.getResultTypes());
        input.setColumnar(params.isColumnar());
        input.setScratchOutDetectionSensitivity(params.getScratchOutDetectionSensitivity());
        input.setUserResources(params.getUserResources());

        var data = new scope.MathRecognitionData();
        data.setRecognitionInput(input);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, data, applicationKey, hmacKey, instanceId); // super
    };

    // Export
    scope.MathRecognizer = MathRecognizer;
})(MyScript);
