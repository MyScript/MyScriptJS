(function (scope) {

    /**
     *
     * @param {String} url
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

            var input = new scope.MusicRecognitionInput();
            input.setComponents(components);
            input.setStaff(parameters.getStaff());
            input.setDivisions(parameters.getDivisions());
            input.setResultTypes(parameters.getResultTypes());
            input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
            input.setUserResources(parameters.getUserResources());

            var data = new scope.MusicRecognitionData();
            data.setApplicationKey(applicationKey);
            data.setInput(input);
            data.setInstanceId(instanceId);

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