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
     * @param {Object} strokes
     * @param {Object} parameters
     * @param {Object} context
     * @param {Object} scratchOutResults
     */
    TextRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, parameters, context) {
        this.drawStrokes(strokes, parameters, context);
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);