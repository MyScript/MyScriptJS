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
     * @param {Stroke[]} strokes
     * @param {MathDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    MathRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        var notScratchOutStrokes = this.removeScratchOutStrokes(strokes, recognitionResult.getScratchOutResults());

        for (var i in notScratchOutStrokes ) {
            var stroke = notScratchOutStrokes[i], boundingBox = {yMin: undefined, xMin: undefined, yMax: undefined, xMax: undefined};
            this.drawStroke(stroke, parameters, context);
            if(parameters.getShowBoundingBoxes()) {
                this.computeBoundingBox(this.computeInkRange(stroke), stroke, boundingBox);
                this.drawBoundingBox(boundingBox, context);
            }
        }
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
        var terminalNodeArray = [];

        //// Parse recognition symbol tree to solved String with mathjs solver
        //for(var i in recognitionResult.results){
        //    if(recognitionResult.results[i].type === 'SYMBOLTREE'){
        //        var symbolTree = recognitionResult.results[i],
        //            root = symbolTree.root;
        //        expression = new scope.MathParser().format(root);
        //    }
        //}

        // Compute data for drawing RecognitionResult
        terminalNodeArray = this.createRecognizedObjectsForFontification(strokes, recognitionResult);

        // Draw Font by computed data on HTML5 canvas context
        this.drawRecognizedObjectsOnContext(terminalNodeArray, parameters, context);
    };

    /**
     *
     * @param recognitionResult
     * @returns {*}
     */
    MathRenderer.prototype.solveEquationByRecognitionResult = function (recognitionResult) {
        var equationResult;
        for (var i in recognitionResult.results) {
            if (recognitionResult.results[i].type === 'LATEX') {
                equationResult = new scope.MathSolver().solve(recognitionResult.results[i].value);
            }
        }
        return equationResult;
    };

    /**
     *
     * @param strokes
     * @param recognitionResult
     * @param terminalNodeArray
     */
    MathRenderer.prototype.createRecognizedObjectsForFontification  = function (strokes, recognitionResult) {
        var terminalNodeArray = [];
        for(var i in recognitionResult.results){
            if(recognitionResult.results[i].type === 'SYMBOLTREE'){
                var symbolTree = recognitionResult.results[i],
                    root = symbolTree.root;
                this.computeTerminalNodeObject(root, terminalNodeArray, strokes);
            }
        }
        return terminalNodeArray;
    }

    /**
     * Compute terminal node Object recursivly
     *
     * @param root
     * @param terminalNodeObject
     */
    MathRenderer.prototype.computeTerminalNodeObject  = function (root, terminalNodeObject, strokes) {
        var candidates = root.candidates,
            selectedCandidate = root.selectedCandidate;

        if(root.type === 'nonTerminalNode'){
            this.computeTerminalNodeObject(candidates[selectedCandidate], terminalNodeObject, strokes);
        } else if(root.type === 'rule'){
            for(var i in root.children) {
                this.computeTerminalNodeObject(root.children[i], terminalNodeObject, strokes);
            }
        } else if(root.type === 'terminalNode'){
            //Mapping recognition data objects with strokes by inkRanges
            var strokesRecognize = [],
                boundingBox = {yMin: undefined, xMin: undefined, yMax: undefined, xMax: undefined};

            for(var j in root.inkRanges){
                var stroke = strokes[root.inkRanges[j].component];
                //Compute bounding box of recognized strokes
                this.computeBoundingBox(root.inkRanges[j], stroke, boundingBox);
                //Add recognize stroke
                strokesRecognize.push(stroke);
            }
            terminalNodeObject.push({name : root.name,label : candidates[selectedCandidate].label, inkRanges : root.inkRanges, strokes : strokesRecognize, boundingBox: boundingBox});
        }
    };

    /**
     *
     * @param terminalNodeArray
     * @param parameters
     * @param context
     */
    MathRenderer.prototype.drawRecognizedObjectsOnContext  = function (terminalNodeArray, parameters, context) {
        var textMetrics, boundingBoxes = [];

        for (var j in terminalNodeArray) {
            var width = terminalNodeArray[j].boundingBox.xMax - terminalNodeArray[j].boundingBox.xMin,
                height = terminalNodeArray[j].boundingBox.yMax - terminalNodeArray[j].boundingBox.yMin;

            boundingBoxes.push(terminalNodeArray[j].boundingBox);

            context.font = parameters.getDecoration() + height + 'pt ' + parameters.font;

            textMetrics = context.measureText(terminalNodeArray[j].label);

            context.fillText(terminalNodeArray[j].label, terminalNodeArray[j].boundingBox.xMin, terminalNodeArray[j].boundingBox.yMax, width);
            // Show Bounding Box to debug the fontsize computing
            this.drawBoundingBox(terminalNodeArray[j].boundingBox, context);
        }
        this.drawBoundingBox(this.computeGlobalBoundingBox(boundingBoxes), context);
    };

    // Export
    scope.MathRenderer = MathRenderer;
})(MyScript);