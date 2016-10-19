'use strict';

(function (scope) {
    /**
     * Analyzer recognizer interface
     *
     * @class AnalyzerRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AnalyzerRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.AnalyzerParameter();
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
     * Do analyzer recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {AnalyzerParameter} [parameters]
     * @returns {Promise}
     */
    AnalyzerRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var input = new scope.AnalyzerRecognitionInput();
        input.setParameters(params);
        input.setComponents(components);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
    };

    // Export
    scope.AnalyzerRecognizer = AnalyzerRecognizer;
})(MyScript);
