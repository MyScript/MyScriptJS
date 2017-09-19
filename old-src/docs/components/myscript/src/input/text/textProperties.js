'use strict';

(function (scope) {
    /**
     * Text recognition properties
     *
     * @class TextProperties
     * @constructor
     */
    function TextProperties(obj) {
        if (obj) {
            if (obj.textCandidateListSize) {
                this.textCandidateListSize = obj.textCandidateListSize;
            }
            if (obj.wordCandidateListSize) {
                this.wordCandidateListSize = obj.wordCandidateListSize;
            }
            if (obj.wordPredictionListSize) {
                this.wordPredictionListSize = obj.wordPredictionListSize;
            }
            if (obj.wordCompletionListSize) {
                this.wordCompletionListSize = obj.wordCompletionListSize;
            }
            if (obj.characterCandidateListSize) {
                this.characterCandidateListSize = obj.characterCandidateListSize;
            }
            if (obj.discardCaseVariations) {
                this.discardCaseVariations = obj.discardCaseVariations;
            }
            if (obj.discardAccentuationVariations) {
                this.discardAccentuationVariations = obj.discardAccentuationVariations;
            }
            if (obj.disableSpatialOrdering) {
                this.disableSpatialOrdering = obj.disableSpatialOrdering;
            }
            if (obj.glyphDistortion) {
                this.glyphDistortion = obj.glyphDistortion;
            }
            if (obj.enableOutOfLexicon) {
                this.enableOutOfLexicon = obj.enableOutOfLexicon;
            }
            if (obj.spellingDistortion) {
                this.spellingDistortion = obj.spellingDistortion;
            }
        }
    }

    /**
     * Get the number of text candidates requested
     *
     * @method getTextCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getTextCandidateListSize = function () {
        return this.textCandidateListSize;
    };

    /**
     * Set the number of text candidates requested
     *
     * @method setTextCandidateListSize
     * @param {Number} textCandidateListSize
     */
    TextProperties.prototype.setTextCandidateListSize = function (textCandidateListSize) {
        this.textCandidateListSize = textCandidateListSize;
    };

    /**
     * Get the number of word candidates requested
     *
     * @method getWordCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordCandidateListSize = function () {
        return this.wordCandidateListSize;
    };

    /**
     * Set the number of word candidates requested
     *
     * @method setWordCandidateListSize
     * @param {Number} wordCandidateListSize
     */
    TextProperties.prototype.setWordCandidateListSize = function (wordCandidateListSize) {
        this.wordCandidateListSize = wordCandidateListSize;
    };

    /**
     * Get the number of word prediction candidates requested
     *
     * @method getWordPredictionListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordPredictionListSize = function () {
        return this.wordPredictionListSize;
    };

    /**
     * Set the number of word prediction candidates requested
     *
     * @method setWordPredictionListSize
     * @param {Number} wordPredictionListSize
     */
    TextProperties.prototype.setWordPredictionListSize = function (wordPredictionListSize) {
        this.wordPredictionListSize = wordPredictionListSize;
    };

    /**
     * Get the number of word completion candidates requested
     *
     * @method getWordCompletionListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordCompletionListSize = function () {
        return this.wordCompletionListSize;
    };

    /**
     * Set the number of word completion candidates requested
     *
     * @method setWordCompletionListSize
     * @param {Number} wordCompletionListSize
     */
    TextProperties.prototype.setWordCompletionListSize = function (wordCompletionListSize) {
        this.wordCompletionListSize = wordCompletionListSize;
    };

    /**
     * Get the number of character candidates requested
     *
     * @method getCharacterCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getCharacterCandidateListSize = function () {
        return this.characterCandidateListSize;
    };

    /**
     * Set the number of character candidates requested
     *
     * @method setCharacterCandidateListSize
     * @param {Number} characterCandidateListSize
     */
    TextProperties.prototype.setCharacterCandidateListSize = function (characterCandidateListSize) {
        this.characterCandidateListSize = characterCandidateListSize;
    };

    /**
     * Get the discard case variations
     *
     * @method getDiscardCaseVariations
     * @returns {boolean}
     */
    TextProperties.prototype.getDiscardCaseVariations = function () {
        return this.discardCaseVariations;
    };

    /**
     * Set the discard case variations
     *
     * @method setDiscardCaseVariations
     * @param {boolean} discardCaseVariations
     */
    TextProperties.prototype.setDiscardCaseVariations = function (discardCaseVariations) {
        this.discardCaseVariations = discardCaseVariations;
    };

    /**
     * Get the discard accentuation variations
     *
     * @method getDiscardAccentuationVariations
     * @returns {boolean}
     */
    TextProperties.prototype.getDiscardAccentuationVariations = function () {
        return this.discardAccentuationVariations;
    };

    /**
     * Set the discard accentuation variations
     *
     * @method setDiscardAccentuationVariations
     * @param {boolean} discardAccentuationVariations
     */
    TextProperties.prototype.setDiscardAccentuationVariations = function (discardAccentuationVariations) {
        this.discardAccentuationVariations = discardAccentuationVariations;
    };

    /**
     * Get disable spatial ordering
     *
     * @method getDisableSpatialOrdering
     * @returns {Boolean}
     */
    TextProperties.prototype.getDisableSpatialOrdering = function () {
        return this.disableSpatialOrdering;
    };

    /**
     * Set disable spatial ordering
     *
     * @method setDisableSpatialOrdering
     * @param {Boolean} disableSpatialOrdering
     */
    TextProperties.prototype.setDisableSpatialOrdering = function (disableSpatialOrdering) {
        this.disableSpatialOrdering = disableSpatialOrdering;
    };

    /**
     * Get glyph distortion
     *
     * @method getGlyphDistortion
     * @returns {Number}
     */
    TextProperties.prototype.getGlyphDistortion = function () {
        return this.glyphDistortion;
    };

    /**
     * Set glyph distortion
     *
     * @method setGlyphDistortion
     * @param {Number} glyphDistortion
     */
    TextProperties.prototype.setGlyphDistortion = function (glyphDistortion) {
        this.glyphDistortion = glyphDistortion;
    };

    /**
     * Get enable out of lexicon
     *
     * @method getEnableOutOfLexicon
     * @returns {Boolean}
     */
    TextProperties.prototype.getEnableOutOfLexicon = function () {
        return this.enableOutOfLexicon;
    };

    /**
     * Set enable out of lexicon
     *
     * @method setEnableOutOfLexicon
     * @param {Boolean} enableOutOfLexicon
     */
    TextProperties.prototype.setEnableOutOfLexicon = function (enableOutOfLexicon) {
        this.enableOutOfLexicon = enableOutOfLexicon;
    };

    /**
     * Get spelling distortion
     *
     * @method getSpellingDistortion
     * @returns {Number}
     */
    TextProperties.prototype.getSpellingDistortion = function () {
        return this.spellingDistortion;
    };

    /**
     * Set spelling distortion
     *
     * @method setSpellingDistortion
     * @param {Number} spellingDistortion
     */
    TextProperties.prototype.setSpellingDistortion = function (spellingDistortion) {
        this.spellingDistortion = spellingDistortion;
    };

    // Export
    scope.TextProperties = TextProperties;
})(MyScript);
