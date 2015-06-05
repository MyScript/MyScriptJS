'use strict';

describe('TextSegment: output/text/textSegment.js', function () {

    describe('Default construction', function () {

        var textSegment;
        before(function (done) {
            textSegment = new MyScript.TextSegment();
            done();
        });

        it('check initial state', function () {
            expect(textSegment).to.be.an('object');
            expect(textSegment).to.be.an.instanceof(MyScript.TextSegment);
            expect(textSegment).to.have.ownProperty('candidates');
            expect(textSegment).to.have.ownProperty('inkRanges');
        });

        it('Candidates getter', function () {
            expect(textSegment.getCandidates()).to.be.empty;
        });

        it('Ink Ranges getter', function () {
            expect(textSegment.getInkRanges()).to.be.empty;
        });

        it('Selected Candidate Idx getter', function () {
            expect(textSegment.getSelectedCandidateIdx()).to.be.undefined;
        });

        it('Selected Candidate getter', function () {
            expect(textSegment.getSelectedCandidate()).to.be.undefined;
        });

    });

});