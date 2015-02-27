'use strict';

describe('MyScriptJS: output/analyzer/analyzerCellData.js', function () {

    it('AnalyzerCellData object exist', function () {
        expect(MyScript.AnalyzerCellData).to.exist;
        expect(MyScript.AnalyzerCellData).not.to.be.null;
        expect(MyScript.AnalyzerCellData).to.not.be.undefined;
    });

    it('AnalyzerCellData constructor', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData).to.be.an('object');
        expect(analyzerCellData).to.be.an.instanceof(MyScript.AnalyzerCellData);
    });

    it('AnalyzerCellData First Column getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getFirstColumn()).to.be.undefined;
    });

    it('AnalyzerCellData Last Column getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getLastColumn()).to.be.undefined;
    });

    it('AnalyzerCellData First Row getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getFirstRow()).to.be.undefined;
    });

    it('AnalyzerCellData Last Row getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getLastRow()).to.be.undefined;
    });

    it('AnalyzerCellData Height getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getHeight()).to.be.undefined;
    });

    it('AnalyzerCellData Width getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getWidth()).to.be.undefined;
    });

    it('AnalyzerCellData Orientation getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getOrientation()).to.be.undefined;
    });

    it('AnalyzerCellData Top Left Point getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.getTopLeftPoint()).to.be.undefined;
    });

    it('AnalyzerCellData Has Top Border getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.hasTopBorder()).to.be.undefined;
    });

    it('AnalyzerCellData Has Bottom Border getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.hasBottomBorder()).to.be.undefined;
    });

    it('AnalyzerCellData Has Left Border getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.hasLeftBorder()).to.be.undefined;
    });

    it('AnalyzerCellData Has Right Border getter', function () {
        var analyzerCellData = new MyScript.AnalyzerCellData();
        expect(analyzerCellData.hasRightBorder()).to.be.undefined;
    });
});