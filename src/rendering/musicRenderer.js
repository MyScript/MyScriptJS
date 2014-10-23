(function (scope) {

    /**
     * Represent the Music Renderer. It's use to calculate the music ink rendering in HTML5 canvas
     *
     * @class MusicRenderer
     * @constructor
     */
    function MusicRenderer () {
        this.clefs = {
            C: 'images/music/c_clef.svg',
            F: 'images/music/f_clef.svg',
            G: 'images/music/g_clef.svg'
        };
    }

    /**
     * Inheritance property
     */
    MusicRenderer.prototype = new scope.TextRenderer();

    /**
     * Constructor property
     */
    MusicRenderer.prototype.constructor = MusicRenderer;

    /**
     * Draw staff on the HTML5 canvas
     *
     * @method staffDrawing
     * @param {Object} staff
     * @param {Object} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.staffDrawing = function (staff, parameters, context) {

        var staffHeight = staff.top + ((staff.count - 1) * staff.gap);
//            var staves = Math.floor(context.canvas.clientHeight / staff.height);
        var staves = 1;

        context.beginPath();

        // Drawing horizontal staff lines
        for (var i = 0; i < staves; i++) {
            var offset = staffHeight * i;
            for (var j = 0; j < staff.count; j++) {
                context.moveTo(0, (staff.top + offset) + j * staff.gap);
                context.lineTo(context.canvas.clientWidth, (staff.top + offset) + j * staff.gap);
            }
        }

        context.stroke();
    };

    /**
     * Draw components
     *
     * @method componentsDrawing
     * @param {Array} components
     * @param {Object} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.componentsDrawing = function (components, parameters, context) {
        for (var i in components) {
            var component = components[i];
            if (component.type === 'clef') {
                this.clefDrawing(component, parameters, context);
            }
        }
    };

    /**
     * Draw clef
     *
     * @method clefDrawing
     * @param {Object} clef
     * @param {Object} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.clefDrawing = function (clef, parameters, context) {

        var imageObj = new Image();
        imageObj.onload = function () {
            var ratio = clef.boundingBox.height / this.height;
            clef.boundingBox.width = this.width * ratio;
            context.drawImage(imageObj, clef.boundingBox.x, clef.boundingBox.y, clef.boundingBox.width, clef.boundingBox.height);
        };
        imageObj.src = this.clefs[clef.value.symbol];
    };

    /**
     * Draw music strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawStrokesByRecognitionResult
     * @param {Object} strokes
     * @param {Object} parameters
     * @param {Object} context
     * @param {Object} scratchOutResults
     */
    MusicRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {

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
            this.drawStrokes(newStroke, parameters, context);
        }
    };

    // Export
    scope.MusicRenderer = MusicRenderer;
})(MyScript);