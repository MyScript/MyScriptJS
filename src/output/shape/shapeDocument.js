'use strict';

(function (scope) {
    /**
     * Shape document
     *
     * @class ShapeDocument
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeDocument(obj) {
        this.segments = [];
        this.inkRanges = [];
        if (obj) {
            for (var i in obj.segments) {
                this.segments.push(new scope.ShapeSegment(obj.segments[i]));
                for(j in this.segments[i].getInkRanges()){
                    this.inkRanges.push(this.segments[i].getInkRanges()[j]);
                }

            }
        }
    }

    /**
     * Get segments
     *
     * @method getSegments
     * @returns {ShapeSegment[]}
     */
    ShapeDocument.prototype.getSegments = function () {
        return this.segments;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {ShapeInkRange[]}
     */
    ShapeDocument.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    ShapeDocument.prototype.hasScratchOutResults = function () {
        for (var i in this.getSegments()) {
            var currentSeg = this.getSegments()[i];
            for (var j in currentSeg.getCandidates()) {
                var currentCandidate = currentSeg.getCandidates()[j];
                if (currentCandidate instanceof scope.ShapeScratchOut) {
                    return true;
                }
            }
        }
        return false;
    };

    // Export
    scope.ShapeDocument = ShapeDocument;
})(MyScript);
