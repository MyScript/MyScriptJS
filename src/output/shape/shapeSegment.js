(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeSegment (obj) {
        this.elementType = null;
        this.uniqueID = null;
        this.inkRanges = [];
        this.selectedCandidateIndex = null;
        this.candidates = [];
        if (obj) {
            this.elementType = obj.elementType;
            this.uniqueID = obj.uniqueID;
            this.selectedCandidateIndex = obj.selectedCandidateIndex;
            for (var i in obj.candidates) {
                var candidate;
                switch (obj.candidates[i].type) {
                    case 'erased':
                        candidate = new scope.ShapeErased(obj.candidates[i]);
                        break;
                    case 'scratchOut':
                        candidate = new scope.ShapeScratchOut(obj.candidates[i]);
                        break;
                    case 'recognizedShape':
                        candidate = new scope.ShapeRecognized(obj.candidates[i]);
                        break;
                    default:
                        candidate = new scope.ShapeNotRecognized(obj.candidates[i]);
                        break;
                }
                this.candidates.push(candidate);
            }
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.ShapeInkRange(obj.inkRanges[j]));
            }
        }
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