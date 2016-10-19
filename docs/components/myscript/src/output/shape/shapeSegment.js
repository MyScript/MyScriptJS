'use strict';

(function (scope) {
    /**
     * Shape segment
     *
     * @class ShapeSegment
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeSegment(obj) {
        this.inkRanges = [];
        this.candidates = [];
        if (obj) {
            this.elementType = obj.elementType;
            this.uniqueID = obj.uniqueID;
            this.selectedCandidateIndex = obj.selectedCandidateIndex;
            for (var i in obj.candidates) {
                switch (obj.candidates[i].type) {
                    case 'erased':
                        this.candidates.push(new scope.ShapeErased(obj.candidates[i]));
                        break;
                    case 'scratchOut':
                        this.candidates.push(new scope.ShapeScratchOut(obj.candidates[i]));
                        break;
                    case 'recognizedShape':
                        this.candidates.push(new scope.ShapeRecognized(obj.candidates[i]));
                        break;
                    default:
                        this.candidates.push(new scope.ShapeNotRecognized(obj.candidates[i]));
                        break;
                }
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
     * @returns {ShapeInkRange[]}
     */
    ShapeSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    ShapeSegment.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidateIndex;
    };

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {ShapeCandidate[]}
     */
    ShapeSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {ShapeCandidate}
     */
    ShapeSegment.prototype.getSelectedCandidate = function () {
        if ((this.getCandidates().length > 0) && (this.getSelectedCandidateIdx() !== undefined)) {
            return this.getCandidates()[this.getSelectedCandidateIdx()];
        } else {
            return undefined;
        }
    };

    // Export
    scope.ShapeSegment = ShapeSegment;
})(MyScript);