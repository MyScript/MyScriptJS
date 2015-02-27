'use strict';

describe('MyScriptJS: input/shape/shapeRecognitionData.js', function () {

    it('ShapeRecognitionData object exist', function () {
        expect(MyScript.ShapeRecognitionData).to.exist;
        expect(MyScript.ShapeRecognitionData).not.to.be.null;
        expect(MyScript.ShapeRecognitionData).to.not.be.undefined;
    });

    it('ShapeRecognitionData constructor', function () {
        var shapeRecognitionData = new MyScript.ShapeRecognitionData();
        expect(shapeRecognitionData).to.be.an('object');
        expect(shapeRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
        expect(shapeRecognitionData).to.be.an.instanceof(MyScript.ShapeRecognitionData);
    });

    it('ShapeRecognitionData math recognition input getter', function () {
        var shapeRecognitionData = new MyScript.ShapeRecognitionData();
        expect(shapeRecognitionData.getShapeRecognitionInput()).to.be.undefined;
    });

    it('MathRecognitionData math recognition input setter', function () {
        var shapeRecognitionData = new MyScript.ShapeRecognitionData();
        expect(shapeRecognitionData.getShapeRecognitionInput()).to.be.undefined;
        shapeRecognitionData.setShapeRecognitionInput(new MyScript.ShapeRecognitionInput());
        expect(shapeRecognitionData.getShapeRecognitionInput()).not.to.be.undefined;
    });
});