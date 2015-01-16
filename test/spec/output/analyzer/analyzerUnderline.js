'use strict';

describe('MyScriptJS: output/analyzer/analyzerUnderline.js', function () {

    it('AnalyzerUnderline object exist', function () {
        expect(MyScript.AnalyzerUnderline).to.exist;
        expect(MyScript.AnalyzerUnderline).not.to.be.null;
        expect(MyScript.AnalyzerTextLineData).to.not.be.undefined;
    });

    it('AnalyzerUnderline constructor', function () {
        var analyzerUnderline = new MyScript.AnalyzerUnderline();
        expect(analyzerUnderline).to.be.an('object');
        expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerUnderline);
        expect(analyzerUnderline).to.have.ownProperty('inkRanges');
    });

    it('AnalyzerUnderline Data getter', function () {
        var analyzerUnderline = new MyScript.AnalyzerUnderline();
        expect(analyzerUnderline.getData()).to.be.undefined;
    });

    it('AnalyzerUnderline Ink Ranges getter', function () {
        var analyzerUnderline = new MyScript.AnalyzerUnderline();
        expect(analyzerUnderline.getInkRanges()).to.be.empty;
    });

});