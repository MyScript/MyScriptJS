'use strict';

describe('MyScriptJS: output/analyzer/analyzerResult.js', function () {

    it('AnalyzerResult object exist', function () {
        expect(MyScript.AnalyzerResult).to.exist;
        expect(MyScript.AnalyzerResult).not.to.be.null;
        expect(MyScript.AnalyzerResult).to.not.be.undefined;
    });

    it('AnalyzerResult constructor', function () {
        var analyzerResult = new MyScript.AnalyzerResult();
        expect(analyzerResult).to.be.an('object');
        expect(analyzerResult).to.be.an.instanceof(MyScript.AbstractResult);
        expect(analyzerResult).to.be.an.instanceof(MyScript.AnalyzerResult);
    });

    it('AnalyzerResult Analyze Document getter', function () {
        var analyzerResult = new MyScript.AnalyzerResult();
        expect(analyzerResult.getAnalyzerDocument()).to.be.undefined;
    });
});