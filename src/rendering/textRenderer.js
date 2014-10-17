/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function TextRenderer () {
    }

    /**
     *
     * @type {MyScript.AbstractRenderer}
     */
    TextRenderer.prototype = new scope.AbstractRenderer();

    /**
     *
     * @type {TextRenderer}
     */
    TextRenderer.prototype.constructor = TextRenderer;

    /**
     *
     * @type {boolean}
     */
    TextRenderer.prototype.showBoundingBoxes = false;

    /**
     *
     * @type {boolean}
     */
    TextRenderer.prototype.doFadeOutLoop = true;

    /**
     *
     * @type {Array}
     */
    TextRenderer.prototype.cloneStrokes = [];

    /**
     *
     * @type {Array}
     */
    TextRenderer.prototype.strokesToRemove = [];

    /**
     *
     * @param strokes
     * @param parameters
     * @param context
     * @param scratchOutResults
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

    /**
     *
     * @param window
     * @param timeout
     * @param lastStroke
     * @param parameters
     * @param context
     */
    TextRenderer.prototype.fadeout = function (window, timeout, lastStroke, parameters, context) {
        var alpha = 1,/// current alpha
            delta = 0.02;

        this.doFadeOutLoop = true;

        function launch () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                function (callback) {
                    timeout(callback, 500);
                };
        }

        function loop (doFadeOutLoop, strokesDrawing) {
            /// dicrease alpha with delta value
            alpha -= delta;
            /// clear canvas
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            if (alpha >= 0 && doFadeOutLoop) {
                /// fadeout stroke
                parameters.alpha = alpha;
                strokesDrawing(lastStroke, parameters, context);
                window.requestAnimationFrame(loop);
            }
        }

        window.requestAnimationFrame = launch();
        loop(this.doFadeOutLoop, this.strokesDrawing);
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);