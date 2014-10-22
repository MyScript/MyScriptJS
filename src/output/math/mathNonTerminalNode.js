(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathNonTerminalNode (obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        if (obj) {
            for (var i in obj.candidates) {
                this.candidates.push(new scope.MathNode(obj.candidates[i]));
            }
        }
    }

    /**
     *
     * @type {MyScript.MathNode}
     */
    MathNonTerminalNode.prototype = new scope.MathNode();

    /**
     *
     * @type {MathNonTerminalNode}
     */
    MathNonTerminalNode.prototype.constructor = MathNonTerminalNode;

    /**
     *
     * @returns {Array}
     */
    MathNonTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     *
     * @returns {number}
     */
    MathNonTerminalNode.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidate;
    };

    /**
     *
     * @returns {MathNode}
     */
    MathNonTerminalNode.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidate];
    };

    // Export
    scope.MathNonTerminalNode = MathNonTerminalNode;
})(MyScript);