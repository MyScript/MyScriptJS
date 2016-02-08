'use strict';

(function (scope) {
    /**
     * Text recognizer interface
     *
     * @class TextRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.TextParameter();
        this.parameters.setLanguage('en_US');
        this.parameters.setInputMode('CURSIVE');
    }

    /**
     * Inheritance property
     */
    TextRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    TextRecognizer.prototype.constructor = TextRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {TextParameter}
     */
    TextRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {TextParameter} parameters
     */
    TextRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do text recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {TextInputUnit[]} inputUnits
     * @param {String} hmacKey
     * @param {TextParameter} [parameters]
     * @returns {Promise}
     */
    TextRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, inputUnits, hmacKey, parameters) {
        var input = new scope.TextRecognitionInput();
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        input.setParameters(params);
        input.setInputUnits(inputUnits);

        var data = new scope.TextRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setRecognitionInput(input);
        data.setInstanceId(instanceId);
        if (hmacKey) {
            data.setHmac(this.computeHmac(applicationKey, input, hmacKey));
        }

        return scope.NetworkInterface.post('https://' + this.getHost() + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.TextResult(response);
            },
            function error(response) {
                throw response;
            }
        );
    };

    // Export
    scope.TextRecognizer = TextRecognizer;
})(MyScript);
