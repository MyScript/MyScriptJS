(function (scope) {
    'use strict';
    /**
     * Represent the Text Renderer. It's used to calculate the text ink rendering in HTML5 canvas
     *
     * @class TextRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function TextRenderer () {
        this.cloneStrokes = [];
        this.strokesToRemove = [];
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
     * Draw text strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {TextDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        this.drawStrokes(strokes, parameters, context);
    };

    /**
     * Draw input units
     *
     * @method drawInputUnits
     * @param {TextInputUnit[]} inputUnits
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawInputUnits = function (inputUnits, parameters, context) {
        for (var i in inputUnits) {
            this.drawComponents(inputUnits[i].getComponents(), parameters, context);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractTextInputComponent[]} components
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawComponents = function (components, parameters, context) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, parameters, context); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.CharInputComponent) {
                drawChar(component, parameters, context);
            } else if (component instanceof scope.CharacterInputComponent) {
                drawCharacter(component, parameters, context);
            } else if (component instanceof scope.StringInputComponent) {
                drawString(component, parameters, context);
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
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawChar = function (char, parameters, context) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw character
     *
     * @private
     * @method drawCharacter
     * @param {CharacterInputComponent} character
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawCharacter = function (character, parameters, context) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw string
     *
     * @private
     * @method drawString
     * @param {StringInputComponent} string
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawString = function (string, parameters, context) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);
