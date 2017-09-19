'use strict';

(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class InitRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function InitRequestWSMessage(obj) {
        this.type = 'applicationKey';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    InitRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    InitRequestWSMessage.prototype.constructor = InitRequestWSMessage;

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    InitRequestWSMessage.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    InitRequestWSMessage.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    // Export
    scope.InitRequestWSMessage = InitRequestWSMessage;
})(MyScript);