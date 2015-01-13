(function (scope) {

    /**
     * Shape segment
     *
     * @class ShapeSegment
     * @param {Object} obj
     * @constructor
     */
    function ShapeSegment (obj) {
        this.inkRanges = [];
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
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    ShapeSegment.prototype.getElementType = function () {
        return this.elementType;
    };

    /**
     * Get unique id
     *
     * @method getUniqueId
     * @returns {String}
     */
    ShapeSegment.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MyScript.ShapeInkRange[]}
     */
    ShapeSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIndex
     * @returns {Number}
     */
    ShapeSegment.prototype.getSelectedCandidateIndex = function () {
        return this.selectedCandidateIndex;
    };

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MyScript.ShapeCandidate[]}
     */
    ShapeSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MyScript.ShapeCandidate}
     */
    ShapeSegment.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidateIndex];
    };

    // Export
    scope.ShapeSegment = ShapeSegment;
})(MyScript);