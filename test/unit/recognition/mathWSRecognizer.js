'use strict';

describe('MathWSRecognizer: recognition/mathWSRecognizer.js', function () {

    describe('Default construction', function () {

        var mathRecognizer;
        before(function (done) {
            mathRecognizer = new MyScript.MathWSRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(mathRecognizer).to.be.an('object');
            expect(mathRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(mathRecognizer).to.be.an.instanceOf(MyScript.AbstractWSRecognizer);
            expect(mathRecognizer).to.be.an.instanceOf(MyScript.MathWSRecognizer);
        });

    });

    describe('Accessors', function () {

        var mathRecognizer, parameters;
        before(function (done) {
            mathRecognizer = new MyScript.MathWSRecognizer();
            parameters = new MyScript.MathParameter();
            parameters.setResultTypes(['LATEX']);
            done();
        });

        it('Get parameters', function () {
            expect(mathRecognizer.getParameters()).to.be.an.instanceOf(MyScript.MathParameter);
        });

        it('Set parameters', function () {
            mathRecognizer.setParameters(parameters);
            expect(mathRecognizer.getParameters()).to.be.an.instanceOf(MyScript.MathParameter);
        });

    });

});