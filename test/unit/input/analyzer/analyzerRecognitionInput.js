'use strict';

describe('AnalyzerRecognitionInput: input/analyzer/analyzerRecognitionInput.js', function () {

    describe('Default construction', function () {

        var analyzerRecognitionInput;
        before(function (done) {
            analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerRecognitionInput).to.be.an('object');
            expect(analyzerRecognitionInput).to.be.an.instanceOf(MyScript.AbstractRecognitionInput);
            expect(analyzerRecognitionInput).to.be.an.instanceOf(MyScript.AnalyzerRecognitionInput);
        });

        it('Get parameter', function () {
            expect(analyzerRecognitionInput.getParameters()).to.be.undefined;
        });

        it('Set parameter', function () {
            analyzerRecognitionInput.setParameters(new MyScript.AnalyzerParameter());
            expect(analyzerRecognitionInput.getParameters()).not.to.be.undefined;
        });

        it('Get components', function () {
            expect(analyzerRecognitionInput.getComponents()).to.be.undefined;
        });

        it('Set components', function () {
            analyzerRecognitionInput.setComponents(new MyScript.AbstractComponent());
            expect(analyzerRecognitionInput.getComponents()).not.to.be.undefined;
        });

    });

});