(function (scope) {

    /**
     * @constructor
     */
    function AbstractRecognitionData () {
    }

    /**
     * @returns {string}
     */
    AbstractRecognitionData.prototype.getApplicationKey = function () {
        return this.apiKey;
    };

    /**
     * @param {string} applicationKey
     */
    AbstractRecognitionData.prototype.setApplicationKey = function (applicationKey) {
        this.apiKey = applicationKey;
    };

    /**
     * @returns {string}
     */
    AbstractRecognitionData.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * @param {string} instanceId
     */
    AbstractRecognitionData.prototype.setInstanceId = function (instanceId) {
        this.instanceId = instanceId;
    };

    // Export
    scope.AbstractRecognitionData = AbstractRecognitionData;
})(MyScript);