'use strict';

describe('MyScriptJS: output/analyzer/analyzerInkRange.js', function () {

    it('AnalyzerInkRange object exist', function () {
        expect(MyScript.AnalyzerInkRange).to.exist;
        expect(MyScript.AnalyzerInkRange).not.to.be.null;
        expect(MyScript.AnalyzerInkRange).to.not.be.undefined;
    });

    it('AnalyzerInkRange constructor', function () {
        var analyzerInkRange = new MyScript.AnalyzerInkRange();
        expect(analyzerInkRange).to.be.an('object');
        expect(analyzerInkRange).to.be.an.instanceof(MyScript.AnalyzerInkRange);
    });

    it('AnalyzerInkRange First Point getter', function () {
        var analyzerInkRange = new MyScript.AnalyzerInkRange();
        expect(analyzerInkRange.getFirstPoint()).to.be.undefined;
    });

    it('AnalyzerInkRange Last Point getter', function () {
        var analyzerInkRange = new MyScript.AnalyzerInkRange();
        expect(analyzerInkRange.getLastPoint()).to.be.undefined;
    });

    it('AnalyzerInkRange Stroke getter', function () {
        var analyzerInkRange = new MyScript.AnalyzerInkRange();
        expect(analyzerInkRange.getStroke()).to.be.undefined;
    });
});