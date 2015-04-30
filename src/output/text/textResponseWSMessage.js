'use strict';

(function (scope) {
    /**
     * WebSocket recognition text result message
     *
     * @class TextResponseWSMessage
     * @extends AbstractRecoResponseWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function TextResponseWSMessage(obj) {
        scope.AbstractRecoResponseWSMessage.call(this, obj);
        if (obj) {
            if (obj.result) {
                this.result = new scope.TextDocument(obj.result);
            }
        }
    }

    /**
     * Inheritance property
     */
    TextResponseWSMessage.prototype = new scope.AbstractRecoResponseWSMessage();

    /**
     * Constructor property
     */
    TextResponseWSMessage.prototype.constructor = TextResponseWSMessage;

    /**
     * Get text document
     *
     * @method getTextDocument
     * @returns {TextDocument}
     */
    TextResponseWSMessage.prototype.getTextDocument = function () {
        return this.result;
    };

    // Export
    scope.TextResponseWSMessage = TextResponseWSMessage;
})(MyScript);