'use strict';

describe('AnalyzerRecognizer: recognition/analyzerRecognizer.js', function () {

    describe('Default construction', function () {

        var analyzerRecognizer;
        before(function (done) {
            analyzerRecognizer = new MyScript.AnalyzerRecognizer();
            done();
        });

        it('check initial state', function () {
            expect(analyzerRecognizer).to.be.an('object');
            expect(analyzerRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
            expect(analyzerRecognizer).to.be.an.instanceof(MyScript.AnalyzerRecognizer);
        });

    });

    describe('Accessors', function () {

        var analyzerRecognizer, parameters;
        before(function (done) {
            analyzerRecognizer = new MyScript.AnalyzerRecognizer();
            parameters = new MyScript.AnalyzerParameter();
            parameters.getTextParameters().setLanguage('en_US');
            done();
        });

        it('Get parameters', function () {
            expect(analyzerRecognizer.getParameters()).to.be.an.instanceof(MyScript.AnalyzerParameter);
        });

        it('Set parameters', function () {
            analyzerRecognizer.setParameters(parameters);
            expect(analyzerRecognizer.getParameters()).to.be.an.instanceof(MyScript.AnalyzerParameter);
            expect(analyzerRecognizer.getParameters().getTextParameters().getLanguage()).to.equal('en_US');
        });

    });

});