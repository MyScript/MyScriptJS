(function (scope) {

    /**
     *
     * @constructor
     */
    function TextSegmentResult (obj) {
        scope.TextSegment.call(this, obj);
        this.selectedCandidateIdx = 0;
        if (obj) {
            this.selectedCandidateIdx = obj.selectedCandidateIdx;
        }
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