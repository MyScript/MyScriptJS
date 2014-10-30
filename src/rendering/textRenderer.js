(function (scope) {

    /**
     * Represent the Text Renderer. It's use to calculate the text ink rendering in HTML5 canvas
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
     * @method drawStrokesByRecognitionResult
     * @param {Array} strokes
     * @param {TextDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {Array} components
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawComponents = function (components, parameters, context) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, parameters, context); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.CharInputComponent) {
                this.drawChar(component, parameters, context);
            } else if (component instanceof scope.CharacterInputComponent) {
                this.drawCharacter(component, parameters, context);
            } else if (component instanceof scope.StringInputComponent) {
                this.drawString(component, parameters, context);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw char
     *
     * @method drawChar
     * @param {CharInputComponent} char
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawChar = function (char, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw character
     *
     * @method drawCharacter
     * @param {CharacterInputComponent} character
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawCharacter = function (character, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw string
     *
     * @method drawString
     * @param {StringInputComponent} string
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawString = function (string, parameters, context) {
        throw new Error('not implemented');
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);