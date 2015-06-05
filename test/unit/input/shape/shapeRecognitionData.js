'use strict';

describe('ShapeRecognitionData: input/shape/shapeRecognitionData.js', function () {

    describe('Default construction', function () {

        var shapeRecognitionData;
        before(function (done) {
            shapeRecognitionData = new MyScript.ShapeRecognitionData();
            done();
        });

        it('check initial state', function () {
            expect(shapeRecognitionData).to.be.an('object');
            expect(shapeRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
            expect(shapeRecognitionData).to.be.an.instanceof(MyScript.ShapeRecognitionData);
        });

    });

    describe('Accessors', function () {

        var shapeRecognitionData;
        beforeEach(function (done) {
            shapeRecognitionData = new MyScript.ShapeRecognitionData();
            done();
        });

        it('shape recognition input getter', function () {
            expect(shapeRecognitionData.getShapeRecognitionInput()).to.be.undefined;
        });

        it('shape recognition input setter', function () {
            expect(shapeRecognitionData.getShapeRecognitionInput()).to.be.undefined;
            shapeRecognitionData.setShapeRecognitionInput(new MyScript.ShapeRecognitionInput());
            expect(shapeRecognitionData.getShapeRecognitionInput()).not.to.be.undefined;
        });

    });

});