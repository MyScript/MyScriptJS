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

        var staffHeight = staff.getTop() + ((staff.getCount() - 1) * staff.getGap());
//            var staves = Math.floor(context.canvas.clientHeight / staff.height);
        var staves = 1;

        context.beginPath();

        // Drawing horizontal staff lines
        for (var i = 0; i < staves; i++) {
            var offset = staffHeight * i;
            for (var j = 0; j < staff.getCount(); j++) {
                context.moveTo(0, (staff.getTop() + offset) + j * staff.getGap());
                context.lineTo(context.canvas.clientWidth, (staff.getTop() + offset) + j * staff.getGap());
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
            var ratio = clef.getBoundingBox().getHeight() / this.height;
            clef.getBoundingBox().setWidth(this.width * ratio);
            context.drawImage(imageObj, clef.getBoundingBox().getX(), clef.getBoundingBox().getY(), clef.getBoundingBox().getWidth(), clef.getBoundingBox().getHeight());
        };
        imageObj.src = this.clefs[clef.getValue().getSymbol()];
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

        var scratchOutResults = recognitionResult.getScratchOutResults();
        this.cloneStrokes = strokes.slice(0);
        this.strokesToRemove = [];

        if (scratchOutResults !== undefined && scratchOutResults.length > 0) {
            for (var k in scratchOutResults) {
                if (scratchOutResults[k].getErasedInputRanges()) {
                    for (var l in scratchOutResults[k].getErasedInputRanges()) {
                        this.strokesToRemove.push(scratchOutResults[k].getErasedInputRanges()[l].getComponent());
                    }
                    for (var m in scratchOutResults[k].getInputRanges()) {
                        this.strokesToRemove.push(scratchOutResults[k].getInputRanges()[m].getComponent());
                    }
                }
            }

            this.strokesToRemove.sort(function (a, b) {
                return b - a;
            });

            for (var z in this.strokesToRemove) {
                this.cloneStrokes.splice(this.strokesToRemove[z] - 1, 1);
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
    scope.MusicRenderer = MusicRenderer;
})(MyScript);