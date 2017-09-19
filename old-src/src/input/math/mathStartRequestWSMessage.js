'use strict';

(function (scope) {
    /**
     * WebSocket start math recognition message
     *
     * @class MathStartRequestWSMessage
     * @extends AbstractStartRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function MathStartRequestWSMessage(obj) {
        scope.AbstractStartRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathStartRequestWSMessage.prototype = new scope.AbstractStartRequestWSMessage();

    /**
     * Constructor property
     */
    MathStartRequestWSMessage.prototype.constructor = MathStartRequestWSMessage;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathStartRequestWSMessage.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathStartRequestWSMessage.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Get components
     *
     * @method getComponents
     * @returns {MathInputUnit[]}
     */
    MathStartRequestWSMessage.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set components
     *
     * @method setComponents
     * @param {MathInputUnit[]} components
     */
    MathStartRequestWSMessage.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.MathStartRequestWSMessage = MathStartRequestWSMessage;
})(MyScript);