'use strict';

(function (scope) {
    /**
     * Abstract input recognition data
     *
     * @class AbstractRecognitionData
     * @constructor
     */
    function AbstractRecognitionData() {
    }

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    AbstractRecognitionData.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    /**
     * Get the instanceId
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Set the instanceId
     *
     * @method setInstanceId
     * @param {String} instanceId
     */
    AbstractRecognitionData.prototype.setInstanceId = function (instanceId) {
        this.instanceId = instanceId;
    };

    /**
     * @returns {string}
     */
    AbstractRecognitionData.prototype.getHmac = function () {
        return this.hmac;
    };

    /**
     * @param {string} hmac
     */
    AbstractRecognitionData.prototype.setHmac = function (hmac) {
        this.hmac = hmac;
    };

    /**
     * Get recognition input
     *
     * @method getRecognitionInput
     * @returns {AbstractRecognitionInput} input
     */
    AbstractRecognitionData.prototype.getRecognitionInput = function () {
        throw new Error('not implemented');
    };

    /**
     * Set text input
     *
     * @method setRecognitionInput
     * @param {AbstractRecognitionInput} input
     */
    AbstractRecognitionData.prototype.setRecognitionInput = function (input) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.AbstractRecognitionData = AbstractRecognitionData;
})(MyScript);
