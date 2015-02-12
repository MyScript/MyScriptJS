(function (scope) {
    'use strict';
    /**
     * Analyzer recognizer interface
     *
     * @class AnalyzerRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AnalyzerRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.AnalyzerParameter();
        var textParameters = new scope.TextParameter();
        textParameters.setLanguage('en_US');
        textParameters.setInputMode('CURSIVE');
        this.parameters.setTextParameters(textParameters);
    }

    /**
     * Inheritance property
     */
    AnalyzerRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    AnalyzerRecognizer.prototype.constructor = AnalyzerRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {AnalyzerParameter}
     */
    AnalyzerRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {AnalyzerParameter} parameters
     */
    AnalyzerRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do analyzer recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {AnalyzerParameter} [parameters]
     * @returns {QReturnValue}
     */
    AnalyzerRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {

        var input = new scope.AnalyzerRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setParameters(parameters);
        } else {
            input.setParameters(this.getParameters());
        }

        var data = new scope.AnalyzerRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setAnalyzerRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.AnalyzerResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.AnalyzerRecognizer = AnalyzerRecognizer;
})(MyScript);