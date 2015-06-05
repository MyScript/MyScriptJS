'use strict';

describe('ShapeScratchOut: output/shape/shapeScratchOut.js', function () {

    describe('Default construction', function () {

        var shapeScratchOut;
        before(function (done) {
            shapeScratchOut = new MyScript.ShapeScratchOut();
            done();
        });

        it('check initial state', function () {
            expect(shapeScratchOut).to.be.an('object');
            expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeCandidate);
            expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeScratchOut);
            expect(shapeScratchOut).to.have.ownProperty('inkRanges');
        });

        it('Ink Ranges getter', function () {
            expect(shapeScratchOut.getInkRanges()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var shapeScratchOut;
        before(function (done) {
            shapeScratchOut = new MyScript.ShapeScratchOut({
                inkRanges: [{
                    type: 'inkRange'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(shapeScratchOut).to.be.an('object');
            expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeCandidate);
            expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeScratchOut);
            expect(shapeScratchOut).to.have.ownProperty('inkRanges');
        });

        it('Test ShapeScratchOut object construction: ShapeInkRange construction', function () {
            expect(shapeScratchOut.getInkRanges()[0]).to.be.an.instanceof(MyScript.ShapeInkRange);
        });

    });

});