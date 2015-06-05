'use strict';

describe('AnalyzerRecognitionInput: input/analyzer/analyzerRecognitionInput.js', function () {

    describe('Default construction', function () {

        var analyzerRecognitionInput;
        before(function (done) {
            analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
            done();
        });

        it('check initial state', function () {
            expect(analyzerRecognitionInput).to.be.an('object');
            expect(analyzerRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
            expect(analyzerRecognitionInput).to.be.an.instanceof(MyScript.AnalyzerRecognitionInput);
        });

    });

    describe('Accessors', function () {

        var analyzerRecognitionInput;
        before(function (done) {
            analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
            done();
        });

        it('parameter getter', function () {
            expect(analyzerRecognitionInput.getParameters()).to.be.undefined;
        });

        it('parameter setter', function () {
            expect(analyzerRecognitionInput.getParameters()).to.be.undefined;
            analyzerRecognitionInput.setParameters(new MyScript.AnalyzerParameter());
            expect(analyzerRecognitionInput.getParameters()).not.to.be.undefined;
        });

        it('components getter', function () {
            expect(analyzerRecognitionInput.getComponents()).to.be.undefined;
        });

        it('components setter', function () {
            expect(analyzerRecognitionInput.getComponents()).to.be.undefined;
            analyzerRecognitionInput.setComponents(new MyScript.AbstractComponent());
            expect(analyzerRecognitionInput.getComponents()).not.to.be.undefined;
        });

    });
});