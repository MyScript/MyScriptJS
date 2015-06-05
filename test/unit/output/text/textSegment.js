'use strict';

describe('TextSegment: output/text/textSegment.js', function () {

    describe('Default construction', function () {

        var textSegment;
        before(function (done) {
            textSegment = new MyScript.TextSegment();
            done();
        });

        it('Check initial state', function () {
            expect(textSegment).to.be.an('object');
            expect(textSegment).to.be.an.instanceof(MyScript.TextSegment);
            expect(textSegment).to.have.ownProperty('candidates');
            expect(textSegment).to.have.ownProperty('inkRanges');
        });

        it('Get candidates', function () {
            expect(textSegment.getCandidates()).to.be.empty;
        });

        it('Get ink ranges', function () {
            expect(textSegment.getInkRanges()).to.be.empty;
        });

        it('Get selected candidate index', function () {
            expect(textSegment.getSelectedCandidateIdx()).to.be.undefined;
        });

        it('Get selected candidate', function () {
            expect(textSegment.getSelectedCandidate()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textSegment;
        before(function (done) {
            textSegment = new MyScript.TextSegment({
                selectedCandidateIdx: 0,
                inkRanges: '0-1-2:3-4-5'
            });
            textSegment.getCandidates().push(new MyScript.TextCandidate());
            done();
        });

        it('Check initial state', function () {
            expect(textSegment).to.be.an('object');
            expect(textSegment).to.be.an.instanceof(MyScript.TextSegment);
            expect(textSegment).to.have.ownProperty('candidates');
            expect(textSegment).to.have.ownProperty('inkRanges');
        });

        it('Get candidates', function () {
            expect(textSegment.getCandidates()).not.to.be.empty;
        });

        it('Get ink ranges', function () {
            expect(textSegment.getInkRanges()).not.to.be.empty;
            expect(textSegment.getInkRanges()[0]).to.be.an.instanceof(MyScript.TextInkRange);
        });

        it('Get selected candidate index', function () {
            expect(textSegment.getSelectedCandidateIdx()).to.equal(0);
        });

        it('Get selected candidate', function () {
            expect(textSegment.getSelectedCandidate()).to.be.an.instanceof(MyScript.TextCandidate);
        });

    });

});