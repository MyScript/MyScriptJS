'use strict';

(function (scope) {
    /**
     * Text segment
     *
     * @class TextSegment
     * @param {Object} [obj]
     * @constructor
     */
    function TextSegment (obj) {
        this.candidates = [];
        this.inkRanges = [];
        if (obj) {
            this.selectedCandidateIdx = obj.selectedCandidateIdx;
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextCandidate(obj.candidates[i]));
            }
            if (obj.inkRanges) {
                var ranges = obj.inkRanges.split(/[\s]+/);
                for (var j in ranges) {
                    this.inkRanges.push(new scope.TextInkRange(ranges[j]));
                }
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
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    TextSegment.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidateIdx;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {TextCandidate}
     */
    TextSegment.prototype.getSelectedCandidate = function () {
        if (this.candidates && (this.selectedCandidateIdx !== undefined)) {
            return this.candidates[this.selectedCandidateIdx];
        }
        return undefined;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {TextInkRange[]}
     */
    TextSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextSegment = TextSegment;
})(MyScript);