'use strict';

describe('MyScriptJS: output/analyzer/analyzerStrokeType.js', function () {

    it('AnalyzerStrokeType object exist', function () {
        expect(MyScript.AnalyzerStrokeType).to.exist;
        expect(MyScript.AnalyzerStrokeType).not.to.be.null;
        expect(MyScript.AnalyzerStrokeType).to.not.be.undefined;
    });

    var analyzerStrokeType = new MyScript.AnalyzerStrokeType();
    it('AnalyzerStrokeType constructor', function () {
        expect(analyzerStrokeType).to.be.an('object');
        expect(analyzerStrokeType).to.be.an.instanceof(MyScript.AnalyzerStrokeType);
    });

    it('AnalyzerGroup Ink Range getter', function () {
        expect(analyzerStrokeType.getInkRange()).to.be.undefined;
    });

    it('AnalyzerStrokeType Type getter', function () {
        expect(analyzerStrokeType.getType()).to.be.undefined;
    });

    var obj = {
        type: 'test',
        inkRange: [0, 1]
    };
    var analyzerStrokeType2 = new MyScript.AnalyzerStrokeType(obj);
    it('Test AnalyzerStrokeType object construction', function () {
        expect(analyzerStrokeType2.getType()).to.not.be.undefined;
    });
    it('Test AnalyzerStrokeType object construction: AnalyzerInkRange construction', function () {
        expect(analyzerStrokeType2.getInkRange()).to.be.an.instanceof(MyScript.AnalyzerInkRange);
    });
});