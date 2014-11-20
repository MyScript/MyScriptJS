(function (scope) {

    /**
     *
     * @class MathParser
     * @constructor
     */
    function MathParser () {
    }

    MathParser.prototype.formatSymbolTreeToMathComputedDatas = function (strokes, symbolTree, globalInkBoundingBox){
        var state = [];
        this.formatEquationNode(strokes, symbolTree.root, state, globalInkBoundingBox);
        return state;
    };

    MathParser.prototype.formatEquationNode = function (strokes, root, state, globalInkBoundingBox, computedFontBoundingBox, baseline){
        if (root.type === 'terminalNode') {
            this.formatEquationTerminalNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        } else if (root.type === 'nonTerminalNode') {
            this.formatEquationNonTerminalNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        } else if (root.type === 'rule') {
            this.formatEquationRuleNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        } else {
            throw new Error('unknown node type');
        }
    };

    MathParser.prototype.formatEquationTerminalNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline){
        var equationTerminalNode = node.candidates[node.selectedCandidate],
            strokesRecognize = [],
            inkBoundingBox = new scope.BoundingBox({yMin: undefined, xMin: undefined, yMax: undefined, xMax: undefined});

        for (var j in node.inkRanges) {
            var stroke = strokes[node.inkRanges[j].component];
            //Compute bounding box of recognized strokes
            this.computeBoundingBox(node.inkRanges[j], stroke, inkBoundingBox);
            //Add recognize stroke
            strokesRecognize.push(stroke);
        }

        state.push(new scope.MathComputedData({
            name: node.name,
            label: equationTerminalNode.label,
            inkRanges: node.inkRanges,
            strokes: strokesRecognize,
            inkBoundingBox: inkBoundingBox,
            globalInkBoundingBox: globalInkBoundingBox,
            computedFontBoundingBox: computedFontBoundingBox || new scope.BoundingBox({xMin: globalInkBoundingBox.xMin, xMax: Math.round(globalInkBoundingBox.xMin + globalInkBoundingBox.height* 0.69), yMin: globalInkBoundingBox.yMin, yMax: globalInkBoundingBox.yMax}),
            color: 'black'
        }));

    };

    MathParser.prototype.formatEquationNonTerminalNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline){
        this.formatEquationNode(strokes, node.candidates[node.selectedCandidate], state, globalInkBoundingBox, computedFontBoundingBox, baseline);
    };

    MathParser.prototype.formatEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline){
        var name = node.name;
        if (name === 'identity')
            this.formatIdentityRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'horizontal pair')
            this.formatHorizontalPairRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'fence')
            this.formatFenceRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'fraction')
            this.formatFractionRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'sqrt')
            this.formatSqrtRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'subscript')
            this.formatSubscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'superscript')
            this.formatSuperscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'subsuperscript')
            this.formatSubsuperscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'underscript')
            this.formatUnderscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'overscript')
            this.formatOverscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'underoverscript')
            this.formatUnderoverscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'presuperscript')
            this.formatPresuperscriptRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'vertical pair')
            this.formatVerticalPairRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else if (name === 'left fence')
            this.formatLeftFenceRuleEquationRuleNode(strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline);
        else
            throw new Error('unknown rule');
    };

    MathParser.prototype.formatIdentityRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline){
        this.formatEquationNode(strokes, node.children[0], state, globalInkBoundingBox, computedFontBoundingBox, baseline);
    };

    MathParser.prototype.formatHorizontalPairRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline){
        var lefWidthRatio = 1/2, rightWidthRatio = 1/2;

        if(node.children[0].candidates[0].name === 'horizontal pair' && node.children[1].candidates[0].name === 'identity'){
            lefWidthRatio = 2/3;
            rightWidthRatio = 1/3;
        }else if(node.children[0].candidates[0].name === 'identity' && node.children[1].candidates[0].name === 'horizontal pair'){
            lefWidthRatio = 1/3;
            rightWidthRatio = 2/3;
        }

        var computedFontLeftBoundingBox = new scope.BoundingBox({
                xMin: globalInkBoundingBox.getXMin(),
                xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth() * lefWidthRatio ,
                yMin: baseline === 'down' ? globalInkBoundingBox.getYMax() - ((globalInkBoundingBox.getWidth() * lefWidthRatio) / 0.69) : globalInkBoundingBox.getYMin(),
                yMax: baseline === 'down' ? globalInkBoundingBox.getYMax() : globalInkBoundingBox.getYMin() + ((globalInkBoundingBox.getWidth() * lefWidthRatio) / 0.69)
            }),
            computedFontRightBoundingBox = new scope.BoundingBox({
                xMin: computedFontLeftBoundingBox.getXMax(),
                xMax: computedFontLeftBoundingBox.getXMax() + globalInkBoundingBox.getWidth() * rightWidthRatio,
                yMin:  baseline === 'down' ? globalInkBoundingBox.getYMax() - ((globalInkBoundingBox.getWidth() * rightWidthRatio) / 0.69) :  globalInkBoundingBox.getYMin(),
                yMax:  baseline === 'down' ? globalInkBoundingBox.getYMax() : globalInkBoundingBox.getYMin() + ((globalInkBoundingBox.getWidth() * rightWidthRatio) / 0.69)
            });

        if(computedFontBoundingBox){
            computedFontLeftBoundingBox =  new scope.BoundingBox({
                xMin: computedFontBoundingBox.getXMin(),
                xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth() * lefWidthRatio,
                yMin: baseline === 'down' ? computedFontBoundingBox.getYMax() - ((computedFontBoundingBox.getWidth() * lefWidthRatio) / 0.69) : computedFontBoundingBox.getYMin(),
                yMax: baseline === 'down' ? computedFontBoundingBox.getYMax() : computedFontBoundingBox.getYMin() + ((computedFontBoundingBox.getWidth() * lefWidthRatio) / 0.69)
            });
            computedFontRightBoundingBox =  new scope.BoundingBox({
                xMin: computedFontLeftBoundingBox.getXMax(),
                xMax: computedFontLeftBoundingBox.getXMax() + computedFontBoundingBox.getWidth() * rightWidthRatio,
                yMin: baseline === 'down' ? computedFontBoundingBox.getYMax() - ((computedFontBoundingBox.getWidth() * rightWidthRatio) / 0.69) : computedFontBoundingBox.getYMin(),
                yMax: baseline === 'down' ? computedFontBoundingBox.getYMax() : computedFontBoundingBox.getYMin() + ((computedFontBoundingBox.getWidth() * rightWidthRatio) / 0.69)
            });
        }

        this.formatEquationNode(strokes, node.children[0], state, globalInkBoundingBox, computedFontLeftBoundingBox, baseline);
        this.formatEquationNode(strokes, node.children[1], state, globalInkBoundingBox, computedFontRightBoundingBox, baseline);

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

    MathParser.prototype.formatFractionRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline){

        var computedFontNumeratorBoundingBox, computedFontFractionBoundingBox, computedFontDenominatorBoundingBox;

        if(computedFontBoundingBox){
            computedFontNumeratorBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getHeight()*(4/9)*0.69 , yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(4/9)});
            computedFontFractionBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() , xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getHeight()*(4/9)*0.69 , yMin: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(4/9), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(5/9)});
            computedFontDenominatorBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getHeight()*(4/9)*0.69 , yMin: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(5/9), yMax: computedFontBoundingBox.getYMax()});
        }else{
            computedFontNumeratorBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getHeight()*(4/9)*0.69 , yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(4/9)});
            computedFontFractionBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getHeight()*(4/9)*0.69 , yMin: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(4/9), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(5/9)});
            computedFontDenominatorBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getHeight()*(4/9)*0.69 , yMin: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(5/9), yMax: globalInkBoundingBox.getYMax()});
        }

        this.formatEquationNode(strokes, node.children[1], state, globalInkBoundingBox, computedFontNumeratorBoundingBox, 'down');

        this.formatEquationNode(strokes, node.children[0], state, globalInkBoundingBox, computedFontFractionBoundingBox, 'down');

        this.formatEquationNode(strokes, node.children[2], state, globalInkBoundingBox, computedFontDenominatorBoundingBox, 'up');
    };

    MathParser.prototype.formatSqrtRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox, baseline){
        var computedFontSqrtBoundingBox, computedFontMemberBoundingBox;

        if(computedFontBoundingBox){
            computedFontSqrtBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontMemberBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
        } else {
            computedFontSqrtBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontMemberBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
        }

        this.formatEquationNode(strokes, node.children[0], state, globalInkBoundingBox, computedFontSqrtBoundingBox, baseline);
        this.formatEquationNode(strokes, node.children[1], state, globalInkBoundingBox, computedFontMemberBoundingBox, baseline);
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
            if(boundingBox.getXMin() === undefined || boundingBox.getXMin() > stroke.getX()[z]){
                boundingBox.setXMin(stroke.getX()[z]);
            }
            if(boundingBox.getYMin() === undefined || boundingBox.getYMin() > stroke.getY()[z]){
                boundingBox.setYMin(stroke.getY()[z]);
            }
            if(boundingBox.getXMax() === undefined || boundingBox.getXMax() < stroke.getX()[z]){
                boundingBox.setXMax(stroke.getX()[z]);
            }
            if(boundingBox.getYMax() === undefined || boundingBox.getYMax() < stroke.getY()[z]){
                boundingBox.setYMax(stroke.getY()[z]);
            }
        }
        return boundingBox;
    };

// Export
    scope.MathParser = MathParser;
})(MyScript);