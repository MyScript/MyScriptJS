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

        it('Type getter', function () {
            expect(shapeCandidate.getType()).to.be.undefined;
        });

        it('Is Erased', function () {
            expect(shapeCandidate.isErased()).to.be.false;
        });

        it('Is Scratch Out', function () {
            expect(shapeCandidate.isScratchOut()).to.be.false;
        });

        it('Is Not Recognized', function () {
            expect(shapeCandidate.isNotRecognized()).to.be.false;
        });

        it('Is Recognized', function () {
            expect(shapeCandidate.isRecognized()).to.be.false;
        });

    });

});