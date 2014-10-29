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

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);