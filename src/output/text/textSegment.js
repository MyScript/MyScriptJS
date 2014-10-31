(function (scope) {

    /**
     * Text segment
     *
     * @class TextSegment
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
     * Get candidates
     *
     * @method getCandidates
     * @returns {TextCandidate[]}
     */
    TextSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {Array}
     */
    TextSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextSegment = TextSegment;
})(MyScript);