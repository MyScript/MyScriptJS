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
     * @type {MyScript.TextSegment}
     */
    TextSegmentResult.prototype = new scope.TextSegment();

    /**
     *
     * @type {TextSegmentResult}
     */
    TextSegmentResult.prototype.constructor = TextSegmentResult;

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