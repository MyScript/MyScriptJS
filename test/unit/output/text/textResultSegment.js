'use strict';

describe('TextResultSegment: output/text/textResultSegment.js', function () {

    describe('Default construction', function () {

        var textResultSegment;
        before(function (done) {
            textResultSegment = new MyScript.TextResultSegment();
            done();
        });

        it('Check initial state', function () {
            expect(textResultSegment).to.be.an('object');
            expect(textResultSegment).to.be.an.instanceOf(MyScript.TextSegment);
            expect(textResultSegment).to.be.an.instanceOf(MyScript.TextResultSegment);
            expect(textResultSegment).to.have.ownProperty('candidates');
            expect(textResultSegment).to.have.ownProperty('inkRanges');
        });

        it('Candidates getter', function () {
            expect(textResultSegment.getCandidates()).to.be.empty;
        });

        it('Ink Ranges getter', function () {
            expect(textResultSegment.getInkRanges()).to.be.empty;
        });

        it('Selected Candidate Idx getter', function () {
            expect(textResultSegment.getSelectedCandidateIdx()).to.be.undefined;
        });

        it('Selected Candidate getter', function () {
            expect(textResultSegment.getSelectedCandidate()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textResultSegment;
        before(function (done) {
            textResultSegment = new MyScript.TextResultSegment({
                candidates: [{
                    type: 'candidate'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(textResultSegment).to.be.an('object');
            expect(textResultSegment).to.be.an.instanceOf(MyScript.TextSegment);
            expect(textResultSegment).to.be.an.instanceOf(MyScript.TextResultSegment);
            expect(textResultSegment).to.have.ownProperty('candidates');
            expect(textResultSegment).to.have.ownProperty('inkRanges');
        });

        it('Test TextResultSegment object construction: candidate construction', function () {
            expect(textResultSegment.getCandidates()[0]).to.be.an.instanceOf(MyScript.TextResultCandidate);
        });

    });

});