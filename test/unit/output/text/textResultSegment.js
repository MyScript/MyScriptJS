'use strict';

describe('MyScriptJS: output/text/textResultSegment.js', function () {

    it('TextResultSegment object exist', function () {
        expect(MyScript.TextResultSegment).to.exist;
        expect(MyScript.TextResultSegment).not.to.be.null;
        expect(MyScript.TextResultSegment).to.not.be.undefined;
    });

    var textResultSegment = new MyScript.TextResultSegment();
    it('TextResultSegment constructor', function () {
        expect(textResultSegment).to.be.an('object');
        expect(textResultSegment).to.be.an.instanceof(MyScript.TextSegment);
        expect(textResultSegment).to.be.an.instanceof(MyScript.TextResultSegment);
        expect(textResultSegment).to.have.ownProperty('candidates');
        expect(textResultSegment).to.have.ownProperty('inkRanges');
    });

    it('TextResultSegment Candidates getter', function () {
        expect(textResultSegment.getCandidates()).to.be.empty;
    });

    it('TextResultSegment Ink Ranges getter', function () {
        expect(textResultSegment.getInkRanges()).to.be.empty;
    });

    it('TextResultSegment Selected Candidate Idx getter', function () {
        expect(textResultSegment.getSelectedCandidateIdx()).to.be.undefined;
    });

    it('TextResultSegment Selected Candidate getter', function () {
        expect(textResultSegment.getSelectedCandidate()).to.be.undefined;
    });

    var obj = {
        candidates: [{
            type: 'candidate'
        }]
    };
    var textResultSegment2 = new MyScript.TextResultSegment(obj);
    it('Test TextResultSegment object construction: candidate construction', function () {
        expect(textResultSegment2.getCandidates()[0]).to.be.an.instanceof(MyScript.TextResultCandidate);
    });
});