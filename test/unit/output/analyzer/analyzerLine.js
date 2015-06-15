'use strict';

describe('AnalyzerLine: output/analyzer/analyzerLine.js', function () {

    describe('Default construction', function () {

        var analyzerLine;
        before(function (done) {
            analyzerLine = new MyScript.AnalyzerLine();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerLine).to.be.an('object');
            expect(analyzerLine).to.be.an.instanceOf(MyScript.AnalyzerElement);
            expect(analyzerLine).to.be.an.instanceOf(MyScript.AnalyzerLine);
        });

        it('Data getter', function () {
            expect(analyzerLine.getData()).to.be.undefined;
        });

    });

});