(function (scope) {

    /**
     *
     * @constructor
     */
    function TextSegmentResult () {
        this.candidates = [];
        this.selectedCandidateIdx = 0;
    }

    /**
     *
     * @type {TextSegment}
     */
    TextSegmentResult.prototype.__proto__ = new scope.TextSegment();

    /**
     *
     * @returns {Array}
     */
    TextSegmentResult.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     *
     * @returns {number}
     */
    TextSegmentResult.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidateIdx;
    };

    /**
     *
     * @returns {TextCandidate}
     */
    TextSegmentResult.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidateIdx];
    };

    // Export
    scope.TextSegmentResult = TextSegmentResult;
})(MyScript);