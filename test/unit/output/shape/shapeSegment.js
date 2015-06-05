'use strict';

describe('ShapeSegment: output/shape/shapeSegment.js', function () {

    describe('Default construction', function () {

        var shapeSegment;
        before(function (done) {
            shapeSegment = new MyScript.ShapeSegment();
            done();
        });

        it('check initial state', function () {
            expect(shapeSegment).to.be.an('object');
            expect(shapeSegment).to.be.an.instanceof(MyScript.ShapeSegment);
            expect(shapeSegment).to.have.ownProperty('inkRanges');
            expect(shapeSegment).to.have.ownProperty('candidates');
        });

        it('Element Type getter', function () {
            expect(shapeSegment.getElementType()).to.be.undefined;
        });

        it('Unique Id getter', function () {
            expect(shapeSegment.getUniqueId()).to.be.undefined;
        });

        it('Ink Ranges getter', function () {
            expect(shapeSegment.getInkRanges()).to.be.empty;
        });

        it('Selected Candidate Index getter', function () {
            expect(shapeSegment.getSelectedCandidateIdx()).to.be.undefined;
        });

        it('Candidates getter', function () {
            expect(shapeSegment.getCandidates()).to.be.empty;
        });

        it('Selected Candidate getter', function () {
            expect(shapeSegment.getSelectedCandidate()).to.be.undefined;
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

        it('check initial state', function () {
            expect(shapeSegment).to.be.an('object');
            expect(shapeSegment).to.be.an.instanceof(MyScript.ShapeSegment);
            expect(shapeSegment).to.have.ownProperty('inkRanges');
            expect(shapeSegment).to.have.ownProperty('candidates');
        });

        it('Test ShapeSegment object construction: ShapeErased construction', function () {
            expect(shapeSegment.getCandidates()[0]).to.be.an.instanceof(MyScript.ShapeErased);
        });

        it('Test ShapeSegment object construction: ShapeScratchOut construction', function () {
            expect(shapeSegment.getCandidates()[1]).to.be.an.instanceof(MyScript.ShapeScratchOut);
        });

        it('Test ShapeSegment object construction: ShapeRecognized construction', function () {
            expect(shapeSegment.getCandidates()[2]).to.be.an.instanceof(MyScript.ShapeRecognized);
        });

        it('Test ShapeSegment object construction: ShapeNotRecognized construction', function () {
            expect(shapeSegment.getCandidates()[3]).to.be.an.instanceof(MyScript.ShapeNotRecognized);
        });

    });

});