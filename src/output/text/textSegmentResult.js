/**
 *
 * @param scope
 */
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
    TextSegmentResult.prototype = Object.create(scope.TextSegment.prototype);

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

    /**
     *
     * @type {TextSegmentResult}
     */
    scope.TextSegmentResult = TextSegmentResult;
})(MyScript);