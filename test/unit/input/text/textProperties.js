'use strict';

describe('TextProperties: input/text/textProperties.js', function () {

    describe('Default construction', function () {

        var textProperties;
        before(function (done) {
            textProperties = new MyScript.TextProperties();
            done();
        });

        it('check initial state', function () {
            expect(textProperties).to.be.an('object');
            expect(textProperties).to.be.an.instanceof(MyScript.TextProperties);
        });

    });

    describe('Accessors', function () {

        var textProperties;
        beforeEach(function (done) {
            textProperties = new MyScript.TextProperties();
            done();
        });

        it('Text Candidate List Size getter', function () {
            expect(textProperties.getTextCandidateListSize()).to.be.undefined;
        });

        it('Text Candidate List setter', function () {
            expect(textProperties.getTextCandidateListSize()).to.be.undefined;
            textProperties.setTextCandidateListSize(57);
            expect(textProperties.getTextCandidateListSize()).to.not.be.undefined;
            expect(textProperties.getTextCandidateListSize()).to.be.equal(57);
        });

        it('Word Candidate List Size getter', function () {
            expect(textProperties.getWordCandidateListSize()).to.be.undefined;
        });

        it('Word Candidate List setter', function () {
            expect(textProperties.getWordCandidateListSize()).to.be.undefined;
            textProperties.setWordCandidateListSize(22);
            expect(textProperties.getWordCandidateListSize()).to.not.be.undefined;
            expect(textProperties.getWordCandidateListSize()).to.be.equal(22);
        });

        it('Word Prediction List Size getter', function () {
            expect(textProperties.getWordPredictionListSize()).to.be.undefined;
        });

        it('Word Prediction List setter', function () {
            expect(textProperties.getWordPredictionListSize()).to.be.undefined;
            textProperties.setWordPredictionListSize(21);
            expect(textProperties.getWordPredictionListSize()).to.not.be.undefined;
            expect(textProperties.getWordPredictionListSize()).to.be.equal(21);
        });

        it('Word Completion List Size getter', function () {
            expect(textProperties.getWordCompletionListSize()).to.be.undefined;
        });

        it('Word Completion List setter', function () {
            expect(textProperties.getWordCompletionListSize()).to.be.undefined;
            textProperties.setWordCompletionListSize(12);
            expect(textProperties.getWordCompletionListSize()).to.not.be.undefined;
            expect(textProperties.getWordCompletionListSize()).to.be.equal(12);
        });

        it('Character Candidate List Size getter', function () {
            expect(textProperties.getCharacterCandidateListSize()).to.be.undefined;
        });

        it('Character Candidate List setter', function () {
            expect(textProperties.getCharacterCandidateListSize()).to.be.undefined;
            textProperties.setCharacterCandidateListSize(45);
            expect(textProperties.getCharacterCandidateListSize()).to.not.be.undefined;
            expect(textProperties.getCharacterCandidateListSize()).to.be.equal(45);
        });

        it('Discard Case Variations Size getter', function () {
            expect(textProperties.getDiscardCaseVariations()).to.be.undefined;
        });

        it('Discard Case Variations setter', function () {
            expect(textProperties.getDiscardCaseVariations()).to.be.undefined;
            textProperties.setDiscardCaseVariations(true);
            expect(textProperties.getDiscardCaseVariations()).to.not.be.undefined;
            expect(textProperties.getDiscardCaseVariations()).to.be.equal(true);
        });

        it('Discard Accentuation Variations Size getter', function () {
            expect(textProperties.getDiscardAccentuationVariations()).to.be.undefined;
        });

        it('Discard Accentuation Variations setter', function () {
            expect(textProperties.getDiscardAccentuationVariations()).to.be.undefined;
            textProperties.setDiscardAccentuationVariations(true);
            expect(textProperties.getDiscardAccentuationVariations()).to.not.be.undefined;
            expect(textProperties.getDiscardAccentuationVariations()).to.be.equal(true);
        });

        it('Disable Spatial Ordering getter', function () {
            expect(textProperties.getDisableSpatialOrdering()).to.be.undefined;
        });

        it('Disable Spatial Ordering setter', function () {
            expect(textProperties.getDisableSpatialOrdering()).to.be.undefined;
            textProperties.setDisableSpatialOrdering(true);
            expect(textProperties.getDisableSpatialOrdering()).to.not.be.undefined;
            expect(textProperties.getDisableSpatialOrdering()).to.be.equal(true);
        });

        it('Glyph Distortion getter', function () {
            expect(textProperties.getGlyphDistortion()).to.be.undefined;
        });

        it('Glyph Distortion setter', function () {
            expect(textProperties.getGlyphDistortion()).to.be.undefined;
            textProperties.setGlyphDistortion(58);
            expect(textProperties.getGlyphDistortion()).to.not.be.undefined;
            expect(textProperties.getGlyphDistortion()).to.be.equal(58);
        });

        it('Enable Out Of Lexicon getter', function () {
            expect(textProperties.getEnableOutOfLexicon()).to.be.undefined;
        });

        it('Enable Out Of Lexicon setter', function () {
            expect(textProperties.getEnableOutOfLexicon()).to.be.undefined;
            textProperties.setEnableOutOfLexicon(true);
            expect(textProperties.getEnableOutOfLexicon()).to.not.be.undefined;
            expect(textProperties.getEnableOutOfLexicon()).to.be.equal(true);
        });

        it('Spelling Distortion getter', function () {
            expect(textProperties.getSpellingDistortion()).to.be.undefined;
        });

        it('Spelling Distortion setter', function () {
            expect(textProperties.getSpellingDistortion()).to.be.undefined;
            textProperties.setSpellingDistortion(85);
            expect(textProperties.getSpellingDistortion()).to.not.be.undefined;
            expect(textProperties.getSpellingDistortion()).to.be.equal(85);
        });

    });
});