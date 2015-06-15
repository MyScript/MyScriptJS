'use strict';

describe('AnalyzerLineData: output/analyzer/analyzerLineData.js', function () {

    describe('Default construction', function () {

        var analyzerLineData;
        before(function (done) {
            analyzerLineData = new MyScript.AnalyzerLineData();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerLineData).to.be.an('object');
            expect(analyzerLineData).to.be.an.instanceOf(MyScript.AnalyzerLineData);
        });

        it('P1 getter', function () {
            expect(analyzerLineData.getP1()).to.be.undefined;
        });

        it('P2 getter', function () {
            expect(analyzerLineData.getP2()).to.be.undefined;
        });

    });

});