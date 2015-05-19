'use strict';

(function (scope) {
    /**
     * Represent the Text Renderer. It's used to calculate the text ink rendering in HTML5 canvas
     *
     * @class TextRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function TextRenderer() {
        scope.AbstractRenderer.call(this);
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
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    TextRenderer.prototype.drawRecognitionResult = function (inputUnits, recognitionResult, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        this.drawInputUnits(inputUnits, context, params);
    };

    /**
     * Draw input units
     *
     * @method drawInputUnits
     * @param {TextInputUnit[]} inputUnits
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    TextRenderer.prototype.drawInputUnits = function (inputUnits, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in inputUnits) {
            this.drawComponents(inputUnits[i].getComponents(), context, params);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    TextRenderer.prototype.drawComponents = function (components, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.Stroke) {
                scope.AbstractRenderer.prototype.drawStroke.call(this, component, context, params); // super
            } else if (component instanceof scope.CharacterInputComponent) {
                scope.AbstractRenderer.prototype.drawCharacter.call(this, component, context, params); // super
            } else if (component instanceof scope.CharInputComponent) {
                drawChar(component, context, params);
            } else if (component instanceof scope.StringInputComponent) {
                drawString(component, context, params);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw char
     *
     * @private
     * @method drawChar
     * @param {CharInputComponent} char
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawChar = function (char, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw string
     *
     * @private
     * @method drawString
     * @param {StringInputComponent} string
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawString = function (string, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);
