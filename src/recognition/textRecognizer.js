(function (scope) {

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

    TextRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, inputUnits, hmacKey) {

        var input = new scope.TextRecognitionInput();
        input.setParameters(parameters);
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