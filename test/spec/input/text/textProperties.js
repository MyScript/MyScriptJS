'use strict';

describe('MyScriptJS: input/text/textProperties.js', function () {

    var expect = require('chai').expect;

    it('TextProperties object exist', function () {
        expect(MyScript.TextProperties).to.exist;
        expect(MyScript.TextProperties).not.to.be.null;
        expect(MyScript.TextProperties).to.not.be.undefined;
    });

    it('TextProperties constructor', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties).to.be.an('object');
        expect(textProperties).to.be.an.instanceof(MyScript.TextProperties);
    });

    it('TextProperties Text Candidate List Size getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getTextCandidateListSize()).to.be.undefined;
    });

    it('TextProperties Text Candidate List setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getTextCandidateListSize()).to.be.undefined;
        textProperties.setTextCandidateListSize(57);
        expect(textProperties.getTextCandidateListSize()).to.not.be.undefined;
        expect(textProperties.getTextCandidateListSize()).to.be.equal(57);
    });

    it('TextProperties Word Candidate List Size getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getWordCandidateListSize()).to.be.undefined;
    });

    it('TextProperties Word Candidate List setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getWordCandidateListSize()).to.be.undefined;
        textProperties.setWordCandidateListSize(22);
        expect(textProperties.getWordCandidateListSize()).to.not.be.undefined;
        expect(textProperties.getWordCandidateListSize()).to.be.equal(22);
    });

    it('TextProperties Word Prediction List Size getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getWordPredictionListSize()).to.be.undefined;
    });

    it('TextProperties Word Prediction List setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getWordPredictionListSize()).to.be.undefined;
        textProperties.setWordPredictionListSize(21);
        expect(textProperties.getWordPredictionListSize()).to.not.be.undefined;
        expect(textProperties.getWordPredictionListSize()).to.be.equal(21);
    });

    it('TextProperties Word Completion List Size getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getWordCompletionListSize()).to.be.undefined;
    });

    it('TextProperties Word Completion List setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getWordCompletionListSize()).to.be.undefined;
        textProperties.setWordCompletionListSize(12);
        expect(textProperties.getWordCompletionListSize()).to.not.be.undefined;
        expect(textProperties.getWordCompletionListSize()).to.be.equal(12);
    });

    it('TextProperties Character Candidate List Size getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getCharacterCandidateListSize()).to.be.undefined;
    });

    it('TextProperties Character Candidate List setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getCharacterCandidateListSize()).to.be.undefined;
        textProperties.setCharacterCandidateListSize(45);
        expect(textProperties.getCharacterCandidateListSize()).to.not.be.undefined;
        expect(textProperties.getCharacterCandidateListSize()).to.be.equal(45);
    });

    it('TextProperties Discard Case Variations Size getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getDiscardCaseVariations()).to.be.undefined;
    });

    it('TextProperties Discard Case Variations setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getDiscardCaseVariations()).to.be.undefined;
        textProperties.setDiscardCaseVariations(true);
        expect(textProperties.getDiscardCaseVariations()).to.not.be.undefined;
        expect(textProperties.getDiscardCaseVariations()).to.be.equal(true);
    });

    it('TextProperties Discard Accentuation Variations Size getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getDiscardAccentuationVariations()).to.be.undefined;
    });

    it('TextProperties Discard Accentuation Variations setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getDiscardAccentuationVariations()).to.be.undefined;
        textProperties.setDiscardAccentuationVariations(true);
        expect(textProperties.getDiscardAccentuationVariations()).to.not.be.undefined;
        expect(textProperties.getDiscardAccentuationVariations()).to.be.equal(true);
    });

    it('TextProperties Disable Spatial Ordering getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getDisableSpatialOrdering()).to.be.undefined;
    });

    it('TextProperties Disable Spatial Ordering setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getDisableSpatialOrdering()).to.be.undefined;
        textProperties.setDisableSpatialOrdering(true);
        expect(textProperties.getDisableSpatialOrdering()).to.not.be.undefined;
        expect(textProperties.getDisableSpatialOrdering()).to.be.equal(true);
    });

    it('TextProperties Glyph Distortion getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getGlyphDistortion()).to.be.undefined;
    });

    it('TextProperties Glyph Distortion setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getGlyphDistortion()).to.be.undefined;
        textProperties.setGlyphDistortion(58);
        expect(textProperties.getGlyphDistortion()).to.not.be.undefined;
        expect(textProperties.getGlyphDistortion()).to.be.equal(58);
    });

    it('TextProperties Enable Out Of Lexicon getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getEnableOutOfLexicon()).to.be.undefined;
    });

    it('TextProperties Enable Out Of Lexicon setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getEnableOutOfLexicon()).to.be.undefined;
        textProperties.setEnableOutOfLexicon(true);
        expect(textProperties.getEnableOutOfLexicon()).to.not.be.undefined;
        expect(textProperties.getEnableOutOfLexicon()).to.be.equal(true);
    });

    it('TextProperties Spelling Distortion getter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getSpellingDistortion()).to.be.undefined;
    });

    it('TextProperties Spelling Distortion setter', function () {
        var textProperties = new MyScript.TextProperties();
        expect(textProperties.getSpellingDistortion()).to.be.undefined;
        textProperties.setSpellingDistortion(85);
        expect(textProperties.getSpellingDistortion()).to.not.be.undefined;
        expect(textProperties.getSpellingDistortion()).to.be.equal(85);
    });
});