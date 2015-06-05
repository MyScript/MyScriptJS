'use strict';

describe('ShapeRecognitionInput: input/shape/shapeRecognitionInput.js', function () {

    describe('Default construction', function () {

        var shapeRecognitionInput;
        before(function (done) {
            shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
            done();
        });

        it('check initial state', function () {
            expect(shapeRecognitionInput).to.be.an('object');
            expect(shapeRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
            expect(shapeRecognitionInput).to.be.an.instanceof(MyScript.ShapeRecognitionInput);
        });

    });

    describe('Accessors', function () {

        var shapeRecognitionInput;
        beforeEach(function (done) {
            shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
            done();
        });

        it('components getter', function () {
            expect(shapeRecognitionInput.getComponents()).to.be.undefined;
        });

        it('components setter', function () {
            expect(shapeRecognitionInput.getComponents()).to.be.undefined;
            shapeRecognitionInput.setComponents(new MyScript.AbstractComponent());
            expect(shapeRecognitionInput.getComponents()).not.to.be.undefined;
        });

        it('Do Beautification getter', function () {
            expect(shapeRecognitionInput.getDoBeautification()).to.be.undefined;
        });

        it('Do Beautification setter', function () {
            expect(shapeRecognitionInput.getDoBeautification()).to.be.undefined;
            shapeRecognitionInput.setDoBeautification(true);
            expect(shapeRecognitionInput.getDoBeautification()).not.to.be.undefined;
            expect(shapeRecognitionInput.getDoBeautification()).to.be.true;
        });

        it('Reject Detection Sensitivity getter', function () {
            expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.be.undefined;
        });

        it('Reject Detection Sensitivity setter', function () {
            expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.be.undefined;
            shapeRecognitionInput.setRejectDetectionSensitivity(6);
            expect(shapeRecognitionInput.getRejectDetectionSensitivity()).not.to.be.undefined;
            expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.be.equal(6);
        });

    });

});