'use strict';

describe('AnalyzerRecognizer: recognition/analyzerRecognizer.js', function () {

    describe('Default construction', function () {

        var analyzerRecognizer;
        before(function (done) {
            analyzerRecognizer = new MyScript.AnalyzerRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerRecognizer).to.be.an('object');
            expect(analyzerRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(analyzerRecognizer).to.be.an.instanceOf(MyScript.AnalyzerRecognizer);
        });

        it('Get parameters', function () {
            expect(analyzerRecognizer.getParameters()).to.be.an.instanceOf(MyScript.AnalyzerParameter);
        });

        it('Set parameters', function () {
            var parameters = new MyScript.AnalyzerParameter();
            parameters.getTextParameters().setLanguage('en_US');
            analyzerRecognizer.setParameters(parameters);
            expect(analyzerRecognizer.getParameters()).to.be.an.instanceOf(MyScript.AnalyzerParameter);
            expect(analyzerRecognizer.getParameters().getTextParameters().getLanguage()).to.equal('en_US');
        });

    });

});