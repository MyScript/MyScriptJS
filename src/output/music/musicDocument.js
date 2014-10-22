(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicDocument (obj) {
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
     *
     * @returns {Array}
     */
    MusicDocument.prototype.getResultElements = function () {
        return this.results;
    };

    /**
     *
     * @returns {Array}
     */
    MusicDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    // Export
    scope.MusicDocument = MusicDocument;
})(MyScript);