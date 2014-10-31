(function (scope) {

    /**
     * Analyzer recognizer interface
     *
     * @class AnalyzerRecognizer
     * @extends AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function AnalyzerRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
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
     * @param {AnalyzerParameter} parameters
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @returns {MyScript.Promise}
     */
    AnalyzerRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var input = new scope.AnalyzerRecognitionInput();
            input.setComponents(components);
            input.setParameters(parameters);
            input.setSwitchToChildren(true);

            var data = new scope.AnalyzerRecognitionData();
            data.setApplicationKey(applicationKey);
            data.setInput(input);
            data.setInstanceId(instanceId);

            self.http.post(self.url + '/analyzer/doSimpleRecognition.json', data).then(
                function success (response) {
                    resolve(new scope.AnalyzerResult(response));
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.AnalyzerRecognizer = AnalyzerRecognizer;
})(MyScript);