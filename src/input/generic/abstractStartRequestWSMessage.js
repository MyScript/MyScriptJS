'use strict';

(function (scope) {
    /**
     * WebSocket start math recognition message
     *
     * @class AbstractStartRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractStartRequestWSMessage(obj) {
        this.type = 'start';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    AbstractStartRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    AbstractStartRequestWSMessage.prototype.constructor = AbstractStartRequestWSMessage;

    // Export
    scope.AbstractStartRequestWSMessage = AbstractStartRequestWSMessage;
})(MyScript);