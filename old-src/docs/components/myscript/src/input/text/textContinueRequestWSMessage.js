'use strict';

(function (scope) {
    /**
     * WebSocket continue text recognition message
     *
     * @class TextContinueRequestWSMessage
     * @extends AbstractContinueRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function TextContinueRequestWSMessage(obj) {
        scope.AbstractContinueRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    TextContinueRequestWSMessage.prototype = new scope.AbstractContinueRequestWSMessage();

    /**
     * Constructor property
     */
    TextContinueRequestWSMessage.prototype.constructor = TextContinueRequestWSMessage;

    /**
     * Get input units
     *
     * @method getInputUnits
     * @returns {TextInputUnit[]}
     */
    TextContinueRequestWSMessage.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {TextInputUnit[]} inputUnits
     */
    TextContinueRequestWSMessage.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    // Export
    scope.TextContinueRequestWSMessage = TextContinueRequestWSMessage;
})(MyScript);