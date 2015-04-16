'use strict';

describe('MyScriptJS: output/text/textCharSegment.js', function () {

    it('TextCharSegment object exist', function () {
        expect(MyScript.TextCharSegment).to.exist;
        expect(MyScript.TextCharSegment).not.to.be.null;
        expect(MyScript.TextCharSegment).to.not.be.undefined;
    });

    var textCharSegment = new MyScript.TextCharSegment();
    it('TextCharSegment constructor', function () {
        expect(textCharSegment).to.be.an('object');
        expect(textCharSegment).to.be.an.instanceof(MyScript.TextSegment);
        expect(textCharSegment).to.be.an.instanceof(MyScript.TextCharSegment);
        expect(textCharSegment).to.have.ownProperty('candidates');
        expect(textCharSegment).to.have.ownProperty('inkRanges');
    });

    it('TextCharSegment Candidates getter', function () {
        expect(textCharSegment.getCandidates()).to.be.empty;
    });

    it('TextCharSegment Ink Ranges getter', function () {
        expect(textCharSegment.getInkRanges()).to.be.empty;
    });

    it('TextCharSegment Selected Candidate Idx getter', function () {
        expect(textCharSegment.getSelectedCandidateIdx()).to.be.undefined;
    });

    it('TextCharSegment Selected Candidate getter', function () {
        expect(textCharSegment.getSelectedCandidate()).to.be.undefined;
    });

    var obj = {
        candidates: [{
            type: 'candidate'
        }]
    };
    var textCharSegment2 = new MyScript.TextCharSegment(obj);
    it('Test TextCharSegment object construction: candidate construction', function () {
        expect(textCharSegment2.getCandidates()[0]).to.be.an.instanceof(MyScript.TextCharCandidate);
    });
});