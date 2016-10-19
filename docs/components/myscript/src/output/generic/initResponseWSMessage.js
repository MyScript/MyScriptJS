'use strict';

(function (scope) {
    /**
     * WebSocket recognition init message
     *
     * @class InitResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function InitResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    InitResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    InitResponseWSMessage.prototype.constructor = InitResponseWSMessage;

    // Export
    scope.InitResponseWSMessage = InitResponseWSMessage;
})(MyScript);