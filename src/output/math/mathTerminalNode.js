(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathTerminalNode (obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        this.inkRanges = [];
        if (obj) {
            this.selectedCandidate = obj.selectedCandidate;
            for (var i in obj.candidates) {
                this.candidates.push(new scope.MathTerminalNodeCandidate(obj.candidates[i]));
            }
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.MathInkRange(obj.inkRanges[j]));
            }
        }
    }

    /**
     *
     * @type {MyScript.MathNode}
     */
    MathTerminalNode.prototype = new scope.MathNode();

    /**
     *
     * @type {MathTerminalNode}
     */
    MathTerminalNode.prototype.constructor = MathTerminalNode;

    /**
     *
     * @returns {Array}
     */
    MathTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     *
     * @returns {Array}
     */
    MathTerminalNode.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.MathTerminalNode = MathTerminalNode;
})(MyScript);