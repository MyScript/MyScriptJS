'use strict';

describe('TextDocument: output/text/textDocument.js', function () {

    describe('Default construction', function () {

        var textDocument;
        before(function (done) {
            textDocument = new MyScript.TextDocument();
            done();
        });

        it('Check initial state', function () {
            expect(textDocument).to.be.an('object');
            expect(textDocument).to.be.an.instanceof(MyScript.TextDocument);
            expect(textDocument).to.have.ownProperty('tagItems');
            expect(textDocument).to.have.ownProperty('wordCandidates');
            expect(textDocument).to.have.ownProperty('charCandidates');
        });

        it('Tag Items getter', function () {
            expect(textDocument.getTagItems()).to.be.empty;
        });

        it('Word Candidates getter', function () {
            expect(textDocument.getWordSegments()).to.be.empty;
        });

        it('Char Candidates getter', function () {
            expect(textDocument.getCharSegments()).to.be.empty;
        });

        it('Text Segment Result getter', function () {
            expect(textDocument.getTextSegment()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textDocument;
        before(function (done) {
            textDocument = new MyScript.TextDocument({
                tagItems: [{
                    type: 'tag'
                }],
                textSegmentResult: {
                    candidates: [{
                        type: 'result'
                    }]
                },
                wordCandidates: [{
                    type: 'word'
                }],
                charCandidates: [{
                    type: 'char'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(textDocument).to.be.an('object');
            expect(textDocument).to.be.an.instanceof(MyScript.TextDocument);
            expect(textDocument).to.have.ownProperty('tagItems');
            expect(textDocument).to.have.ownProperty('wordCandidates');
            expect(textDocument).to.have.ownProperty('charCandidates');
        });

        it('Test TextDocument object construction: TextTagItem construction', function () {
            expect(textDocument.getTagItems()[0]).to.be.an.instanceof(MyScript.TextTagItem);
        });

        it('Test TextDocument object construction: TextResultSegment construction', function () {
            expect(textDocument.getTextSegment()).to.be.an.instanceof(MyScript.TextResultSegment);
        });

        it('Test TextDocument object construction: TextResultCandidate construction', function () {
            expect(textDocument.getTextSegment().getCandidates()[0]).to.be.an.instanceof(MyScript.TextResultCandidate);
        });

        it('Test TextDocument object construction: TextWordSegment construction', function () {
            expect(textDocument.getWordSegments()[0]).to.be.an.instanceof(MyScript.TextWordSegment);
        });

        it('Test TextDocument object construction: TextCharSegment construction', function () {
            expect(textDocument.getCharSegments()[0]).to.be.an.instanceof(MyScript.TextCharSegment);
        });

    });

});