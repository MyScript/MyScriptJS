'use strict';

describe('ShapeRecognizer: recognition/shapeRecognizer.js', function () {

    describe('Default construction', function () {

        var shapeRecognizer;
        before(function (done) {
            shapeRecognizer = new MyScript.ShapeRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(shapeRecognizer).to.be.an('object');
            expect(shapeRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(shapeRecognizer).to.be.an.instanceOf(MyScript.ShapeRecognizer);
        });

        it('Get parameters', function () {
            expect(shapeRecognizer.getParameters()).to.be.an.instanceOf(MyScript.ShapeParameter);
        });

        it('Set parameters', function () {
            var parameters = new MyScript.ShapeParameter();
            parameters.setBeautification(true);
            parameters.setRejectDetectionSensitivity(0);
            shapeRecognizer.setParameters(parameters);
            expect(shapeRecognizer.getParameters()).to.be.an.instanceOf(MyScript.ShapeParameter);
        });

    });

});