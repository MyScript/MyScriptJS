'use strict';

describe('MyScriptJS: output/analyzer/analyzerTextLineData.js', function () {

    it('AnalyzerTextLineData object exist', function () {
        expect(MyScript.AnalyzerTextLineData).to.exist;
        expect(MyScript.AnalyzerTextLineData).not.to.be.null;
        expect(MyScript.AnalyzerTextLineData).to.not.be.undefined;
    });

    it('AnalyzerTextLineData constructor', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData).to.be.an('object');
        expect(analyzerTextLineData).to.be.an.instanceof(MyScript.AnalyzerTextLineData);
    });

    it('AnalyzerTextLineData Baseline Pos getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getBaselinePos()).to.be.undefined;
    });

    it('AnalyzerTextLineData To Midline getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getToMidline()).to.be.undefined;
    });

    it('AnalyzerTextLineData To Orientation getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getOrientation()).to.be.undefined;
    });

    it('AnalyzerTextLineData Top Left Point getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getTopLeftPoint()).to.be.undefined;
    });

    it('AnalyzerTextLineData Text Height getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getTextHeight()).to.be.undefined;
    });

    it('AnalyzerTextLineData Justification Type getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getJustificationType()).to.be.undefined;
    });

    it('AnalyzerTextLineData Height getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getHeight()).to.be.undefined;
    });

    it('AnalyzerTextLineData Width getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getWidth()).to.be.undefined;
    });

    it('AnalyzerTextLineData Bounding Box getter', function () {
        var analyzerTextLineData = new MyScript.AnalyzerTextLineData();
        expect(analyzerTextLineData.getBoundingBox()).not.to.be.undefined;
    });

});