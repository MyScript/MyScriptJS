(function (scope) {

    /**
     *
     * @param {string} url
     * @constructor
     */
    function ShapeRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
    }

    /**
     *
     * @type {MyScript.AbstractRecognizer}
     */
    ShapeRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     *
     * @type {ShapeRecognizer}
     */
    ShapeRecognizer.prototype.constructor = ShapeRecognizer;

    ShapeRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var input = self.inputCorrector.getShapeInput(parameters, components);

            var data = {
                apiKey: applicationKey,
                instanceId: instanceId,
                shapeInput: JSON.stringify(input)
            };

            self.http.post(self.url + '/shape/doSimpleRecognition.json', data).then(
                function success (response) {
                    resolve(new scope.ShapeResult(response));
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    ShapeRecognizer.prototype.clearShapeRecognitionSession = function (applicationKey, instanceId) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var data = {
                instanceId: instanceId
            };

            self.http.post(self.url + '/shape/clearSessionId.json', data).then(
                function success (response) {
                    resolve(response);
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.ShapeRecognizer = ShapeRecognizer;
})(MyScript);