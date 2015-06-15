'use strict';

describe('ShapeSegment: output/shape/shapeSegment.js', function () {

    describe('Default construction', function () {

        var shapeSegment;
        before(function (done) {
            shapeSegment = new MyScript.ShapeSegment();
            done();
        });

        it('Check initial state', function () {
            expect(shapeSegment).to.be.an('object');
            expect(shapeSegment).to.be.an.instanceOf(MyScript.ShapeSegment);
            expect(shapeSegment).to.have.ownProperty('inkRanges');
            expect(shapeSegment).to.have.ownProperty('candidates');
        });

        it('Get element type', function () {
            expect(shapeSegment.getElementType()).to.equal(undefined);
        });

        it('Get unique id', function () {
            expect(shapeSegment.getUniqueId()).to.equal(undefined);
        });

        it('Get ink ranges', function () {
            expect(shapeSegment.getInkRanges()).to.be.empty;
        });

        it('Get selected candidate index', function () {
            expect(shapeSegment.getSelectedCandidateIdx()).to.equal(undefined);
        });

        it('Get candidates', function () {
            expect(shapeSegment.getCandidates()).to.be.empty;
        });

        it('Get selected candidate', function () {
            expect(shapeSegment.getSelectedCandidate()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var shapeSegment;
        before(function (done) {
            shapeSegment = new MyScript.ShapeSegment({
                candidates: [{
                    type: 'erased'
                }, {
                    type: 'scratchOut'
                }, {
                    type: 'recognizedShape'
                }, {
                    type: 'default'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(shapeSegment).to.be.an('object');
            expect(shapeSegment).to.be.an.instanceOf(MyScript.ShapeSegment);
            expect(shapeSegment).to.have.ownProperty('inkRanges');
            expect(shapeSegment).to.have.ownProperty('candidates');
        });

        it('Get erased shape', function () {
            expect(shapeSegment.getCandidates()[0]).to.be.an.instanceOf(MyScript.ShapeErased);
        });

        it('Get scratch-out shape', function () {
            expect(shapeSegment.getCandidates()[1]).to.be.an.instanceOf(MyScript.ShapeScratchOut);
        });

        it('Get recognized shape', function () {
            expect(shapeSegment.getCandidates()[2]).to.be.an.instanceOf(MyScript.ShapeRecognized);
        });

        it('Get not recognized shape', function () {
            expect(shapeSegment.getCandidates()[3]).to.be.an.instanceOf(MyScript.ShapeNotRecognized);
        });

    });

});