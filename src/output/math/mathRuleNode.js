(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathRuleNode (obj) {
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
                }
            }
        }
    }

    /**
     *
     * @type {MyScript.MathNode}
     */
    MathRuleNode.prototype = new scope.MathNode();

    /**
     *
     * @type {MathRuleNode}
     */
    MathRuleNode.prototype.constructor = MathRuleNode;

    /**
     *
     * @returns {Array}
     */
    MathRuleNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     *
     * @returns {Number}
     */
    MathRuleNode.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidate;
    };

    /**
     *
     * @returns {MathNode}
     */
    MathRuleNode.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidate];
    };

    // Export
    scope.MathRuleNode = MathRuleNode;
})(MyScript);