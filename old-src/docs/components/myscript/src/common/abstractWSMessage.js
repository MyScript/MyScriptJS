'use strict';

(function (scope) {
    /**
     * Abstract WebSocket recognition message
     *
     * @class AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractWSMessage(obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get the message type
     *
     * @method getType
     * @returns {String}
     */
    AbstractWSMessage.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AbstractWSMessage = AbstractWSMessage;
})(MyScript);