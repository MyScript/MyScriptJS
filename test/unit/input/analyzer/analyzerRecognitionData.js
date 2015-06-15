'use strict';

describe('AnalyzerRecognitionData: input/analyzer/analyzerRecognitionData.js', function () {

    describe('Default construction', function () {

        var analyzerRecognitionData;
        before(function (done) {
            analyzerRecognitionData = new MyScript.AnalyzerRecognitionData();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerRecognitionData).to.be.an('object');
            expect(analyzerRecognitionData).to.be.an.instanceOf(MyScript.AbstractRecognitionData);
            expect(analyzerRecognitionData).to.be.an.instanceOf(MyScript.AnalyzerRecognitionData);
        });

        it('Get recognition input', function () {
            expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).to.be.undefined;
        });

        it('Set recognition input', function () {
            analyzerRecognitionData.setAnalyzerRecognitionInput(new MyScript.AnalyzerRecognitionInput());
            expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).not.to.be.undefined;
        });

    });

});