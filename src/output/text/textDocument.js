(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function TextDocument (obj) {
        this.tagItems = [];
        this.wordCandidates = [];
        this.charCandidates = [];
        if (obj) {
            this.textSegmentResult = new scope.TextSegmentResult(obj.textSegmentResult);
            for (var i in obj.tagItems) {
                this.tagItems.push(new scope.TextTagItem(obj.tagItems[i]));
            }
            for (var j in obj.wordCandidates) {
                this.wordCandidates.push(new scope.TextCandidate(obj.wordCandidates[j]));
            }
            for (var k in obj.charCandidates) {
                this.charCandidates.push(new scope.TextCandidate(obj.charCandidates[k]));
            }
        }
    }

    /**
     *
     * @returns {Array}
     */
    TextDocument.prototype.getTagItems = function () {
        return this.tagItems;
    };

    /**
     *
     * @returns {Array}
     */
    TextDocument.prototype.getWordCandidates = function () {
        return this.wordCandidates;
    };

    /**
     *
     * @returns {Array}
     */
    TextDocument.prototype.getCharCandidates = function () {
        return this.charCandidates;
    };

    /**
     *
     * @returns {TextSegmentResult}
     */
    TextDocument.prototype.getTextSegmentResult = function () {
        return this.textSegmentResult;
    };

    // Export
    scope.TextDocument = TextDocument;
})(MyScript);