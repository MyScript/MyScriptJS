'use strict';

describe('ShapeRecognizer: recognition/shapeRecognizer.js', function () {

    describe('Default construction', function () {

        var shapeRecognizer;
        before(function (done) {
            shapeRecognizer = new MyScript.ShapeRecognizer();
            done();
        });

        it('check initial state', function () {
            expect(shapeRecognizer).to.be.an('object');
            expect(shapeRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
            expect(shapeRecognizer).to.be.an.instanceof(MyScript.ShapeRecognizer);
        });

    });

    describe('Accessors', function () {

        var shapeRecognizer, parameters;
        before(function (done) {
            shapeRecognizer = new MyScript.ShapeRecognizer();
            parameters = new MyScript.ShapeParameter();
            parameters.setBeautification(true);
            parameters.setRejectDetectionSensitivity(0);
            done();
        });

        it('Get parameters', function () {
            expect(shapeRecognizer.getParameters()).to.be.an.instanceof(MyScript.ShapeParameter);
        });

        it('Set parameters', function () {
            shapeRecognizer.setParameters(parameters);
            expect(shapeRecognizer.getParameters()).to.be.an.instanceof(MyScript.ShapeParameter);
        });

    });

});