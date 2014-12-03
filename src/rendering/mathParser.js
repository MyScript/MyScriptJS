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
        this.formatEquationNode(strokes, symbolTree.getRoot(), state, globalInkBoundingBox);
        return state;
    };

    MathParser.prototype.formatEquationNode = function (strokes, root, state, globalInkBoundingBox, computedFontBoundingBox){
        if (root.getType() === 'terminalNode') {
            this.formatEquationTerminalNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox);
        } else if (root.getType() === 'nonTerminalNode') {
            this.formatEquationNonTerminalNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox);
        } else if (root.getType() === 'rule') {
            this.formatEquationRuleNode(strokes, root, state, globalInkBoundingBox, computedFontBoundingBox);
        } else {
            throw new Error('unknown node type');
        }
    };

    MathParser.prototype.formatEquationTerminalNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var equationTerminalNode = node.getSelectedCandidate(),
            strokesRecognize = [],
            inkBoundingBox = new scope.BoundingBox({yMin: undefined, xMin: undefined, yMax: undefined, xMax: undefined});

        for (var j in node.getInkRanges()) {
            var stroke = strokes[node.getInkRanges()[j].getComponent()];
            //Compute bounding box of recognized strokes
            this.computeBoundingBox(node.getInkRanges()[j], stroke, inkBoundingBox);
            //Add recognize stroke
            strokesRecognize.push(stroke);
        }

        state.push(new scope.MathComputedData({
            name: node.getName(),
            label: equationTerminalNode.getLabel(),
            inkRanges: node.getInkRanges(),
            strokes: strokesRecognize,
            inkBoundingBox: inkBoundingBox,
            globalInkBoundingBox: globalInkBoundingBox,
            computedFontBoundingBox: computedFontBoundingBox || new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()}),
            color: 'black'
        }));

    };

    MathParser.prototype.formatEquationNonTerminalNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        this.formatEquationNode(strokes, node.getSelectedCandidate(), state, globalInkBoundingBox, computedFontBoundingBox);
    };

    MathParser.prototype.formatEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var name = node.getName();
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
        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFontBoundingBox);
    };

    MathParser.prototype.formatHorizontalPairRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var cutLineRatio = 1/2, computedFontLeftBoundingBox, computedFontRightBoundingBox, childrenHorizontalPairRuleCount;


        childrenHorizontalPairRuleCount = this.getChildrenRuleCount(node, 'horizontal pair');

        if(node.getChildren()[0].getCandidates()[0].getName() === 'horizontal pair' && node.getChildren()[1].getCandidates()[0].getName() !== 'horizontal pair'){
            cutLineRatio = 1 - 1/(childrenHorizontalPairRuleCount + 1);
        }else if(node.getChildren()[0].getCandidates()[0].getName() !== 'horizontal pair' && node.getChildren()[1].getCandidates()[0].getName() === 'horizontal pair'){
            cutLineRatio = 1/(childrenHorizontalPairRuleCount + 1);
        } else if(node.getChildren()[0].getCandidates()[0].getName() === 'horizontal pair' && node.getChildren()[1].getCandidates()[0].getName() === 'horizontal pair'){
            cutLineRatio = (this.getChildrenRuleCount(node.getChildren()[0], 'horizontal pair') + 1 )/(childrenHorizontalPairRuleCount + 1);
        }

        if(computedFontBoundingBox){
            computedFontLeftBoundingBox =  new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(),xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth() * cutLineRatio,yMin: computedFontBoundingBox.getYMin(),yMax: computedFontBoundingBox.getYMax()});
            computedFontRightBoundingBox =  new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth() * cutLineRatio,xMax: computedFontBoundingBox.getXMax(),yMin: computedFontBoundingBox.getYMin(),yMax: computedFontBoundingBox.getYMax()});
        } else {
            computedFontLeftBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(),xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth() * cutLineRatio,yMin: globalInkBoundingBox.getYMin(),yMax: globalInkBoundingBox.getYMax()});
            computedFontRightBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth() * cutLineRatio,xMax: globalInkBoundingBox.getXMax(),yMin: globalInkBoundingBox.getYMin(),yMax: globalInkBoundingBox.getYMax()});
        }

        // left pair
        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFontLeftBoundingBox);
        // right pair
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontRightBoundingBox);
    };

    MathParser.prototype.formatFenceRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFontBaseSymbolBoundingBox, computedFontleftFenceBoundingBox, computedFontRightFenceBoundingBox;

        if(computedFontBoundingBox){
            computedFontleftFenceBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(1/4), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(1/4), xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(3/4), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontRightFenceBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(3/4), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
        }else{
            computedFontleftFenceBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/4), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/4), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(3/4), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontRightFenceBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(3/4), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
        }

        //left symbol is the second child
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontleftFenceBoundingBox);
        //Base Symbol
        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFontBaseSymbolBoundingBox);
        // right symbol is the third child
        this.formatEquationNode(strokes, node.getChildren()[2], state, globalInkBoundingBox, computedFontRightFenceBoundingBox);
    };

    MathParser.prototype.formatFractionRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){

        var computedFontNumeratorBoundingBox, computedFontFractionBoundingBox, computedFontDenominatorBoundingBox;

        if(computedFontBoundingBox){
            computedFontNumeratorBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(4/9)});
            computedFontFractionBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() , xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(4/9), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(5/9)});
            computedFontDenominatorBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(5/9), yMax: computedFontBoundingBox.getYMax()});
        }else{
            computedFontNumeratorBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(4/9)});
            computedFontFractionBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(4/9), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(5/9)});
            computedFontDenominatorBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(5/9), yMax: globalInkBoundingBox.getYMax()});
        }

        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontNumeratorBoundingBox, 'down');

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFontFractionBoundingBox, 'down');

        this.formatEquationNode(strokes, node.getChildren()[2], state, globalInkBoundingBox, computedFontDenominatorBoundingBox, 'up');
    };

    MathParser.prototype.formatSqrtRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFontSqrtBoundingBox, computedFontMemberBoundingBox;

        if(computedFontBoundingBox){
            computedFontSqrtBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontMemberBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
        } else {
            computedFontSqrtBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontMemberBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/2), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
        }

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFontSqrtBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontMemberBoundingBox);
    };

    MathParser.prototype.formatSubscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFonBaseSymbolBoundingBox, computedFontSubscriptSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontSubscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMax() - computedFontBoundingBox.getHeight()*(1/9), yMax: computedFontBoundingBox.getYMax()});
        } else {
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontSubscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMax() - globalInkBoundingBox.getHeight()*(1/9), yMax: globalInkBoundingBox.getYMax()});
        }

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonBaseSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontSubscriptSymbolBoundingBox);
    };

    MathParser.prototype.formatSuperscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFonBaseSymbolBoundingBox, computedFontSuperscriptSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(2/3), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontSuperscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(2/3), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(1/9)});
        } else {
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontSuperscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(1/9)});
        }

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonBaseSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontSuperscriptSymbolBoundingBox);
    };

    MathParser.prototype.formatSubsuperscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFonBaseSymbolBoundingBox, computedFontSuperscriptSymbolBoundingBox, computedFontSubscriptSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontSubscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMax() - computedFontBoundingBox.getHeight()*(1/9), yMax: computedFontBoundingBox.getYMax()});
            computedFontSuperscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(1/9)});
        } else {
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontSubscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMax() - globalInkBoundingBox.getHeight()*(1/9), yMax: globalInkBoundingBox.getYMax()});
            computedFontSuperscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(2/3), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(1/9)});
        }

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonBaseSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontSubscriptSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[2], state, globalInkBoundingBox, computedFontSuperscriptSymbolBoundingBox);
    };

    MathParser.prototype.formatUnderscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFonBaseSymbolBoundingBox, computedFontUnderscriptSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontUnderscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMax(), yMax: computedFontBoundingBox.getYMax() + computedFontBoundingBox.getHeight()*(1/2)});
        } else {
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontUnderscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMax(), yMax: globalInkBoundingBox.getYMax() + globalInkBoundingBox.getHeight()*(1/2)});
        }

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonBaseSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontUnderscriptSymbolBoundingBox);

    };

    MathParser.prototype.formatOverscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox) {
        var computedFonBaseSymbolBoundingBox, computedFontOverscriptSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontOverscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin() - computedFontBoundingBox.getHeight()*(1/2), yMax: computedFontBoundingBox.getYMin()});
        } else {
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontOverscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin() - globalInkBoundingBox.getHeight()*(1/2), yMax: globalInkBoundingBox.getYMin()});
        }

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonBaseSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontOverscriptSymbolBoundingBox);
    };

    MathParser.prototype.formatUnderoverscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFonBaseSymbolBoundingBox, computedFontUnderscriptSymbolBoundingBox, computedFontOverscriptSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFontUnderscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMax(), yMax: computedFontBoundingBox.getYMax() + computedFontBoundingBox.getHeight()*(1/2)});
            computedFontOverscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin() - computedFontBoundingBox.getHeight()*(1/2), yMax: computedFontBoundingBox.getYMin()});
        } else {
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFontUnderscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMax(), yMax: globalInkBoundingBox.getYMax() + globalInkBoundingBox.getHeight()*(1/2)});
            computedFontOverscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin() - globalInkBoundingBox.getHeight()*(1/2), yMax: globalInkBoundingBox.getYMin()});
        }

        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonBaseSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontUnderscriptSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[2], state, globalInkBoundingBox, computedFontOverscriptSymbolBoundingBox);

    };

    MathParser.prototype.formatPresuperscriptRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFonBaseSymbolBoundingBox, computedFontPresuperscriptSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFontPresuperscriptSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/3), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(1/3)});
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
        } else {
            computedFontPresuperscriptSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/3), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(1/3)});
            computedFonBaseSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
        }

        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontPresuperscriptSymbolBoundingBox);
        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonBaseSymbolBoundingBox);
    };

    MathParser.prototype.formatVerticalPairRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFontTopSymbolBoundingBox, computedFonBottomSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFontTopSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(1/2)});
            computedFonBottomSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin() + computedFontBoundingBox.getHeight()*(1/2), yMax: computedFontBoundingBox.getYMax()});
        } else {
            computedFontTopSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(1/2)});
            computedFonBottomSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin() + globalInkBoundingBox.getHeight()*(1/2), yMax: globalInkBoundingBox.getYMax()});
        }

        // top symbol
        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFontTopSymbolBoundingBox);
        // bottom symbol
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFonBottomSymbolBoundingBox);
    };

    MathParser.prototype.formatLeftFenceRuleEquationRuleNode = function (strokes, node, state, globalInkBoundingBox, computedFontBoundingBox){
        var computedFontLeftSymbolBoundingBox, computedFonRightSymbolBoundingBox;

        if(computedFontBoundingBox){
            computedFontLeftSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin(), xMax: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(1/4), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
            computedFonRightSymbolBoundingBox = new scope.BoundingBox({xMin: computedFontBoundingBox.getXMin() + computedFontBoundingBox.getWidth()*(1/4), xMax: computedFontBoundingBox.getXMax(), yMin: computedFontBoundingBox.getYMin(), yMax: computedFontBoundingBox.getYMax()});
        } else {
            computedFontLeftSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin(), xMax: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/4), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
            computedFonRightSymbolBoundingBox = new scope.BoundingBox({xMin: globalInkBoundingBox.getXMin() + globalInkBoundingBox.getWidth()*(1/4), xMax: globalInkBoundingBox.getXMax(), yMin: globalInkBoundingBox.getYMin(), yMax: globalInkBoundingBox.getYMax()});
        }

        // left symbol is the second child
        this.formatEquationNode(strokes, node.getChildren()[1], state, globalInkBoundingBox, computedFontLeftSymbolBoundingBox);
        // main expression is the first child
        this.formatEquationNode(strokes, node.getChildren()[0], state, globalInkBoundingBox, computedFonRightSymbolBoundingBox);
    };

    MathParser.prototype.getChildrenRuleCount = function (root, ruleName){
      var count = 0, name = root.getName();

        if (root.getType() === 'nonTerminalNode') {
            count += this.getChildrenRuleCount(root.getSelectedCandidate(), ruleName);
        } else if (root.getType() === 'rule') {

            if(name === ruleName){count++;}

            if (name === 'identity') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
            }else if (name === 'horizontal pair') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else if (name === 'fence') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[2], ruleName);
            }else if (name === 'fraction') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[2], ruleName);
            }else if (name === 'sqrt') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else if (name === 'subscript') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else if (name === 'superscript') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else if (name === 'subsuperscript') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[2], ruleName);
            }else if (name === 'underscript') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[2], ruleName);
            }else if (name === 'overscript') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else if (name === 'underoverscript') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[2], ruleName);
            }else if (name === 'presuperscript') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else if (name === 'vertical pair') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else if (name === 'left fence') {
                count += this.getChildrenRuleCount(root.getChildren()[0], ruleName);
                count += this.getChildrenRuleCount(root.getChildren()[1], ruleName);
            }else {
                throw new Error('unknown rule');
            }
        }

        return count;
    };

    /**
     * Compute bounding box for stroke by inkRange
     *
     * @param root
     * @param stroke
     */
    MathParser.prototype.computeBoundingBox  = function (inkRange, stroke, boundingBox) {
        var firstItem = inkRange.getFirstItem(),
            lastItem = inkRange.getLastItem();

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