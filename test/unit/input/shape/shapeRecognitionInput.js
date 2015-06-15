'use strict';

describe('ShapeRecognitionInput: input/shape/shapeRecognitionInput.js', function () {

    describe('Default construction', function () {

        var shapeRecognitionInput;
        before(function (done) {
            shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
            done();
        });

        it('Check initial state', function () {
            expect(shapeRecognitionInput).to.be.an('object');
            expect(shapeRecognitionInput).to.be.an.instanceOf(MyScript.AbstractRecognitionInput);
            expect(shapeRecognitionInput).to.be.an.instanceOf(MyScript.ShapeRecognitionInput);
        });

        it('Get components', function () {
            expect(shapeRecognitionInput.getComponents()).to.be.undefined;
        });

        it('Set components', function () {
            shapeRecognitionInput.setComponents(new MyScript.AbstractComponent());
            expect(shapeRecognitionInput.getComponents()).not.to.be.undefined;
        });

        it('Get do beautification', function () {
            expect(shapeRecognitionInput.getDoBeautification()).to.be.undefined;
        });

        it('Set do beautification', function () {
            shapeRecognitionInput.setDoBeautification(true);
            expect(shapeRecognitionInput.getDoBeautification()).not.to.be.undefined;
            expect(shapeRecognitionInput.getDoBeautification()).to.be.true;
        });

        it('Get reject detection sensitivity', function () {
            expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.be.undefined;
        });

        it('Set reject detection sensitivity', function () {
            shapeRecognitionInput.setRejectDetectionSensitivity(6);
            expect(shapeRecognitionInput.getRejectDetectionSensitivity()).not.to.be.undefined;
            expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.equal(6);
        });

    });

});