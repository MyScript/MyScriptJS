'use strict';

describe('TextWordSegment: output/text/textWordSegment.js', function () {

    describe('Default construction', function () {

        var textWordSegment;
        before(function (done) {
            textWordSegment = new MyScript.TextWordSegment();
            done();
        });

        it('check initial state', function () {
            expect(textWordSegment).to.be.an('object');
            expect(textWordSegment).to.be.an.instanceof(MyScript.TextSegment);
            expect(textWordSegment).to.be.an.instanceof(MyScript.TextWordSegment);
            expect(textWordSegment).to.have.ownProperty('candidates');
            expect(textWordSegment).to.have.ownProperty('inkRanges');
        });

        it('Candidates getter', function () {
            expect(textWordSegment.getCandidates()).to.be.empty;
        });

        it('Ink Ranges getter', function () {
            expect(textWordSegment.getInkRanges()).to.be.empty;
        });

        it('Selected Candidate Idx getter', function () {
            expect(textWordSegment.getSelectedCandidateIdx()).to.be.undefined;
        });

        it('Selected Candidate getter', function () {
            expect(textWordSegment.getSelectedCandidate()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textWordSegment;
        before(function (done) {
            textWordSegment = new MyScript.TextWordSegment({
                candidates: [{
                    type: 'candidate'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(textWordSegment).to.be.an('object');
            expect(textWordSegment).to.be.an.instanceof(MyScript.TextSegment);
            expect(textWordSegment).to.be.an.instanceof(MyScript.TextWordSegment);
            expect(textWordSegment).to.have.ownProperty('candidates');
            expect(textWordSegment).to.have.ownProperty('inkRanges');
        });

        it('Test TextWordSegment object construction: candidate construction', function () {
            expect(textWordSegment.getCandidates()[0]).to.be.an.instanceof(MyScript.TextWordCandidate);
        });

    });

});