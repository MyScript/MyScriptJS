'use strict';

(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class ResetRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ResetRequestWSMessage(obj) {
        this.type = 'reset';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ResetRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ResetRequestWSMessage.prototype.constructor = ResetRequestWSMessage;

    // Export
    scope.ResetRequestWSMessage = ResetRequestWSMessage;
})(MyScript);