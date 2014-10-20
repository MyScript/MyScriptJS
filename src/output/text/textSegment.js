(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function TextSegment (obj) {
        this.candidates = [];
        this.inkRanges = [];
        if (obj) {
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextCandidate(obj.candidates[i]));
            }
            for (var j in obj.inkRanges) {
                this.inkRanges.push(obj.inkRanges[j]);
            }
        }
    }

    /**
     *
     * @returns {Array}
     */
    TextSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     *
     * @returns {Array}
     */
    TextSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextSegment = TextSegment;
})(MyScript);