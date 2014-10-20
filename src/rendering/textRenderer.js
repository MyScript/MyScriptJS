(function (scope) {

    /**
     * Represent the Text Renderer. It's use to calculate the text ink rendering in HTML5 canvas
     *
     * @class TextRenderer
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
     * @method strokesDrawing
     * @param {Object} strokes
     * @param {Object} parameters
     * @param {Object} context
     * @param {Object} scratchOutResults
     */
    TextRenderer.prototype.strokesDrawing = function (strokes, parameters, context, scratchOutResults) {

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
            this.drawStroke(newStroke, parameters, context);
        }
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);