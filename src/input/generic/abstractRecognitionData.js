(function (scope) {

    /**
     * Abstract input recognition data
     * @constructor
     */
    function AbstractRecognitionData () {
    }

    /**
     * Get the application key
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getApplicationKey = function () {
        return this.apiKey;
    };

    /**
     * Set the application key
     * @param {String} applicationKey
     */
    AbstractRecognitionData.prototype.setApplicationKey = function (applicationKey) {
        this.apiKey = applicationKey;
    };

    /**
     * Get the instanceId
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Set the instanceId
     * @param {String} instanceId
     */
    AbstractRecognitionData.prototype.setInstanceId = function (instanceId) {
        this.instanceId = instanceId;
    };

    // Export
    scope.AbstractRecognitionData = AbstractRecognitionData;
})(MyScript);