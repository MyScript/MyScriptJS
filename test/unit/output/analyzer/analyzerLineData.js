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

        it('Get P1', function () {
            expect(analyzerLineData.getP1()).to.be.undefined;
        });

        it('Get P2', function () {
            expect(analyzerLineData.getP2()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerLineData;
        before(function (done) {
            analyzerLineData = new MyScript.AnalyzerLineData({
                p1: {
                    x: 0,
                    y: 1
                },
                p2: {
                    x: 2,
                    y: 3
                }
            });
            done();
        });

        it('Check initial state', function () {
            expect(analyzerLineData).to.be.an('object');
            expect(analyzerLineData).to.be.an.instanceOf(MyScript.AnalyzerLineData);
        });

        it('Get P1', function () {
            expect(analyzerLineData.getP1()).to.be.an.instanceOf(MyScript.Point);
        });

        it('Get P2', function () {
            expect(analyzerLineData.getP2()).to.be.an.instanceOf(MyScript.Point);
        });

    });

});