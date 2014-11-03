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
     * @param {Stroke[]} strokes
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
     * @param {Stroke[]} strokes
     * @param {MusicScratchOut[]} scratchOutResults
     * @returns {Stroke[]} notScratchOutStrokes
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
     * Draw accidental
     *
     * @private
     * @method drawAccidental
     * @param {MusicAccidentalInputComponent} accidental
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawAccidental = function (accidental, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw arpeggiate
     *
     * @private
     * @method drawArpeggiate
     * @param {MusicArpeggiateInputComponent} arpeggiate
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawArpeggiate = function (arpeggiate, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw bar
     *
     * @private
     * @method drawBar
     * @param {MusicBarInputComponent} bar
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawBar = function (bar, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw beam
     *
     * @private
     * @method drawBeam
     * @param {MusicBeamInputComponent} beam
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawBeam = function (beam, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw clef
     *
     * @private
     * @method drawClef
     * @param {MusicClefInputComponent} clef
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawClef = function (clef, parameters, context) {

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
     * @private
     * @method drawDecoration
     * @param {MusicDecorationInputComponent} decoration
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawDecoration = function (decoration, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw dots
     *
     * @private
     * @method drawDots
     * @param {MusicDotsInputComponent} dots
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawDots = function (dots, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw head
     *
     * @private
     * @method drawHead
     * @param {MusicHeadInputComponent} head
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawHead = function (head, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw ledgerLine
     *
     * @private
     * @method drawLedgerLine
     * @param {MusicLedgerLineInputComponent} ledgerLine
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawLedgerLine = function (ledgerLine, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw rest
     *
     * @private
     * @method drawRest
     * @param {MusicRestInputComponent} rest
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawRest = function (rest, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw stem
     *
     * @private
     * @method drawStem
     * @param {MusicStemInputComponent} stem
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawStem = function (stem, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw tieOrSlur
     *
     * @private
     * @method drawTieOrSlur
     * @param {MusicTieOrSlurInputComponent} tieOrSlur
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawTieOrSlur = function (tieOrSlur, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw timeSignature
     *
     * @private
     * @method drawTimeSignature
     * @param {MusicTimeSignatureInputComponent} timeSignature
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    var drawTimeSignature = function (timeSignature, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MusicRenderer.prototype.drawComponents = function (components, parameters, context) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, parameters, context); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.MusicAccidentalInputComponent) {
                drawAccidental(component, parameters, context);
            } else if (component instanceof scope.MusicArpeggiateInputComponent) {
                drawArpeggiate(component, parameters, context);
            } else if (component instanceof scope.MusicBarInputComponent) {
                drawBar(component, parameters, context);
            } else if (component instanceof scope.MusicBeamInputComponent) {
                drawBeam(component, parameters, context);
            } else if (component instanceof scope.MusicClefInputComponent) {
                drawClef(component, parameters, context);
            } else if (component instanceof scope.MusicDecorationInputComponent) {
                drawDecoration(component, parameters, context);
            } else if (component instanceof scope.MusicDotsInputComponent) {
                drawDots(component, parameters, context);
            } else if (component instanceof scope.MusicHeadInputComponent) {
                drawHead(component, parameters, context);
            } else if (component instanceof scope.MusicLedgerLineInputComponent) {
                drawLedgerLine(component, parameters, context);
            } else if (component instanceof scope.MusicRestInputComponent) {
                drawRest(component, parameters, context);
            } else if (component instanceof scope.MusicStemInputComponent) {
                drawStem(component, parameters, context);
            } else if (component instanceof scope.MusicTieOrSlurInputComponent) {
                drawTieOrSlur(component, parameters, context);
            } else if (component instanceof scope.MusicTimeSignatureInputComponent) {
                drawTimeSignature(component, parameters, context);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    // Export
    scope.MusicRenderer = MusicRenderer;
})(MyScript);