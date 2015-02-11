(function (scope) {
    'use strict';
    /**
     * Text recognizer interface
     *
     * @class TextRecognizer
     * @extends AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function TextRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
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
     * @param {TextParameter} parameters
     * @param {String} instanceId
     * @param {TextInputUnit[]} inputUnits
     * @param {String} hmacKey
     * @returns {QReturnValue}
     */
    TextRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, inputUnits, hmacKey, parameters) {

        var input = new scope.TextRecognitionInput();
        if (parameters) {
            input.setParameters(parameters);
        } else {
            input.setParameters(this.parameters);
        }
        input.setInputUnits(inputUnits);

        var data = new scope.TextRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setTextRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post(this.url + '/text/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.TextResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.TextRecognizer = TextRecognizer;
})(MyScript);