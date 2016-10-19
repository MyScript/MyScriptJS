'use strict';

(function (scope) {
    /**
     * Math non-terminal node
     *
     * @class MathNonTerminalNode
     * @extends MathNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathNonTerminalNode(obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        if (obj) {
            this.selectedCandidate = obj.selectedCandidate;
            for (var i in obj.candidates) {
                switch (obj.candidates[i].type) {
                    case 'nonTerminalNode':
                        this.candidates.push(new scope.MathNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'terminalNode':
                        this.candidates.push(new scope.MathTerminalNode(obj.candidates[i]));
                        break;
                    case 'rule':
                        this.candidates.push(new scope.MathRuleNode(obj.candidates[i]));
                        break;
                    case 'cell':
                        this.candidates.push(new scope.MathCellNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'border':
                        this.candidates.push(new scope.MathBorderNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'table':
                        this.candidates.push(new scope.MathTableRuleNode(obj.candidates[i]));
                        break;
                    default:
                        throw new Error('Unknown math node type: ' + obj.candidates[i].type);
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
        if ((this.getCandidates().length > 0) && (this.getSelectedCandidateIdx() !== undefined)) {
            return this.getCandidates()[this.getSelectedCandidateIdx()];
        } else {
            return undefined;
        }
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathNonTerminalNode.prototype.getInkRanges = function () {
        if (this.getSelectedCandidate()) {
            return this.getSelectedCandidate().getInkRanges();
        } else {
            throw new Error('No selected candidate');
        }
    };

    // Export
    scope.MathNonTerminalNode = MathNonTerminalNode;
})(MyScript);
