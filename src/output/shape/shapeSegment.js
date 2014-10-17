(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeSegment () {
        this.elementType = null;
        this.uniqueID = null;
        this.inkRanges = [];
        this.selectedCandidateIndex = null;
        this.candidates = [];
    }

    /**
     *
     * @returns {string}
     */
    ShapeSegment.prototype.getElementType = function () {
        return this.elementType;
    };

    /**
     *
     * @returns {string}
     */
    ShapeSegment.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     *
     * @returns {Array}
     */
    ShapeSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     *
     * @returns {number}
     */
    ShapeSegment.prototype.getSelectedCandidateIndex = function () {
        return this.selectedCandidateIndex;
    };

    /**
     *
     * @returns {Array}
     */
    ShapeSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     *
     * @returns {ShapeCandidate}
     */
    ShapeSegment.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidateIndex];
    };

    // Export
    scope.ShapeSegment = ShapeSegment;
})(MyScript);