(function (scope) {

    /**
     *
     * @class MathParser
     * @constructor
     */
    function MathParser () {
    }

    MathParser.prototype.formatSymbolTreeToArray = function (strokes, symbolTree, globalInkBoundingBox){
        var state = [];
        this.formatEquationNode(strokes, symbolTree.root, state, globalInkBoundingBox);
        return state;
    };

    MathParser.prototype.formatEquationNode = function (strokes, root, state, globalInkBoundingBox, computedFontBoundingBox){
        if (root.type === 'terminalNode') {
            this.formatEquationTerminalNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox);
        } else if (root.type === 'nonTerminalNode') {
            this.formatEquationNonTerminalNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox);
        } else if (root.type === 'rule') {
            this.formatEquationRuleNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox);
        } else {
            throw new Error('unknown node type');
        }
    };

    MathParser.prototype.formatEquationTerminalNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var equationTerminalNode = node.candidates[node.selectedCandidate],
            strokesRecognize = [],
            inkBoundingBox = {yMin: undefined, xMin: undefined, yMax: undefined, xMax: undefined};

        for (var j in node.inkRanges) {
            var stroke = strokes[node.inkRanges[j].component];
            //Compute bounding box of recognized strokes
            this.computeBoundingBox(node.inkRanges[j], stroke, inkBoundingBox);
            //Add recognize stroke
            strokesRecognize.push(stroke);
        }

        state.push({
            name: node.name,
            label: equationTerminalNode.label,
            inkRanges: node.inkRanges,
            strokes: strokesRecognize,
            inkBoundingBox: inkBoundingBox,
            globalInkBoundingBox: globalInkBoundingBox,
            computedFontBoundingBox: computedFontBoundingBox || {xMin: globalInkBoundingBox.xMin, xMax: Math.round(globalInkBoundingBox.xMin + (globalInkBoundingBox.yMax - globalInkBoundingBox.yMin)*0.52) , yMin: globalInkBoundingBox.yMin, yMax: globalInkBoundingBox.yMax},
            color: 'black'
        });

    };

    MathParser.prototype.formatEquationNonTerminalNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        this.formatEquationNode(strokes, node.candidates[node.selectedCandidate], state, globalInkBoundingBox, computedFontBoundingBox);
   };

    MathParser.prototype.formatEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var name = node.name;
        if (name === 'identity')
            this.formatIdentityRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'horizontal pair')
            this.formatHorizontalPairRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'fence')
            this.formatFenceRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'fraction')
            this.formatFractionRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'sqrt')
            this.formatSqrtRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'subscript')
            this.formatSubscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'superscript')
            this.formatSuperscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'subsuperscript')
            this.formatSubsuperscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'underscript')
            this.formatUnderscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'overscript')
            this.formatOverscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'underoverscript')
            this.formatUnderoverscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'presuperscript')
            this.formatPresuperscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'vertical pair')
            this.formatVerticalPairRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else if (name === 'left fence')
            this.formatLeftFenceRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox);
        else
            throw new Error('unknown rule');
    };

    MathParser.prototype.formatIdentityRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        this.formatEquationNode(strokes, node.children[0], state, globalInkBoundingBox, computedFontBoundingBox);
    };

    MathParser.prototype.formatHorizontalPairRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var lefWidthRatio = 1/2, rightWidthRatio = 1/2;

        if(node.children[0].candidates[0].name === 'horizontal pair' && node.children[1].candidates[0].name === 'identity'){
            lefWidthRatio = 2/3;
            rightWidthRatio = 1/3;
        }else if(node.children[0].candidates[0].name === 'identity' && node.children[1].candidates[0].name === 'horizontal pair'){
            lefWidthRatio = 1/3;
            rightWidthRatio = 2/3;
        }

        var globalInkBoundingBoxWidth = globalInkBoundingBox.xMax - globalInkBoundingBox.xMin,
            computedFontLeftBoundingBox = {
                xMin: globalInkBoundingBox.xMin,
                xMax: globalInkBoundingBox.xMin + globalInkBoundingBoxWidth * lefWidthRatio ,
                yMin: globalInkBoundingBox.yMin,
                yMax: globalInkBoundingBox.yMax
            },
            computedFontRightBoundingBox = {
                xMin: computedFontLeftBoundingBox.xMax,
                xMax: computedFontLeftBoundingBox.xMax  + globalInkBoundingBoxWidth * rightWidthRatio,
                yMin: globalInkBoundingBox.yMin,
                yMax: globalInkBoundingBox.yMax
            };

        if(computedFontBoundingBox){
            globalInkBoundingBoxWidth = computedFontBoundingBox.xMax - computedFontBoundingBox.xMin;
            computedFontLeftBoundingBox = {
                xMin: computedFontBoundingBox.xMin,
                xMax: computedFontBoundingBox.xMin  + globalInkBoundingBoxWidth * lefWidthRatio,
                yMin: computedFontBoundingBox.yMin,
                yMax: computedFontBoundingBox.yMax
            };
            computedFontRightBoundingBox = {
                xMin: computedFontLeftBoundingBox.xMax,
                xMax: computedFontLeftBoundingBox.xMax + globalInkBoundingBoxWidth * rightWidthRatio,
                yMin: computedFontBoundingBox.yMin,
                yMax: computedFontBoundingBox.yMax
            };
        }

        this.formatEquationNode(strokes, node.children[0], state, globalInkBoundingBox, computedFontLeftBoundingBox);
        this.formatEquationNode(strokes, node.children[1], state, globalInkBoundingBox, computedFontRightBoundingBox);

    };

    MathParser.prototype.formatFenceRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // left symbol is the second child
        //var str = node.children[1].candidates[node.children[1].selectedCandidate].label;
        //
        //if (str !== '('){
        //    state.push('(').push(str);
        //} else {
        //    state.push(str);
        //}
        //
        //var ruleNode = this.getChildRuleEquationNode(node.children[0], 'vertical pair');
        //if (ruleNode !== null) {
        //    this.formatEquationNode(node.children[0], state);
        //} else {
        //    this.formatEquationNode(node.children[0], state);
        //}
        //
        //// right symbol is the third child
        //str = node.children[2].candidates[node.children[2].selectedCandidate].label;
        //
        //if (str !== ')'){
        //    state.push(str).push(')');
        //}else {
        //    state.push(str);
        //}
    };

    MathParser.prototype.formatFractionRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){

        var globalInkBoundingBoxHeight = globalInkBoundingBox.yMax - globalInkBoundingBox.yMin,
            computedFontNumeratorBoundingBox = {xMin: globalInkBoundingBox.xMin, xMax: globalInkBoundingBox.xMin + globalInkBoundingBoxHeight*(4/9)*0.52 , yMin: globalInkBoundingBox.yMin, yMax: globalInkBoundingBox.yMin + globalInkBoundingBoxHeight*(4/9)},
            computedFontFractionBoundingBox = {xMin: globalInkBoundingBox.xMin, xMax: globalInkBoundingBox.xMin + globalInkBoundingBoxHeight*(5/9)*0.52 , yMin: globalInkBoundingBox.yMin + globalInkBoundingBoxHeight*(4/9), yMax: globalInkBoundingBox.yMin + globalInkBoundingBoxHeight*(5/9)},
            computedFontDenominatorBoundingBox = {xMin: globalInkBoundingBox.xMin, xMax: globalInkBoundingBox.xMin + globalInkBoundingBoxHeight*(4/9)*0.52 , yMin: globalInkBoundingBox.yMin + globalInkBoundingBoxHeight*(5/9), yMax: globalInkBoundingBox.yMax};

        this.formatEquationNode(strokes, node.children[0], state, globalInkBoundingBox, computedFontFractionBoundingBox);

        this.formatEquationNode(strokes, node.children[1], state, globalInkBoundingBox, computedFontNumeratorBoundingBox);

        this.formatEquationNode(strokes, node.children[2], state, globalInkBoundingBox, computedFontDenominatorBoundingBox);
    };

    MathParser.prototype.formatSqrtRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        //state.push(node.children[0].candidates[node.children[0].selectedCandidate].label);
        //this.formatEquationNode(node.children[1], state);
    };

    MathParser.prototype.formatSubscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // base symbol
        //this.formatEquationNode(node.children[0], state);

        // subscript symbol
        //this.formatEquationNode(node.children[1], state);
    };

    MathParser.prototype.formatSuperscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // base symbol
        //this.formatEquationNode(node.children[0], state);
        // Add Superscript symbol
        //state.push('^');
        // superscript symbol
        //this.formatEquationNode(node.children[1], state);
   };

    MathParser.prototype.formatSubsuperscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // base symbol
        //this.formatEquationNode(node.children[0], state);
        // subscript symbol
        //this.formatEquationNode(node.children[1], state);
        // superscript symbol
        //this.formatEquationNode(node.children[2], state);
    };

    MathParser.prototype.formatUnderscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // base symbol
        //this.formatEquationNode(node.children[0], state);
        // bottom symbol
        //this.formatEquationNode(node.children[1], state);

    };

    MathParser.prototype.formatOverscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox) {
        // base symbol
        //this.formatEquationNode(node.children[0], state);
        // top symbol
        //this.formatEquationNode(node.children[1], state);
    };

    MathParser.prototype.formatUnderoverscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // base symbol
        //this.formatEquationNode(node.children[0], state);
        // bottom symbol
        //this.formatEquationNode(node.children[1], state);
        // top symbol
        //this.formatEquationNode(node.children[2], state);
    };

    MathParser.prototype.formatPresuperscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // base symbol
        //var ruleNode = this.getChildRuleEquationNode(node.children[0], 'sqrt');
        //
        //if (ruleNode !== null){
        //    this.formatEquationNode(ruleNode.children[1], state);
        //    this.formatEquationNode(node.children[1], state);
        //} else {
        //    this.formatEquationNode(ruleNode.children[0], state);
        //    this.formatEquationNode(ruleNode.children[1], state);
        //}
    };

    MathParser.prototype.formatVerticalPairRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // top symbol
        //var ruleNode = this.getChildRuleEquationNode(node.children[0], 'vertical pair');
        //if (ruleNode !== null){
        //    this.formatEquationNode(node.children[0], state);
        //} else {
        //    this.formatEquationNode(node.children[0], state);
        //}
        // bottom symbol
        //ruleNode = this.getChildRuleEquationNode(node.children[1], 'vertical pair');
        //
        //if (ruleNode !== null){
        //    this.formatEquationNode(node.children[1], state);
        //} else {
        //    this.formatEquationNode(node.children[1], state);
        //}
    };

    MathParser.prototype.formatLeftFenceRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        // left symbol is the second child
        //var str = node.children[1].candidates[node.children[1].selectedCandidate].label;
        //
        //if (str !== '('){
        //    state.push('(').push(str);
        //} else {
        //    state.push(str);
        //}
        //
        //// main expression is the first child
        //var ruleNode = this.getChildRuleEquationNode(node.children[0], 'vertical pair');
        //if (ruleNode !== null) {
        //    this.formatEquationNode(node.children[0], state);
        //} else {
        //    this.formatEquationNode(node.children[0], state);
        //}
        //
        //state.push(')');
    };

    MathParser.prototype.getChildRuleEquationNode = function (strokes, node, name, globalInkBoundingBox, computedFontBoundingBox){
        //if (node.type === 'terminalNode') {
        //    return null;
        //} else if (node.type === 'nonTerminalNode') {
        //    return this.getChildRuleEquationNode(node.candidates[node.selectedCandidate], name);
        //} else if (node.type === 'rule') {
        //    if (node.name === 'identity') {
        //        return this.getChildRuleEquationNode(node.children[0], name);
        //    }
        //} else {
        //    return null;
        //}
    };

    /**
     * Compute bounding box for stroke by inkRange
     *
     * @param root
     * @param stroke
     */
    MathParser.prototype.computeBoundingBox  = function (inkRange, stroke, boundingBox) {
        var firstItem = inkRange.firstItem,
            lastItem = inkRange.lastItem;

        for(var z = firstItem; z <= lastItem; z++){

            // Initialize bounding box coordinates
            if(boundingBox.xMin === undefined || boundingBox.xMin > stroke.x[z]){
                boundingBox.xMin = stroke.x[z];
            }
            if(boundingBox.yMin === undefined || boundingBox.yMin > stroke.y[z]){
                boundingBox.yMin = stroke.y[z];
            }
            if(boundingBox.xMax === undefined || boundingBox.xMax < stroke.x[z]){
                boundingBox.xMax = stroke.x[z];
            }
            if(boundingBox.yMax === undefined || boundingBox.yMax < stroke.y[z]){
                boundingBox.yMax = stroke.y[z];
            }
        }
        return boundingBox;
    };

// Export
scope.MathParser = MathParser;
})(MyScript);