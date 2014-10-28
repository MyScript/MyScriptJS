(function (scope) {

    /**
     *
     * @param {string} url
     * @constructor
     */
    function MusicRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
    }

    /**
     *
     * @type {MyScript.AbstractRecognizer}
     */
    MusicRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     *
     * @type {MusicRecognizer}
     */
    MusicRecognizer.prototype.constructor = MusicRecognizer;

    MusicRecognizer.prototype.doSimpleRecognition = function (applicationKey, parameters, instanceId, components) {

        var self = this;
        return new scope.Promise(function(resolve, reject) {

            var input = self.inputCorrector.getMusicInput(parameters, components);

            var data = {
                apiKey: applicationKey,
                instanceId: instanceId,
                musicInput: JSON.stringify(input)
            };

            self.http.post(self.url + '/music/doSimpleRecognition.json', data).then(
                function success (response) {
                    resolve(new scope.MusicResult(response));
                },
                function error (response) {
                    reject(response);
                }
            );
        });
    };

    // Export
    scope.MusicRecognizer = MusicRecognizer;
})(MyScript);