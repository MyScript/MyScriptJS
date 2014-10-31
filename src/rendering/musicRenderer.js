(function (scope) {

    /**
     * Represent the Music Renderer. It's used to calculate the music ink rendering in HTML5 canvas
     *
     * @class MusicRenderer
     * @extends AbstractRenderer
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
     * Draw music strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawStrokesByRecognitionResult
     * @param {Array} strokes
     * @param {MusicDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        var notScratchOutStrokes = this.removeScratchOutStrokes(strokes, recognitionResult.getScratchOutResults());
        this.drawStrokes(notScratchOutStrokes, parameters, context);
    };

    /**
     * Remove scratch out from input strokes
     *
     * @param {Array} strokes
     * @param {Array} scratchOutResults
     * @returns {Array} notScratchOutStrokes
     */
    MusicRenderer.prototype.removeScratchOutStrokes = function (strokes, scratchOutResults) {
        if (!scratchOutResults) {
            return strokes;
        }

        var cloneStrokes = strokes.slice(0);
        var strokesToRemove = [];

        for (var k in scratchOutResults) {
            if (scratchOutResults[k].getErasedInputRanges()) {
                for (var l in scratchOutResults[k].getErasedInputRanges()) {
                    strokesToRemove.push(scratchOutResults[k].getErasedInputRanges()[l].getComponent());
                }
                for (var m in scratchOutResults[k].getInputRanges()) {
                    strokesToRemove.push(scratchOutResults[k].getInputRanges()[m].getComponent());
                }
            }
        }

        strokesToRemove.sort(function (a, b) {
            return b - a;
        });

        for (var z in strokesToRemove) {
            cloneStrokes.splice(strokesToRemove[z] - 1, 1);
        }
        return cloneStrokes;
    };

    /**
     * Draw staff on the HTML5 canvas
     *
     * @method staffDrawing
     * @param {MusicStaff} staff
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawStaff = function (staff, parameters, context) {

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
     * @method drawComponents
     * @param {Array} components
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawComponents = function (components, parameters, context) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, parameters, context); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.MusicAccidentalInputComponent) {
                this.drawAccidental(component, parameters, context);
            } else if (component instanceof scope.MusicArpeggiateInputComponent) {
                this.drawArpeggiate(component, parameters, context);
            } else if (component instanceof scope.MusicBarInputComponent) {
                this.drawBar(component, parameters, context);
            } else if (component instanceof scope.MusicBeamInputComponent) {
                this.drawBeam(component, parameters, context);
            } else if (component instanceof scope.MusicClefInputComponent) {
                this.drawClef(component, parameters, context);
            } else if (component instanceof scope.MusicDecorationInputComponent) {
                this.drawDecoration(component, parameters, context);
            } else if (component instanceof scope.MusicDotsInputComponent) {
                this.drawDots(component, parameters, context);
            } else if (component instanceof scope.MusicHeadInputComponent) {
                this.drawHead(component, parameters, context);
            } else if (component instanceof scope.MusicLedgerLineInputComponent) {
                this.drawLedgerLine(component, parameters, context);
            } else if (component instanceof scope.MusicRestInputComponent) {
                this.drawRest(component, parameters, context);
            } else if (component instanceof scope.MusicStemInputComponent) {
                this.drawStem(component, parameters, context);
            } else if (component instanceof scope.MusicTieOrSlurInputComponent) {
                this.drawTieOrSlur(component, parameters, context);
            } else if (component instanceof scope.MusicTimeSignatureInputComponent) {
                this.drawTimeSignature(component, parameters, context);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw accidental
     *
     * @method drawAccidental
     * @param {MusicAccidentalInputComponent} accidental
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawAccidental = function (accidental, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw arpeggiate
     *
     * @method drawArpeggiate
     * @param {MusicArpeggiateInputComponent} arpeggiate
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawArpeggiate = function (arpeggiate, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw bar
     *
     * @method drawBar
     * @param {MusicBarInputComponent} bar
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawBar = function (bar, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw beam
     *
     * @method drawBeam
     * @param {MusicBeamInputComponent} beam
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawBeam = function (beam, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw clef
     *
     * @method drawClef
     * @param {MusicClefInputComponent} clef
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawClef = function (clef, parameters, context) {

        var imageObj = new Image();
        imageObj.onload = function () {
            var ratio = clef.getBoundingBox().getHeight() / this.height;
            clef.getBoundingBox().setWidth(this.width * ratio);
            context.drawImage(imageObj, clef.getBoundingBox().getX(), clef.getBoundingBox().getY(), clef.getBoundingBox().getWidth(), clef.getBoundingBox().getHeight());
        };
        imageObj.src = this.clefs[clef.getValue().getSymbol()];
    };

    /**
     * Draw decoration
     *
     * @method drawDecoration
     * @param {MusicDecorationInputComponent} decoration
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawDecoration = function (decoration, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw dots
     *
     * @method drawDots
     * @param {MusicDotsInputComponent} dots
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawDots = function (dots, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw head
     *
     * @method drawHead
     * @param {MusicHeadInputComponent} head
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawHead = function (head, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw ledgerLine
     *
     * @method drawLedgerLine
     * @param {MusicLedgerLineInputComponent} ledgerLine
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawLedgerLine = function (ledgerLine, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw rest
     *
     * @method drawRest
     * @param {MusicRestInputComponent} rest
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawRest = function (rest, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw stem
     *
     * @method drawStem
     * @param {MusicStemInputComponent} stem
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawStem = function (stem, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw tieOrSlur
     *
     * @method drawTieOrSlur
     * @param {MusicTieOrSlurInputComponent} tieOrSlur
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawTieOrSlur = function (tieOrSlur, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw timeSignature
     *
     * @method drawTimeSignature
     * @param {MusicTimeSignatureInputComponent} timeSignature
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawTimeSignature = function (timeSignature, parameters, context) {
        throw new Error('not implemented');
    };

    // Export
    scope.MusicRenderer = MusicRenderer;
})(MyScript);