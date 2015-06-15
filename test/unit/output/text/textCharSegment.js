'use strict';

describe('TextCharSegment: output/text/textCharSegment.js', function () {

    describe('Default construction', function () {

        var textCharSegment;
        before(function (done) {
            textCharSegment = new MyScript.TextCharSegment();
            done();
        });

        it('Check initial state', function () {
            expect(textCharSegment).to.be.an('object');
            expect(textCharSegment).to.be.an.instanceOf(MyScript.TextSegment);
            expect(textCharSegment).to.be.an.instanceOf(MyScript.TextCharSegment);
            expect(textCharSegment).to.have.ownProperty('candidates');
            expect(textCharSegment).to.have.ownProperty('inkRanges');
        });

        it('Candidates getter', function () {
            expect(textCharSegment.getCandidates()).to.be.empty;
        });

        it('Ink Ranges getter', function () {
            expect(textCharSegment.getInkRanges()).to.be.empty;
        });

        it('Selected Candidate Idx getter', function () {
            expect(textCharSegment.getSelectedCandidateIdx()).to.be.undefined;
        });

        it('Selected Candidate getter', function () {
            expect(textCharSegment.getSelectedCandidate()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textCharSegment;
        before(function (done) {
            textCharSegment = new MyScript.TextCharSegment({
                candidates: [{
                    type: 'candidate'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(textCharSegment).to.be.an('object');
            expect(textCharSegment).to.be.an.instanceOf(MyScript.TextSegment);
            expect(textCharSegment).to.be.an.instanceOf(MyScript.TextCharSegment);
            expect(textCharSegment).to.have.ownProperty('candidates');
            expect(textCharSegment).to.have.ownProperty('inkRanges');
        });

        it('Test TextCharSegment object construction: candidate construction', function () {
            expect(textCharSegment.getCandidates()[0]).to.be.an.instanceOf(MyScript.TextCharCandidate);
        });

    });

});