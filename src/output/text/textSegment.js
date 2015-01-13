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
        if (obj) {
            this.inkRanges = obj.inkRanges;
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextCandidate(obj.candidates[i]));
            }
        }
    }

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MyScript.TextCandidate[]}
     */
    TextSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {String}
     */
    TextSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextSegment = TextSegment;
})(MyScript);