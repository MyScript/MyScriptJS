'use strict';

describe('MyScriptJS: output/analyzer/analyzerCellData.js', function () {

    it('AnalyzerCellData object exist', function () {
        expect(MyScript.AnalyzerCellData).to.exist;
        expect(MyScript.AnalyzerCellData).not.to.be.null;
        expect(MyScript.AnalyzerCellData).to.not.be.undefined;
    });

    var analyzerCellData = new MyScript.AnalyzerCellData();
    it('AnalyzerCellData constructor', function () {
        expect(analyzerCellData).to.be.an('object');
        expect(analyzerCellData).to.be.an.instanceof(MyScript.AnalyzerCellData);
    });

    it('AnalyzerCellData First Column getter', function () {
        expect(analyzerCellData.getFirstColumn()).to.be.undefined;
    });

    it('AnalyzerCellData Last Column getter', function () {
        expect(analyzerCellData.getLastColumn()).to.be.undefined;
    });

    it('AnalyzerCellData First Row getter', function () {
        expect(analyzerCellData.getFirstRow()).to.be.undefined;
    });

    it('AnalyzerCellData Last Row getter', function () {
        expect(analyzerCellData.getLastRow()).to.be.undefined;
    });

    it('AnalyzerCellData Height getter', function () {
        expect(analyzerCellData.getHeight()).to.be.undefined;
    });

    it('AnalyzerCellData Width getter', function () {
        expect(analyzerCellData.getWidth()).to.be.undefined;
    });

    it('AnalyzerCellData Orientation getter', function () {
        expect(analyzerCellData.getOrientation()).to.be.undefined;
    });

    it('AnalyzerCellData Top Left Point getter', function () {
        expect(analyzerCellData.getTopLeftPoint()).to.be.undefined;
    });

    it('AnalyzerCellData Has Top Border getter', function () {
        expect(analyzerCellData.hasTopBorder()).to.be.undefined;
    });

    it('AnalyzerCellData Has Bottom Border getter', function () {
        expect(analyzerCellData.hasBottomBorder()).to.be.undefined;
    });

    it('AnalyzerCellData Has Left Border getter', function () {
        expect(analyzerCellData.hasLeftBorder()).to.be.undefined;
    });

    it('AnalyzerCellData Has Right Border getter', function () {
        expect(analyzerCellData.hasRightBorder()).to.be.undefined;
    });

    var obj = {
        topLeftPoint: {
            x: 0,
            y: 0
        },
        height: 1,
        width: 1
    };
    var analyzerCellData2 = new MyScript.AnalyzerCellData(obj);
    it('Get top left point', function () {
        expect(analyzerCellData2.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
    });
    it('Get bounding box', function () {
        expect(analyzerCellData2.getBoundingBox()).to.be.an.instanceof(MyScript.Rectangle);
    });
});