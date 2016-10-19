'use strict';

(function (scope) {
    /**
     * Music document
     *
     * @class MusicDocument
     * @param {Object} [obj]
     * @constructor
     */
    function MusicDocument(obj) {
        this.results = [];
        this.scratchOutResults = [];
        if (obj) {
            for (var i in obj.results) {
                switch (obj.results[i].type) {
                    case 'MUSICXML':
                        this.results.push(new scope.MusicXMLResultElement(obj.results[i]));
                        break;
                    default:
                        this.results.push(new scope.MusicScoreTreeResultElement(obj.results[i]));
                        break;
                }
            }
            for (var j in obj.scratchOutResults) {
                this.scratchOutResults.push(new scope.MusicScratchOut(obj.scratchOutResults[j]));
            }
        }
    }

    /**
     * Get result elements
     *
     * @method getResultElements
     * @returns {MusicResultElement[]}
     */
    MusicDocument.prototype.getResultElements = function () {
        return this.results;
    };

    /**
     * Get scratch-out results
     *
     * @method getScratchOutResults
     * @returns {MusicScratchOut[]}
     */
    MusicDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    MusicDocument.prototype.hasScratchOutResults = function () {
        if (this.getScratchOutResults() && (this.getScratchOutResults().length > 0)) {
            return true;
        }
        return false;
    };

    // Export
    scope.MusicDocument = MusicDocument;
})(MyScript);