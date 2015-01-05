'use strict';

describe('MyScriptJS: output/analyzer/analyzerRecognizedStroke.js', function () {

    it('AnalyzerRecognizedStroke object exist', function () {
        expect(MyScript.AnalyzerRecognizedStroke).to.exist;
        expect(MyScript.AnalyzerRecognizedStroke).not.to.be.null;
        expect(MyScript.AnalyzerRecognizedStroke).to.not.be.undefined;
    });

    it('AnalyzerRecognizedStroke constructor', function () {
        var AnalyzerRecognizedStroke = new MyScript.AnalyzerRecognizedStroke();
        expect(AnalyzerRecognizedStroke).to.be.an('object');
        expect(AnalyzerRecognizedStroke).to.be.an.instanceof(MyScript.AnalyzerRecognizedStroke);
    });

    it('AnalyzerRecognizedStroke Type getter', function () {
        var analyzerRecognizedStroke = new MyScript.AnalyzerRecognizedStroke();
        expect(analyzerRecognizedStroke.getType()).to.be.undefined;
    });

    it('AnalyzerRecognizedStroke X getter', function () {
        var analyzerRecognizedStroke = new MyScript.AnalyzerRecognizedStroke();
        expect(analyzerRecognizedStroke.getX()).to.be.undefined;
    });

    it('AnalyzerRecognizedStroke Y getter', function () {
        var analyzerRecognizedStroke = new MyScript.AnalyzerRecognizedStroke();
        expect(analyzerRecognizedStroke.getY()).to.be.undefined;
    });
});