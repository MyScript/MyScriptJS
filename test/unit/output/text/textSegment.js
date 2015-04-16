'use strict';

describe('MyScriptJS: output/text/textSegment.js', function () {

    it('TextSegment object exist', function () {
        expect(MyScript.TextSegment).to.exist;
        expect(MyScript.TextSegment).not.to.be.null;
        expect(MyScript.TextSegment).to.not.be.undefined;
    });

    it('TextSegment constructor', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment).to.be.an('object');
        expect(textSegment).to.be.an.instanceof(MyScript.TextSegment);
        expect(textSegment).to.have.ownProperty('candidates');
        expect(textSegment).to.have.ownProperty('inkRanges');
    });

    it('TextSegment Candidates getter', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment.getCandidates()).to.be.empty;
    });

    it('TextSegment Ink Ranges getter', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment.getInkRanges()).to.be.empty;
    });

    it('TextSegment Selected Candidate Idx getter', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment.getSelectedCandidateIdx()).to.be.undefined;
    });

    it('TextSegment Selected Candidate getter', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment.getSelectedCandidate()).to.be.undefined;
    });
});