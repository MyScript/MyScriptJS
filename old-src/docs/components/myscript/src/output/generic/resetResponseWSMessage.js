'use strict';

(function (scope) {
    /**
     * WebSocket recognition reset message
     *
     * @class ResetResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ResetResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ResetResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ResetResponseWSMessage.prototype.constructor = ResetResponseWSMessage;

    // Export
    scope.ResetResponseWSMessage = ResetResponseWSMessage;
})(MyScript);