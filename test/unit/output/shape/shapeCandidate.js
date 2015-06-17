'use strict';

describe('ShapeCandidate: output/shape/shapeCandidate.js', function () {

    describe('Default construction', function () {

        var shapeCandidate;
        before(function (done) {
            shapeCandidate = new MyScript.ShapeCandidate();
            done();
        });

        it('Check initial state', function () {
            expect(shapeCandidate).to.be.an('object');
            expect(shapeCandidate).to.be.an.instanceOf(MyScript.ShapeCandidate);
        });

        it('Get type', function () {
            expect(shapeCandidate.getType()).to.equal(undefined);
        });

        it('Get is erased', function () {
            expect(shapeCandidate.isErased()).to.equal(false);
        });

        it('Get is scratch-out', function () {
            expect(shapeCandidate.isScratchOut()).to.equal(false);
        });

        it('Get is not recognized', function () {
            expect(shapeCandidate.isNotRecognized()).to.equal(false);
        });

        it('Get is recognized', function () {
            expect(shapeCandidate.isRecognized()).to.equal(false);
        });

    });

});