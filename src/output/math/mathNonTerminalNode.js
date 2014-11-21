(function (scope) {

    /**
     * Math non-terminal node
     *
     * @class MathNonTerminalNode
     * @extends MathNode
     * @param {Object} obj
     * @constructor
     */
    function MathNonTerminalNode (obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        if (obj) {
            for (var i in obj.candidates) {
                switch (obj.candidates[i].type) {
                    case 'nonTerminalNode':
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
     * @returns {MathNode[]}
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
     * @returns {MathNode}
     */
    MathNonTerminalNode.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidate];
    };

    // Export
    scope.MathNonTerminalNode = MathNonTerminalNode;
})(MyScript);