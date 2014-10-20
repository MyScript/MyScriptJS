(function (scope) {

    /**
     * Text recognition properties
     * @constructor
     */
    function TextProperties () {
    }

    /**
     * @returns {number}
     */
    TextProperties.prototype.getTextCandidateListSize = function () {
        return this.textCandidateListSize;
    };

    /**
     * @param {number}
     */
    TextProperties.prototype.setTextCandidateListSize = function (textCandidateListSize) {
        this.textCandidateListSize = textCandidateListSize;
    };

    /**
     * @returns {number}
     */
    TextProperties.prototype.getWordCandidateListSize = function () {
        return this.wordCandidateListSize;
    };

    /**
     * @param {number}
     */
    TextProperties.prototype.setWordCandidateListSize = function (wordCandidateListSize) {
        this.wordCandidateListSize = wordCandidateListSize;
    };

    /**
     * @returns {number}
     */
    TextProperties.prototype.getWordPredictionListSize = function () {
        return this.wordPredictionListSize;
    };

    /**
     * @param {number}
     */
    TextProperties.prototype.setWordPredictionListSize = function (wordPredictionListSize) {
        this.wordPredictionListSize = wordPredictionListSize;
    };

    /**
     * @returns {number}
     */
    TextProperties.prototype.getWordCompletionListSize = function () {
        return this.wordCompletionListSize;
    };

    /**
     * @param {number}
     */
    TextProperties.prototype.setWordCompletionListSize = function (wordCompletionListSize) {
        this.wordCompletionListSize = wordCompletionListSize;
    };

    /**
     * @returns {number}
     */
    TextProperties.prototype.getCharacterCandidateListSize = function () {
        return this.characterCandidateListSize;
    };

    /**
     * @param {number}
     */
    TextProperties.prototype.setCharacterCandidateListSize = function (characterCandidateListSize) {
        this.characterCandidateListSize = characterCandidateListSize;
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
    TextProperties.prototype.setDiscardCaseVariations = function (discardCaseVariations) {
        this.discardCaseVariations = discardCaseVariations;
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
    TextProperties.prototype.setDiscardAccentuationVariations = function (discardAccentuationVariations) {
        this.discardAccentuationVariations = discardAccentuationVariations;
    };

    /**
     * @returns {boolean}
     */
    TextProperties.prototype.getDisableSpatialOrdering = function () {
        return this.disableSpatialOrdering;
    };

    /**
     * @param {boolean}
     */
    TextProperties.prototype.setDisableSpatialOrdering = function (disableSpatialOrdering) {
        this.disableSpatialOrdering = disableSpatialOrdering;
    };

    /**
     * @returns {number}
     */
    TextProperties.prototype.getGlyphDistortion = function () {
        return this.glyphDistortion;
    };

    /**
     * @param {number}
     */
    TextProperties.prototype.setGlyphDistortion = function (glyphDistortion) {
        this.glyphDistortion = glyphDistortion;
    };

    /**
     * @returns {boolean}
     */
    TextProperties.prototype.getEnableOutOfLexicon = function () {
        return this.enableOutOfLexicon;
    };

    /**
     * @param {boolean}
     */
    TextProperties.prototype.setEnableOutOfLexicon = function (enableOutOfLexicon) {
        this.enableOutOfLexicon = enableOutOfLexicon;
    };

    /**
     * @returns {number}
     */
    TextProperties.prototype.getSpellingDistortion = function () {
        return this.spellingDistortion;
    };

    /**
     * @param {number}
     */
    TextProperties.prototype.getSpellingDistortion = function (spellingDistortion) {
        this.spellingDistortion = spellingDistortion;
    };

    // Export
    scope.TextProperties = TextProperties;
})(MyScript);