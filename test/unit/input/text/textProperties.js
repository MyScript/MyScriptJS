'use strict';

describe('TextProperties: input/text/textProperties.js', function () {

    describe('Default construction', function () {

        var textProperties;
        before(function (done) {
            textProperties = new MyScript.TextProperties();
            done();
        });

        it('Check initial state', function () {
            expect(textProperties).to.be.an('object');
            expect(textProperties).to.be.an.instanceOf(MyScript.TextProperties);
        });

        it('Get text candidate list size', function () {
            expect(textProperties.getTextCandidateListSize()).to.be.undefined;
        });

        it('Set text candidate list size', function () {
            textProperties.setTextCandidateListSize(57);
            expect(textProperties.getTextCandidateListSize()).to.equal(57);
        });

        it('Get word candidate list size', function () {
            expect(textProperties.getWordCandidateListSize()).to.be.undefined;
        });

        it('Set word candidate list size', function () {
            textProperties.setWordCandidateListSize(22);
            expect(textProperties.getWordCandidateListSize()).to.equal(22);
        });

        it('Get word prediction list size', function () {
            expect(textProperties.getWordPredictionListSize()).to.be.undefined;
        });

        it('Set word prediction list size', function () {
            textProperties.setWordPredictionListSize(21);
            expect(textProperties.getWordPredictionListSize()).to.equal(21);
        });

        it('Get word completion list size', function () {
            expect(textProperties.getWordCompletionListSize()).to.be.undefined;
        });

        it('Set word completion list size', function () {
            textProperties.setWordCompletionListSize(12);
            expect(textProperties.getWordCompletionListSize()).to.equal(12);
        });

        it('Get character candidate list size', function () {
            expect(textProperties.getCharacterCandidateListSize()).to.be.undefined;
        });

        it('Set character candidate list size', function () {
            textProperties.setCharacterCandidateListSize(45);
            expect(textProperties.getCharacterCandidateListSize()).to.equal(45);
        });

        it('Get discard case variations size', function () {
            expect(textProperties.getDiscardCaseVariations()).to.be.undefined;
        });

        it('Set discard case variations size', function () {
            textProperties.setDiscardCaseVariations(true);
            expect(textProperties.getDiscardCaseVariations()).to.equal(true);
        });

        it('Get discard accentuation variations size', function () {
            expect(textProperties.getDiscardAccentuationVariations()).to.be.undefined;
        });

        it('Set discard accentuation variations size', function () {
            textProperties.setDiscardAccentuationVariations(true);
            expect(textProperties.getDiscardAccentuationVariations()).to.equal(true);
        });

        it('Get disable spatial ordering', function () {
            expect(textProperties.getDisableSpatialOrdering()).to.be.undefined;
        });

        it('Set disable spatial ordering', function () {
            textProperties.setDisableSpatialOrdering(true);
            expect(textProperties.getDisableSpatialOrdering()).to.equal(true);
        });

        it('Get glyph distortion', function () {
            expect(textProperties.getGlyphDistortion()).to.be.undefined;
        });

        it('Set glyph distortion', function () {
            textProperties.setGlyphDistortion(58);
            expect(textProperties.getGlyphDistortion()).to.equal(58);
        });

        it('Get enable out-of-lexicon', function () {
            expect(textProperties.getEnableOutOfLexicon()).to.be.undefined;
        });

        it('Set enable out-of-lexicon', function () {
            textProperties.setEnableOutOfLexicon(true);
            expect(textProperties.getEnableOutOfLexicon()).to.equal(true);
        });

        it('Get spelling distortion', function () {
            expect(textProperties.getSpellingDistortion()).to.be.undefined;
        });

        it('Set spelling distortion', function () {
            textProperties.setSpellingDistortion(85);
            expect(textProperties.getSpellingDistortion()).to.equal(85);
        });

    });

});