'use strict';

(function (scope) {
    /**
     * WebSocket recognition error message
     *
     * @class ErrorResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ErrorResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
        if (obj) {
            this.error = obj.error;
        }
    }

    /**
     * Inheritance property
     */
    ErrorResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ErrorResponseWSMessage.prototype.constructor = ErrorResponseWSMessage;

    /**
     * Get the error
     *
     * @method getError
     * @returns {String}
     */
    ErrorResponseWSMessage.prototype.getError = function () {
        return this.error;
    };

    // Export
    scope.ErrorResponseWSMessage = ErrorResponseWSMessage;
})(MyScript);