(function (scope) {
    'use strict';
    /**
     * Math non-terminal node
     *
     * @class MathNonTerminalNode
     * @extends MathNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathNonTerminalNode (obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        if (obj) {
            this.selectedCandidate = obj.selectedCandidate;
            for (var i in obj.candidates) {
                switch (obj.candidates[i].type) {
                    case 'nonTerminalNode':
                        switch (obj.candidates[i].name) {
                            case 'term':
                                this.candidates.push(new scope.MathTermNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'sqrtTerm':
                                this.candidates.push(new scope.MathSqrtNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'vectorTerm':
                                this.candidates.push(new scope.MathVectorNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'system':
                                this.candidates.push(new scope.MathSystemNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'exponentiable':
                                this.candidates.push(new scope.MathExponentiableNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'expression':
                                this.candidates.push(new scope.MathExpressionNonTerminalNode(obj.candidates[i]));
                                break;
                        }
                        this.candidates.push(new scope.MathNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'terminalNode':
                        this.candidates.push(new scope.MathTerminalNode(obj.candidates[i]));
                        break;
                    case 'rule':
                        switch (obj.candidates[i].name) {
                            case 'identity':
                                this.candidates.push(new scope.MathIdentityRuleNode(obj.candidates[i]));
                                break;
                            case 'horizontal pair':
                                this.candidates.push(new scope.MathHorizontalPairRuleNode(obj.candidates[i]));
                                break;
                            case 'fence':
                                this.candidates.push(new scope.MathFenceRuleNode(obj.candidates[i]));
                                break;
                            case 'fraction':
                                this.candidates.push(new scope.MathFractionRuleNode(obj.candidates[i]));
                                break;
                            case 'sqrt':
                                this.candidates.push(new scope.MathSqrtRuleNode(obj.candidates[i]));
                                break;
                            case 'subscript':
                                this.candidates.push(new scope.MathSubscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'superscript':
                                this.candidates.push(new scope.MathSuperscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'subsuperscript':
                                this.candidates.push(new scope.MathSubSuperscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'underscript':
                                this.candidates.push(new scope.MathUnderscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'overscript':
                                this.candidates.push(new scope.MathOverscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'underoverscript':
                                this.candidates.push(new scope.MathUnderOverscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'presuperscript':
                                this.candidates.push(new scope.MathPreSuperscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'vertical pair':
                                this.candidates.push(new scope.MathVerticalPairRuleNode(obj.candidates[i]));
                                break;
                            case 'left fence':
                                this.candidates.push(new scope.MathLeftFenceRuleNode(obj.candidates[i]));
                                break;
                        }
                        break;
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    MathNonTerminalNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathNonTerminalNode.prototype.constructor = MathNonTerminalNode;

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MyScript.MathNode[]}
     */
    MathNonTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    MathNonTerminalNode.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidate;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MyScript.MathNode}
     */
    MathNonTerminalNode.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidate];
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {MyScript.Rectangle}
     */
    MathNonTerminalNode.prototype.getBoundingBox = function () {
        return this.getSelectedCandidate() ? this.getSelectedCandidate().getBoundingBox() : undefined;
    };

    // Export
    scope.MathNonTerminalNode = MathNonTerminalNode;
})(MyScript);