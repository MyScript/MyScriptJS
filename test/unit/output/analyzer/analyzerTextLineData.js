'use strict';

describe('AnalyzerTextLineData: output/analyzer/analyzerTextLineData.js', function () {

    describe('Default construction', function () {

        var analyzerTextLineData;
        before(function (done) {
            analyzerTextLineData = new MyScript.AnalyzerTextLineData();
            done();
        });

        it('check initial state', function () {
            expect(analyzerTextLineData).to.be.an('object');
            expect(analyzerTextLineData).to.be.an.instanceof(MyScript.AnalyzerTextLineData);
        });

        it('Baseline Pos getter', function () {
            expect(analyzerTextLineData.getBaselinePos()).to.be.undefined;
        });

        it('To Midline getter', function () {
            expect(analyzerTextLineData.getToMidline()).to.be.undefined;
        });

        it('To Orientation getter', function () {
            expect(analyzerTextLineData.getOrientation()).to.be.undefined;
        });

        it('Top Left Point getter', function () {
            expect(analyzerTextLineData.getTopLeftPoint()).to.be.undefined;
        });

        it('Text Height getter', function () {
            expect(analyzerTextLineData.getTextHeight()).to.be.undefined;
        });

        it('Justification Type getter', function () {
            expect(analyzerTextLineData.getJustificationType()).to.be.undefined;
        });

        it('Height getter', function () {
            expect(analyzerTextLineData.getHeight()).to.be.undefined;
        });

        it('Width getter', function () {
            expect(analyzerTextLineData.getWidth()).to.be.undefined;
        });

        it('Bounding Box getter', function () {
            expect(analyzerTextLineData.getBoundingBox()).not.to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerTextLineData;
        before(function (done) {
            analyzerTextLineData = new MyScript.AnalyzerTextLineData({
                topLeftPoint: {
                    x: 0,
                    y: 0
                },
                height: 1,
                width: 1
            });
            done();
        });

        it('check initial state', function () {
            expect(analyzerTextLineData).to.be.an('object');
            expect(analyzerTextLineData).to.be.an.instanceof(MyScript.AnalyzerTextLineData);
        });

        it('Get top left point', function () {
            expect(analyzerTextLineData.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
        });
        it('Get bounding box', function () {
            expect(analyzerTextLineData.getBoundingBox()).to.be.an.instanceof(MyScript.Rectangle);
        });

    });

});