(function (scope) {

    /**
     * Text segment result
     *
     * @class TextSegmentResult
     * @extends TextSegment
     * @param {Object} obj
     * @constructor
     */
    function TextSegmentResult (obj) {
        scope.TextSegment.call(this, obj);
        if (obj) {
            this.selectedCandidateIdx = obj.selectedCandidateIdx;
        }
    }

    /**
     * Inheritance property
     */
    TextSegmentResult.prototype = new scope.TextSegment();

    /**
     * Constructor property
     */
    TextSegmentResult.prototype.constructor = TextSegmentResult;

    /**
     *
     * @returns {Number}
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