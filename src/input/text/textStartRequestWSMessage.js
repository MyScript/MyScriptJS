(function (scope) {
    'use strict';
    /**
     * WebSocket start text recognition message
     *
     * @class TextStartRequestWSMessage
     * @extends AbstractStartRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function TextStartRequestWSMessage(obj) {
        scope.AbstractStartRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    TextStartRequestWSMessage.prototype = new scope.AbstractStartRequestWSMessage();

    /**
     * Constructor property
     */
    TextStartRequestWSMessage.prototype.constructor = TextStartRequestWSMessage;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MyScript.TextParameter}
     */
    TextStartRequestWSMessage.prototype.getParameters = function () {
        return this.textParameter;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MyScript.TextParameter} parameters
     */
    TextStartRequestWSMessage.prototype.setParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get input units
     *
     * @method getInputUnits
     * @returns {MyScript.TextInputUnit[]}
     */
    TextStartRequestWSMessage.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {MyScript.TextInputUnit[]} inputUnits
     */
    TextStartRequestWSMessage.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

        // Export
    scope.TextStartRequestWSMessage = TextStartRequestWSMessage;
})(MyScript);