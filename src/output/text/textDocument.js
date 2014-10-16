(function (scope) {

    /**
     *
     * @constructor
     */
    function TextDocument () {
        this.tagItems = [];
        this.wordCandidates = [];
        this.charCandidates = [];
        this.textSegmentResult = null;
    }

    /**
     *
     * @type {Object}
     */
    TextDocument.prototype.__proto__ = new Object();

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