'use strict';

(function (scope) {
    /**
     * WebSocket continue math recognition message
     *
     * @class MathContinueRequestWSMessage
     * @extends AbstractContinueRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function MathContinueRequestWSMessage(obj) {
        this.type = 'continue';
        scope.AbstractContinueRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathContinueRequestWSMessage.prototype = new scope.AbstractContinueRequestWSMessage();

    /**
     * Constructor property
     */
    MathContinueRequestWSMessage.prototype.constructor = MathContinueRequestWSMessage;

    /**
     * Get components
     *
     * @method getComponents
     * @returns {MathInputUnit[]}
     */
    MathContinueRequestWSMessage.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set components
     *
     * @method setComponents
     * @param {MathInputUnit[]} components
     */
    MathContinueRequestWSMessage.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.MathContinueRequestWSMessage = MathContinueRequestWSMessage;
})(MyScript);