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
            var stroke = this.cloneStrokes[i], boundingBox = {yMin: undefined, xMin: undefined, yMax: undefined, xMax: undefined};
            this.drawStroke(stroke, parameters, context);
            if(parameters.getShowBoundingBoxes()) {
                this.computeBoundingBox(this.computeInkRange(stroke), stroke, boundingBox);
                this.drawBoundingBox(boundingBox, context);
            }
        }
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
        var terminalNodeArray = [], equationResult, expression = '';

        //// Parse recognition symbol tree to solved String with mathjs solver
        //for(var i in recognitionResult.results){
        //    if(recognitionResult.results[i].type === 'SYMBOLTREE'){
        //        var symbolTree = recognitionResult.results[i],
        //            root = symbolTree.root;
        //        expression = new scope.MathParser().format(root);
        //    }
        //}

        // Solving recognitionResult equation
        equationResult = this.solveEquationByRecognitionResult(recognitionResult);

        // Compute data for drawing RecognitionResult
        terminalNodeArray = this.createRecognizedObjectsForFontification(strokes, recognitionResult);

        // Draw Font by computed data on HTML5 canvas context
        this.drawRecognizedObjectsOnContext(terminalNodeArray, parameters, context);

        var width = terminalNodeArray[terminalNodeArray.length - 1].boundingBox.xMax - terminalNodeArray[terminalNodeArray.length - 1].boundingBox.xMin,
            height = terminalNodeArray[terminalNodeArray.length - 1].boundingBox.yMax - terminalNodeArray[terminalNodeArray.length - 1].boundingBox.yMin;
        if(equationResult) {
            if(equationResult.indexOf('x') > -1) {
                context.fillText(equationResult, terminalNodeArray[0].boundingBox.xMin, terminalNodeArray[terminalNodeArray.length - 1].boundingBox.yMax + height * 2, width * 3);
            }else{
                context.fillText(equationResult, terminalNodeArray[terminalNodeArray.length - 1].boundingBox.xMin + width, terminalNodeArray[terminalNodeArray.length - 1].boundingBox.yMax, width);
            }
        }else{
            context.fillText('?', terminalNodeArray[terminalNodeArray.length - 1].boundingBox.xMin + width, terminalNodeArray[terminalNodeArray.length - 1].boundingBox.yMax, width);
        }
    }

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

                var expression = new scope.MathParser().format(root);
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