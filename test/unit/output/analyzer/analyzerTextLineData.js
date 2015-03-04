'use strict';

describe('MyScriptJS: output/analyzer/analyzerTextLineData.js', function () {

    it('AnalyzerTextLineData object exist', function () {
        expect(MyScript.AnalyzerTextLineData).to.exist;
        expect(MyScript.AnalyzerTextLineData).not.to.be.null;
        expect(MyScript.AnalyzerTextLineData).to.not.be.undefined;
    });

    var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
    it('AnalyzerTextLineData constructor', function () {
        expect(analyzerTextLineData).to.be.an('object');
        expect(analyzerTextLineData).to.be.an.instanceof(MyScript.AnalyzerTextLineData);
    });

    it('AnalyzerTextLineData Baseline Pos getter', function () {
        expect(analyzerTextLineData.getBaselinePos()).to.be.undefined;
    });

    it('AnalyzerTextLineData To Midline getter', function () {
        expect(analyzerTextLineData.getToMidline()).to.be.undefined;
    });

    it('AnalyzerTextLineData To Orientation getter', function () {
        expect(analyzerTextLineData.getOrientation()).to.be.undefined;
    });

    it('AnalyzerTextLineData Top Left Point getter', function () {
        expect(analyzerTextLineData.getTopLeftPoint()).to.be.undefined;
    });

    it('AnalyzerTextLineData Text Height getter', function () {
        expect(analyzerTextLineData.getTextHeight()).to.be.undefined;
    });

    it('AnalyzerTextLineData Justification Type getter', function () {
        expect(analyzerTextLineData.getJustificationType()).to.be.undefined;
    });

    it('AnalyzerTextLineData Height getter', function () {
        expect(analyzerTextLineData.getHeight()).to.be.undefined;
    });

    it('AnalyzerTextLineData Width getter', function () {
        expect(analyzerTextLineData.getWidth()).to.be.undefined;
    });

    it('AnalyzerTextLineData Bounding Box getter', function () {
        expect(analyzerTextLineData.getBoundingBox()).not.to.be.undefined;
    });

    var obj = {
        topLeftPoint: {
            x: 0,
            y: 0
        },
        height: 1,
        width: 1
    };
    var analyzerTextLineData2 = new MyScript.AnalyzerTextLineData(obj);
    it('Get top left point', function () {
        expect(analyzerTextLineData2.getTopLeftPoint()).to.be.an.instanceof(MyScript.AnalyzerPointData);
    });
    it('Get bounding box', function () {
        expect(analyzerTextLineData2.getBoundingBox()).to.be.an.instanceof(MyScript.Rectangle);
    });

});