'use strict';

describe('MyScriptJS: output/text/textSegmentResult.js', function () {

    it('TextSegmentResult object exist', function () {
        expect(MyScript.TextSegmentResult).to.exist;
        expect(MyScript.TextSegmentResult).not.to.be.null;
        expect(MyScript.TextSegmentResult).to.not.be.undefined;
    });

    it('TextSegmentResult constructor', function () {
        var textSegmentResult = new MyScript.TextSegmentResult();
        expect(textSegmentResult).to.be.an('object');
        expect(textSegmentResult).to.be.an.instanceof(MyScript.MusicElement);
        expect(textSegmentResult).to.be.an.instanceof(MyScript.TextSegmentResult);
    });

    it('TextSegmentResult Selected Candidate Idx getter', function () {
        var textSegmentResult = new MyScript.TextSegmentResult();
        expect(textSegmentResult.getSelectedCandidateIdx()).to.be.undefined;
    });

    it('TextSegmentResult Selected Candidate getter', function () {
        var textSegmentResult = new MyScript.TextSegmentResult();
        expect(textSegmentResult.getSelectedCandidate()).to.be.undefined;
    });
});