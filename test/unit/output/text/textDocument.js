'use strict';

describe('MyScriptJS: output/text/textDocument.js', function () {

    it('TextDocument object exist', function () {
        expect(MyScript.TextDocument).to.exist;
        expect(MyScript.TextDocument).not.to.be.null;
        expect(MyScript.TextDocument).to.not.be.undefined;
    });

    var textDocument = new MyScript.TextDocument();
    it('TextDocument constructor', function () {
        expect(textDocument).to.be.an('object');
        expect(textDocument).to.be.an.instanceof(MyScript.TextDocument);
        expect(textDocument).to.have.ownProperty('tagItems');
        expect(textDocument).to.have.ownProperty('wordCandidates');
        expect(textDocument).to.have.ownProperty('charCandidates');
    });

    it('TextDocument Tag Items getter', function () {
        expect(textDocument.getTagItems()).to.be.empty;
    });

    it('TextDocument Word Candidates getter', function () {
        expect(textDocument.getWordCandidates()).to.be.empty;
    });

    it('TextDocument Char Candidates getter', function () {
        expect(textDocument.getCharCandidates()).to.be.empty;
    });

    it('TextDocument Text Segment Result getter', function () {
        expect(textDocument.getTextSegmentResult()).to.be.undefined;
    });

    var obj = {
        tagItems: [{
            type: 'tag'
        }],
        wordCandidates: [{
            type: 'word'
        }],
        charCandidates: [{
            type: 'char'
        }]
    };
    var textDocument2 = new MyScript.TextDocument(obj);
    it('Test TextDocument object construction: TextTagItem construction', function () {
        expect(textDocument2.getTagItems()[0]).to.be.an.instanceof(MyScript.TextTagItem);
    });
    it('Test TextDocument object construction: word TextSegment construction', function () {
        expect(textDocument2.getWordCandidates()[0]).to.be.an.instanceof(MyScript.TextSegment);
    });
    it('Test TextDocument object construction: char TextSegment construction', function () {
        expect(textDocument2.getCharCandidates()[0]).to.be.an.instanceof(MyScript.TextSegment);
    });

});