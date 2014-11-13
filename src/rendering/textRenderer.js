(function (scope) {

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
     * @method drawStrokesByRecognitionResult
     * @param {Stroke[]} strokes
     * @param {TextDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    TextRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
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
     * Draw text candidate
     *
     * @private
     * @method drawTextCandidate
     * @param {Stroke[]} strokes
     * @param {TextCandidate} textCandidate
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawTextCandidate = function (strokes, textCandidate, parameters, context) {

        if (parameters.getShowBoundingBoxes()) {
            var rectangleList = [];
            for (var i in strokes) {
                rectangleList.push(strokes[i].getBoundingBox());
            }
            var boundingRect = scope.MathUtils.getBoundingRect(rectangleList);


            context.save();
            try {
                context.fillStyle = parameters.getRectColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();

                context.fillRect(boundingRect.getX(), boundingRect.getY(), boundingRect.getWidth(), boundingRect.getHeight());

                var textHeight = scope.MathUtils.getFontSize(textCandidate.getLabel(), boundingRect, parameters, context);
                context.font = parameters.getDecoration() + textHeight + 'px ' + parameters.getFont();
                context.fillStyle = parameters.getColor();

                context.fillText(textCandidate.getLabel(), boundingRect.getX(), boundingRect.getY() + boundingRect.getHeight());
            } finally {
                context.restore();
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
    var drawChar = function (char, parameters, context) {
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
    var drawCharacter = function (character, parameters, context) {
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
    var drawString = function (string, parameters, context) {
        throw new Error('not implemented');
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);
