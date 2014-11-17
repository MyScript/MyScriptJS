(function (scope) {

    /**
     * Represent the Math Renderer. It's used to calculate the math ink rendering in HTML5 canvas
     *
     * @class MathRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function MathRenderer() {
        this.cloneStrokes = [];
        this.strokesToRemove = [];
    }

    /**
     * Inheritance property
     */
    MathRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    MathRenderer.prototype.constructor = MathRenderer;

    /**
     * Draw math strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawStrokesByRecognitionResult
     * @param {Stroke[]} strokes
     * @param {MathDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MathRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        var notScratchOutStrokes = this.removeScratchOutStrokes(strokes, recognitionResult.getScratchOutResults()), globalBoundingBox = [];

        for (var i in notScratchOutStrokes) {
            var stroke = notScratchOutStrokes[i], boundingBox = {
                yMin: undefined,
                xMin: undefined,
                yMax: undefined,
                xMax: undefined
            };
            this.drawStroke(stroke, parameters, context);
            if (parameters.getShowBoundingBoxes()) {
                // Draw input Ink global bounding box
                this.computeBoundingBox(this.computeInkRange(stroke), stroke, boundingBox);
                this.drawBoundingBox(boundingBox, context);
                globalBoundingBox.push(boundingBox);
            }
        }
        // Draw input Ink global bounding box
        this.drawBoundingBox(this.computeGlobalBoundingBox(globalBoundingBox), context);
    };

    /**
     * Remove scratch out from input strokes
     *
     * @param {Stroke[]} strokes
     * @param {MusicScratchOut[]} scratchOutResults
     * @returns {Stroke[]} notScratchOutStrokes
     */
    MathRenderer.prototype.removeScratchOutStrokes = function (strokes, scratchOutResults) {
        if (!scratchOutResults || scratchOutResults.length === 0) {
            return strokes;
        }

        var cloneStrokes = strokes.slice(0);
        var strokesToRemove = [];

        for (var k in scratchOutResults) {
            if (scratchOutResults[k].getErasedInkRanges()) {
                for (var n in scratchOutResults[k].getErasedInkRanges()) {
                    strokesToRemove.push(scratchOutResults[k].getErasedInkRanges()[n].getComponent());
                }
                for (var p in scratchOutResults[k].getInkRanges()) {
                    strokesToRemove.push(scratchOutResults[k].getInkRanges()[p].getComponent());
                }
            }
        }

        strokesToRemove.sort(function (a, b) {
            return b - a;
        });

        for (var z in strokesToRemove) {
            cloneStrokes.splice(strokesToRemove[z], 1);
        }
        return cloneStrokes;
    };

    MathRenderer.prototype.getGlobalInkBoundingBox = function (strokes){
        var globalBoundingBox = [];

        for (var i in strokes) {
            var stroke = strokes[i], boundingBox = {
                yMin: undefined,
                xMin: undefined,
                yMax: undefined,
                xMax: undefined
            };
            // Compute input Ink global bounding box
            this.computeBoundingBox(this.computeInkRange(stroke), stroke, boundingBox);
            globalBoundingBox.push(boundingBox);
        }

        return  this.computeGlobalBoundingBox(globalBoundingBox);
    };

    /**
     * Draw math strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawFontByRecognitionResult
     * @param {Object} strokes
     * @param {Object} parameters
     * @param {Object} context
     * @param {Object} scratchOutResults
     */
    MathRenderer.prototype.drawFontByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        var terminalNodeArray = [],
            notScratchOutStrokes = [];

        // Remove Scratch out strokes
        notScratchOutStrokes = this.removeScratchOutStrokes(strokes, recognitionResult.getScratchOutResults());

        // Compute data for drawing RecognitionResult
        terminalNodeArray = this.createRecognizedObjectsForFontification(strokes, recognitionResult, this.getGlobalInkBoundingBox(notScratchOutStrokes));

        // Draw Font by computed data on HTML5 canvas context
        this.drawRecognizedObjectsOnContext(terminalNodeArray, parameters, context);
    };

    /**
     *
     * @param strokes
     * @param recognitionResult
     * @param terminalNodeArray
     */
    MathRenderer.prototype.createRecognizedObjectsForFontification = function (strokes, recognitionResult, globalBoundingBox) {
        var terminalNodeArray = [];
        for (var i in recognitionResult.results) {
            if (recognitionResult.results[i].type === 'SYMBOLTREE') {
                terminalNodeArray = new scope.MathParser().formatSymbolTreeToArray(strokes, recognitionResult.results[i], globalBoundingBox);
            }
        }
        return terminalNodeArray;
    }

    /**
     *
     * @param terminalNodeArray
     * @param parameters
     * @param context
     */
    MathRenderer.prototype.drawRecognizedObjectsOnContext = function (terminalNodeArray, parameters, context) {
        var string = [];

        for (var j in terminalNodeArray) {
            string.push({
                name: terminalNodeArray[j].name,
                label: terminalNodeArray[j].label,
                inkRanges: terminalNodeArray[j].inkRanges,
                strokes: terminalNodeArray[j].strokes,
                inkBoundingBox: terminalNodeArray[j].inkBoundingBox,
                globalInkBoundingBox: terminalNodeArray[j].globalInkBoundingBox,
                computedFontBoundingBox: terminalNodeArray[j].computedFontBoundingBox,
                color: terminalNodeArray[j].color
            });
        }
        //this.fontification(string, context);
        this.fontificationWithoutAnimation(string, context);
    };

    MathRenderer.prototype.fontificationWithoutAnimation = function (terminalNodeArray, context){
        var t = new scope.AbstractRenderer();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i in terminalNodeArray) {
            context.fillStyle = terminalNodeArray[i].color;
            context.strokeStyle = terminalNodeArray[i].color;
            context.textBaseline="alphabetic";
            context.font = terminalNodeArray[i].computedFontBoundingBox.yMax - terminalNodeArray[i].computedFontBoundingBox.yMin + 'pt "HelveticaNeue-Light"';
            switch (terminalNodeArray[i].name) {
                case 'fraction bar':
                    context.beginPath();
                    context.lineWidth = (terminalNodeArray[i].computedFontBoundingBox.yMax - terminalNodeArray[i].computedFontBoundingBox.yMin) / 10;
                    context.moveTo(terminalNodeArray[i].computedFontBoundingBox.xMin, terminalNodeArray[i].computedFontBoundingBox.yMin + (2/3 * (terminalNodeArray[i].computedFontBoundingBox.yMax - terminalNodeArray[i].computedFontBoundingBox.yMin)));
                    context.lineTo(terminalNodeArray[i].computedFontBoundingBox.xMax, terminalNodeArray[i].computedFontBoundingBox.yMin + (2/3 * (terminalNodeArray[i].computedFontBoundingBox.yMax - terminalNodeArray[i].computedFontBoundingBox.yMin)));
                    context.stroke();
                    break;
                default:
                    context.fillText(terminalNodeArray[i].label, terminalNodeArray[i].computedFontBoundingBox.xMin, terminalNodeArray[i].computedFontBoundingBox.yMax);
            }
            t.drawBoundingBox(terminalNodeArray[i].computedFontBoundingBox, context);
        }
    };

    MathRenderer.prototype.fontification = function (terminalNodeArray, context){
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        var animationDuration = 500.0;
        var start = null;

        function computeCurrentX(letter, animationProgress) {
            return letter.inkBoundingBox.xMin - (letter.inkBoundingBox.xMin - letter.computedFontBoundingBox.xMin) * animationProgress;
        }

        function computeCurrentY(letter, animationProgress) {
            return letter.inkBoundingBox.yMin - (letter.inkBoundingBox.yMin - letter.computedFontBoundingBox.yMax) * animationProgress;
        }

        function computeSize(letter, animationProgress) {
            var height = letter.inkBoundingBox.yMax - letter.inkBoundingBox.yMin,
                computedHeight = letter.computedFontBoundingBox.yMax - letter.computedFontBoundingBox.yMin;

            return height - (height - computedHeight) * animationProgress;
        }

        function draw(timestamp) {
            var animationProgress;
            start = start || timestamp;
            animationProgress = Math.min(1.0, (timestamp - start) / animationDuration);
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            for (var i in terminalNodeArray) {
                context.fillStyle = terminalNodeArray[i].color;
                context.strokeStyle = terminalNodeArray[i].color;
                context.textBaseline="alphabetic";
                context.font = computeSize(terminalNodeArray[i], animationProgress) + 'pt "HelveticaNeue-Light"';
                switch (terminalNodeArray[i].name) {
                    case 'fraction bar':
                        context.beginPath();
                        context.lineWidth = (terminalNodeArray[i].computedFontBoundingBox.yMax - terminalNodeArray[i].computedFontBoundingBox.yMin) / 10;
                        context.moveTo(terminalNodeArray[i].computedFontBoundingBox.xMin, terminalNodeArray[i].computedFontBoundingBox.yMin + (2/3 * (terminalNodeArray[i].computedFontBoundingBox.yMax - terminalNodeArray[i].computedFontBoundingBox.yMin)));
                        context.lineTo(terminalNodeArray[i].computedFontBoundingBox.xMax, terminalNodeArray[i].computedFontBoundingBox.yMin + (2/3 * (terminalNodeArray[i].computedFontBoundingBox.yMax - terminalNodeArray[i].computedFontBoundingBox.yMin)));
                        context.stroke();
                        break;
                    default:
                        context.fillText(terminalNodeArray[i].label, computeCurrentX(terminalNodeArray[i], animationProgress), computeCurrentY(terminalNodeArray[i], animationProgress));
                }
            }
            if (animationProgress < 1.0) {
                requestAnimationFrame(draw);
            }
        }
        requestAnimationFrame(draw);
    };

    // Export
    scope.MathRenderer = MathRenderer;
})(MyScript);