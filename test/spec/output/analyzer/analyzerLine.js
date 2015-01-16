'use strict';

describe('MyScriptJS: output/analyzer/analyzerLine.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerLine object exist', function () {
        expect(MyScript.AnalyzerLine).to.exist;
        expect(MyScript.AnalyzerLine).not.to.be.null;
        expect(MyScript.AnalyzerLine).to.not.be.undefined;
    });

    it('AnalyzerLine constructor', function () {
        var analyzerLine = new MyScript.AnalyzerLine();
        expect(analyzerLine).to.be.an('object');
        expect(analyzerLine).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerLine).to.be.an.instanceof(MyScript.AnalyzerLine);
    });

    it('AnalyzerLine Data getter', function () {
        var analyzerLine = new MyScript.AnalyzerLine();
        expect(analyzerLine.getData()).to.be.undefined;
    });
});