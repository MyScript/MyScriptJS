'use strict';

describe('ShapeRecognitionData: input/shape/shapeRecognitionData.js', function () {

    describe('Default construction', function () {

        var shapeRecognitionData;
        before(function (done) {
            shapeRecognitionData = new MyScript.ShapeRecognitionData();
            done();
        });

        it('Check initial state', function () {
            expect(shapeRecognitionData).to.be.an('object');
            expect(shapeRecognitionData).to.be.an.instanceOf(MyScript.AbstractRecognitionData);
            expect(shapeRecognitionData).to.be.an.instanceOf(MyScript.ShapeRecognitionData);
        });

        it('Get recognition input', function () {
            expect(shapeRecognitionData.getShapeRecognitionInput()).to.be.undefined;
        });

        it('Set recognition input', function () {
            shapeRecognitionData.setShapeRecognitionInput(new MyScript.ShapeRecognitionInput());
            expect(shapeRecognitionData.getShapeRecognitionInput()).not.to.be.undefined;
        });

    });

});