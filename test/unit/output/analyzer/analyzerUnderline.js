'use strict';

describe('MyScriptJS: output/analyzer/analyzerUnderline.js', function () {

    it('AnalyzerUnderline object exist', function () {
        expect(MyScript.AnalyzerUnderline).to.exist;
        expect(MyScript.AnalyzerUnderline).not.to.be.null;
        expect(MyScript.AnalyzerTextLineData).to.not.be.undefined;
    });

    var analyzerUnderline = new MyScript.AnalyzerUnderline();
    it('AnalyzerUnderline constructor', function () {
        expect(analyzerUnderline).to.be.an('object');
        expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerUnderline);
        expect(analyzerUnderline).to.have.ownProperty('inkRanges');
    });

    it('AnalyzerUnderline Data getter', function () {
        expect(analyzerUnderline.getData()).to.be.undefined;
    });

    it('AnalyzerUnderline Ink Ranges getter', function () {
        expect(analyzerUnderline.getInkRanges()).to.be.empty;
    });

    var obj = {
        data: 'data',
        inkRanges: [{
            type: 'inkRange'
        }]
    };
    var analyzerUnderline2 = new MyScript.AnalyzerUnderline(obj);
    it('Test AnalyzerUnderline object construction: AnalyzerUnderlineData construction', function () {
        expect(analyzerUnderline2.getData()).to.be.an.instanceof(MyScript.AnalyzerUnderlineData);
    });
    it('Test AnalyzerUnderline object construction: AnalyzerInkRange construction', function () {
        expect(analyzerUnderline2.getInkRanges()[0]).to.be.an.instanceof(MyScript.AnalyzerInkRange);
    });

});