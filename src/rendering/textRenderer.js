'use strict';

(function (scope) {
    /**
     * Represent the Text Renderer. It's used to calculate the text ink rendering in HTML5 canvas
     *
     * @class TextRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function TextRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    TextRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    TextRenderer.prototype.constructor = TextRenderer;

    /**
     * Draw text recognition result on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {TextInputUnit[]} inputUnits
     * @param {TextDocument} recognitionResult
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    TextRenderer.prototype.drawRecognitionResult = function (inputUnits, recognitionResult, context, parameters) {
        this.drawInputUnits(inputUnits, context, parameters);
    };

    /**
     * Draw input units
     *
     * @method drawInputUnits
     * @param {TextInputUnit[]} inputUnits
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    TextRenderer.prototype.drawInputUnits = function (inputUnits, context, parameters) {
        for (var i in inputUnits) {
            this.drawComponents(inputUnits[i].getComponents(), context, parameters);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    TextRenderer.prototype.drawComponents = function (components, context, parameters) {
        if (context) {
            this._setContext(context);
        }
        if (parameters) {
            this.setParameters(parameters);
        }
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractTextInputComponent) {
                _drawTextComponent(component, this.getContext(), this.getParameters());
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component, context, parameters); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw text component
     *
     * @deprecated
     * @method drawTextComponent
     * @param {AbstractTextInputComponent} component
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    TextRenderer.prototype.drawTextComponent = function (component, context, parameters) {
        if (context) {
            this._setContext(context);
        }
        if (parameters) {
            this.setParameters(parameters);
        }
        _drawTextComponent(component, this.getContext(), this.getParameters());
    };

    /**
     * Draw text component
     *
     * @private
     * @method _drawTextComponent
     * @param {AbstractTextInputComponent} component
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawTextComponent = function (component, context, parameters) {
        if (component instanceof scope.CharInputComponent) {
            _drawChar(component, context, parameters);
        } else if (component instanceof scope.StringInputComponent) {
            _drawString(component, context, parameters);
        } else {
            throw new Error('Component not implemented: ' + component.getType());
        }
    };

    /**
     * Draw char
     *
     * @private
     * @method _drawChar
     * @param {CharInputComponent} char
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawChar = function (char, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw string
     *
     * @private
     * @method _drawString
     * @param {StringInputComponent} string
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawString = function (string, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);
