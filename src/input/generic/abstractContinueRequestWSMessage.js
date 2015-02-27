'use strict';

(function (scope) {
    /**
     * WebSocket continue math recognition message
     *
     * @class AbstractContinueRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractContinueRequestWSMessage(obj) {
        this.type = 'continue';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    AbstractContinueRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    AbstractContinueRequestWSMessage.prototype.constructor = AbstractContinueRequestWSMessage;

    /**
     * Get instanceId
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractContinueRequestWSMessage.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Set instanceId
     *
     * @method setInstanceId
     * @param {String} instanceId
     */
    AbstractContinueRequestWSMessage.prototype.setInstanceId = function (instanceId) {
        this.instanceId = instanceId;
    };

    // Export
    scope.AbstractContinueRequestWSMessage = AbstractContinueRequestWSMessage;
})(MyScript);