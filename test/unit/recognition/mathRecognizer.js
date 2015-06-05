'use strict';

describe('MathRecognizer: recognition/mathRecognizer.js', function () {

    describe('Default construction', function () {

        var mathRecognizer;
        before(function (done) {
            mathRecognizer = new MyScript.MathRecognizer();
            done();
        });

        it('check initial state', function () {
            expect(mathRecognizer).to.be.an('object');
            expect(mathRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
            expect(mathRecognizer).to.be.an.instanceof(MyScript.MathRecognizer);
        });

    });

    describe('Accessors', function () {

        var mathRecognizer, parameters;
        before(function (done) {
            mathRecognizer = new MyScript.MathRecognizer();
            parameters = new MyScript.MathParameter();
            parameters.setResultTypes(['LATEX']);
            done();
        });

        it('Get parameters', function () {
            expect(mathRecognizer.getParameters()).to.be.an.instanceof(MyScript.MathParameter);
        });

        it('Set parameters', function () {
            mathRecognizer.setParameters(parameters);
            expect(mathRecognizer.getParameters()).to.be.an.instanceof(MyScript.MathParameter);
        });

    });

});