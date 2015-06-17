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
            expect(textDocument).to.be.an.instanceOf(MyScript.TextDocument);
            expect(textDocument).to.have.ownProperty('tagItems');
            expect(textDocument).to.have.ownProperty('wordCandidates');
            expect(textDocument).to.have.ownProperty('charCandidates');
        });

        it('Get tag items', function () {
            expect(textDocument.getTagItems()).to.be.empty;
        });

        it('Get word segments', function () {
            expect(textDocument.getWordSegments()).to.be.empty;
        });

        it('Get char segments', function () {
            expect(textDocument.getCharSegments()).to.be.empty;
        });

        it('Get text segment', function () {
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
            expect(textDocument).to.be.an.instanceOf(MyScript.TextDocument);
            expect(textDocument).to.have.ownProperty('tagItems');
            expect(textDocument).to.have.ownProperty('wordCandidates');
            expect(textDocument).to.have.ownProperty('charCandidates');
        });

        it('Get tag items', function () {
            expect(textDocument.getTagItems()[0]).to.be.an.instanceOf(MyScript.TextTagItem);
        });

        it('Get text segment', function () {
            expect(textDocument.getTextSegment()).to.be.an.instanceOf(MyScript.TextSegment);
        });

        it('Get text candidate', function () {
            expect(textDocument.getTextSegment().getCandidates()[0]).to.be.an.instanceOf(MyScript.TextCandidate);
        });

        it('Get word segment', function () {
            expect(textDocument.getWordSegments()[0]).to.be.an.instanceOf(MyScript.TextSegment);
        });

        it('Get char segment', function () {
            expect(textDocument.getCharSegments()[0]).to.be.an.instanceOf(MyScript.TextSegment);
        });

    });

});