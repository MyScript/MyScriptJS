(function (scope) {

    /**
     * Text recognition properties
     * @constructor
     */
    function TextProperties () {
    }

    /**
     *
     * @type {Object}
     */
    TextProperties.prototype.__proto__ = new Object();

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.textCandidateListSize = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.wordCandidateListSize = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.wordPredictionListSize = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.wordCompletionListSize = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.characterCandidateListSize = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.discardCaseVariations = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.discardAccentuationVariations = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.disableSpatialOrdering = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.glyphDistortion = null;

    /**
     *
     * @type {boolean}
     */
    TextProperties.prototype.enableOutOfLexicon = null;

    /**
     *
     * @type {number}
     */
    TextProperties.prototype.spellingDistortion = null;

    /**
     *
     */
    TextProperties.prototype.getTextCandidateListSize = function () {
        return this.textCandidateListSize;
    };

    /**
     *
     */
    TextProperties.prototype.getWordCandidateListSize = function () {
        return this.wordCandidateListSize;
    };

    /**
     *
     */
    TextProperties.prototype.getWordPredictionListSize = function () {
        return this.wordPredictionListSize;
    };

    /**
     *
     */
    TextProperties.prototype.getWordCompletionListSize = function () {
        return this.wordCompletionListSize;
    };

    /**
     *
     */
    TextProperties.prototype.getCharacterCandidateListSize = function () {
        return this.characterCandidateListSize;
    };

    /**
     *
     */
    TextProperties.prototype.getCharacterCandidateListSize = function () {
        return this.characterCandidateListSize;
    };

    /**
     *
     */
    TextProperties.prototype.getDiscardCaseVariations = function () {
        return this.discardCaseVariations;
    };

    /**
     *
     */
    TextProperties.prototype.getDiscardAccentuationVariations = function () {
        return this.discardAccentuationVariations;
    };

    /**
     *
     */
    TextProperties.prototype.getDisableSpatialOrdering = function () {
        return this.disableSpatialOrdering;
    };

    /**
     *
     */
    TextProperties.prototype.getGlyphDistortion = function () {
        return this.glyphDistortion;
    };

    /**
     *
     */
    TextProperties.prototype.getEnableOutOfLexicon = function () {
        return this.enableOutOfLexicon;
    };

    /**
     *
     */
    TextProperties.prototype.getSpellingDistortion = function () {
        return this.spellingDistortion;
    };

    // Export
    scope.TextProperties = TextProperties;
})(MyScript);