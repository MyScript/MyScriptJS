'use strict';

describe('MyScriptJS: output/analyzer/analyzerRecognizedStroke.js', function () {

    it('AnalyzerRecognizedStroke object exist', function () {
        expect(MyScript.AnalyzerRecognizedStroke).to.exist;
        expect(MyScript.AnalyzerRecognizedStroke).not.to.be.null;
        expect(MyScript.AnalyzerRecognizedStroke).to.not.be.undefined;
    });

    var analyzerRecognizedStroke = new MyScript.AnalyzerRecognizedStroke();
    it('AnalyzerRecognizedStroke constructor', function () {
        expect(analyzerRecognizedStroke).to.be.an('object');
        expect(analyzerRecognizedStroke).to.be.an.instanceof(MyScript.AnalyzerRecognizedStroke);
    });

    it('AnalyzerRecognizedStroke Type getter', function () {
        expect(analyzerRecognizedStroke.getType()).to.be.undefined;
    });

    it('AnalyzerRecognizedStroke X getter', function () {
        expect(analyzerRecognizedStroke.getX()).to.be.undefined;
    });

    it('AnalyzerRecognizedStroke Y getter', function () {
        expect(analyzerRecognizedStroke.getY()).to.be.undefined;
    });

    var obj = {
        type: 'test',
        x: [0, 1],
        y: [0, 1]
    };
    var analyzerRecognizedStroke2 = new MyScript.AnalyzerRecognizedStroke(obj);
    it('Test AnalyzerRecognizedStroke object construction', function () {
        expect(analyzerRecognizedStroke2.getType()).to.not.be.undefined;
        expect(analyzerRecognizedStroke2.getX()).to.not.be.undefined;
        expect(analyzerRecognizedStroke2.getY()).to.not.be.undefined;
    });
});