(function (scope) {

    /**
     * Represent the Math Renderer. It's used to calculate the math ink rendering in HTML5 canvas
     *
     * @class MathRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function MathRenderer () {
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
     * @param {Array} strokes
     * @param {MathDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MathRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {

        var scratchOutResults = recognitionResult.scratchOutResults;
        this.cloneStrokes = strokes.slice(0);
        this.strokesToRemove = [];

        if (scratchOutResults !== undefined && scratchOutResults.length > 0) {
            for (var k in scratchOutResults) {
                if (scratchOutResults[k].erasedInputRanges) {
                    for (var l in scratchOutResults[k].erasedInputRanges) {
                        this.strokesToRemove.push(scratchOutResults[k].erasedInputRanges[l].component);
                    }
                    for (var m in scratchOutResults[k].inputRanges) {
                        this.strokesToRemove.push(scratchOutResults[k].inputRanges[m].component);
                    }
                }

                if (scratchOutResults[k].erasedInkRanges) {
                    for (var n in scratchOutResults[k].erasedInkRanges) {
                        this.strokesToRemove.push(scratchOutResults[k].erasedInkRanges[n].component);
                    }
                    for (var p in scratchOutResults[k].inkRanges) {
                        this.strokesToRemove.push(scratchOutResults[k].inkRanges[p].component);
                    }
                }
            }

            this.strokesToRemove.sort(function (a, b) {
                return b - a;
            });

            for (var z in this.strokesToRemove) {
                this.cloneStrokes.splice(this.strokesToRemove[z], 1);
            }
        }

        for (var i in this.cloneStrokes) {
            var newStroke = [];

            for (var j = 0; j < this.cloneStrokes[i].x.length; j++) {
                newStroke.push({
                    x: this.cloneStrokes[i].x[j],
                    y: this.cloneStrokes[i].y[j],
                    pressure: 0.5,
                    distance: 0.0,
                    length: 0.0,
                    ux: 0.0,
                    uy: 0.0,
                    x1: 0.0,
                    x2: 0.0,
                    y1: 0.0,
                    y2: 0.0
                });
            }
            this.drawStrokes(new Array(newStroke), parameters, context);
        }
    };

    // Export
    scope.MathRenderer = MathRenderer;
})(MyScript);