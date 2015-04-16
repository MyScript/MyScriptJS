'use strict';

describe('MyScriptJS: output/text/textWordSegment.js', function () {

    it('TextWordSegment object exist', function () {
        expect(MyScript.TextWordSegment).to.exist;
        expect(MyScript.TextWordSegment).not.to.be.null;
        expect(MyScript.TextWordSegment).to.not.be.undefined;
    });

    var textWordSegment = new MyScript.TextWordSegment();
    it('TextWordSegment constructor', function () {
        expect(textWordSegment).to.be.an('object');
        expect(textWordSegment).to.be.an.instanceof(MyScript.TextSegment);
        expect(textWordSegment).to.be.an.instanceof(MyScript.TextWordSegment);
        expect(textWordSegment).to.have.ownProperty('candidates');
        expect(textWordSegment).to.have.ownProperty('inkRanges');
    });

    it('TextWordSegment Candidates getter', function () {
        expect(textWordSegment.getCandidates()).to.be.empty;
    });

    it('TextWordSegment Ink Ranges getter', function () {
        expect(textWordSegment.getInkRanges()).to.be.empty;
    });

    it('TextWordSegment Selected Candidate Idx getter', function () {
        expect(textWordSegment.getSelectedCandidateIdx()).to.be.undefined;
    });

    it('TextWordSegment Selected Candidate getter', function () {
        expect(textWordSegment.getSelectedCandidate()).to.be.undefined;
    });

    var obj = {
        candidates: [{
            type: 'candidate'
        }]
    };
    var textWordSegment2 = new MyScript.TextWordSegment(obj);
    it('Test TextWordSegment object construction: candidate construction', function () {
        expect(textWordSegment2.getCandidates()[0]).to.be.an.instanceof(MyScript.TextWordCandidate);
    });
});