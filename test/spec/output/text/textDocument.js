'use strict';

describe('MyScriptJS: output/text/textDocument.js', function () {

    it('TextDocument object exist', function () {
        expect(MyScript.TextDocument).to.exist;
        expect(MyScript.TextDocument).not.to.be.null;
        expect(MyScript.TextDocument).to.not.be.undefined;
    });

    it('TextDocument constructor', function () {
        var textDocument = new MyScript.TextDocument();
        expect(textDocument).to.be.an('object');
        expect(textDocument).to.be.an.instanceof(MyScript.TextDocument);
        expect(textDocument).to.have.ownProperty('tagItems');
        expect(textDocument).to.have.ownProperty('wordCandidates');
        expect(textDocument).to.have.ownProperty('charCandidates');
    });

    it('TextDocument Tag Items getter', function () {
        var textDocument = new MyScript.TextDocument();
        expect(textDocument.getTagItems()).to.be.empty;
    });

    it('TextDocument Word Candidates getter', function () {
        var textDocument = new MyScript.TextDocument();
        expect(textDocument.getWordCandidates()).to.be.empty;
    });

    it('TextDocument Char Candidates getter', function () {
        var textDocument = new MyScript.TextDocument();
        expect(textDocument.getCharCandidates()).to.be.empty;
    });

    it('TextDocument Text Segment Result getter', function () {
        var textDocument = new MyScript.TextDocument();
        expect(textDocument.getTextSegmentResult()).to.be.undefined;
    });

});