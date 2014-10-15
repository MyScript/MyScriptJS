/**
 *
 * @param scope
 */
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
    TextDocument.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {TextDocument}
     */
    scope.TextDocument = TextDocument;
})(MyScript);