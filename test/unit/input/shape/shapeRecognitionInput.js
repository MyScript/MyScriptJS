'use strict';

describe('MyScriptJS: input/shape/shapeRecognitionInput.js', function () {

    it('ShapeRecognitionInput object exist', function () {
        expect(MyScript.ShapeRecognitionInput).to.exist;
        expect(MyScript.ShapeRecognitionInput).not.to.be.null;
        expect(MyScript.ShapeRecognitionInput).to.not.be.undefined;
    });

    it('ShapeRecognitionInput constructor', function () {
        var shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
        expect(shapeRecognitionInput).to.be.an('object');
        expect(shapeRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
        expect(shapeRecognitionInput).to.be.an.instanceof(MyScript.ShapeRecognitionInput);
    });

    it('ShapeRecognitionInput components getter', function () {
        var shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
        expect(shapeRecognitionInput.getComponents()).to.be.undefined;
    });

    it('ShapeRecognitionInput components setter', function () {
        var shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
        expect(shapeRecognitionInput.getComponents()).to.be.undefined;
        shapeRecognitionInput.setComponents(new MyScript.AbstractComponent());
        expect(shapeRecognitionInput.getComponents()).not.to.be.undefined;
    });

    it('ShapeRecognitionInput Do Beautification getter', function () {
        var shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
        expect(shapeRecognitionInput.getDoBeautification()).to.be.undefined;
    });

    it('ShapeRecognitionInput Do Beautification setter', function () {
        var shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
        expect(shapeRecognitionInput.getDoBeautification()).to.be.undefined;
        shapeRecognitionInput.setDoBeautification(true);
        expect(shapeRecognitionInput.getDoBeautification()).not.to.be.undefined;
        expect(shapeRecognitionInput.getDoBeautification()).to.be.true;
    });

    it('ShapeRecognitionInput Reject Detection Sensitivity getter', function () {
        var shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
        expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.be.undefined;
    });

    it('ShapeRecognitionInput Reject Detection Sensitivity setter', function () {
        var shapeRecognitionInput = new MyScript.ShapeRecognitionInput();
        expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.be.undefined;
        shapeRecognitionInput.setRejectDetectionSensitivity(6);
        expect(shapeRecognitionInput.getRejectDetectionSensitivity()).not.to.be.undefined;
        expect(shapeRecognitionInput.getRejectDetectionSensitivity()).to.be.equal(6);
    });


});