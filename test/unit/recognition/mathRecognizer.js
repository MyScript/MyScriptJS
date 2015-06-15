'use strict';

describe('MathRecognizer: recognition/mathRecognizer.js', function () {

    describe('Default construction', function () {

        var mathRecognizer;
        before(function (done) {
            mathRecognizer = new MyScript.MathRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(mathRecognizer).to.be.an('object');
            expect(mathRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(mathRecognizer).to.be.an.instanceOf(MyScript.MathRecognizer);
        });

        it('Get parameters', function () {
            expect(mathRecognizer.getParameters()).to.be.an.instanceOf(MyScript.MathParameter);
        });

        it('Set parameters', function () {
            var parameters = new MyScript.MathParameter();
            parameters.setResultTypes(['LATEX']);
            mathRecognizer.setParameters(parameters);
            expect(mathRecognizer.getParameters()).to.be.an.instanceOf(MyScript.MathParameter);
        });

    });

});