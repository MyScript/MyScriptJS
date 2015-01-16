'use strict';

describe('MyScriptJS: output/analyzer/analyzerStrokeType.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerStrokeType object exist', function () {
        expect(MyScript.AnalyzerStrokeType).to.exist;
        expect(MyScript.AnalyzerStrokeType).not.to.be.null;
        expect(MyScript.AnalyzerStrokeType).to.not.be.undefined;
    });

    it('AnalyzerStrokeType constructor', function () {
        var analyzerStrokeType = new MyScript.AnalyzerStrokeType();
        expect(analyzerStrokeType).to.be.an('object');
        expect(analyzerStrokeType).to.be.an.instanceof(MyScript.AnalyzerStrokeType);
    });

    it('AnalyzerGroup Ink Range getter', function () {
        var analyzerStrokeType = new MyScript.AnalyzerStrokeType();
        expect(analyzerStrokeType.getInkRange()).to.be.undefined;
    });

    it('AnalyzerStrokeType Type getter', function () {
        var analyzerStrokeType = new MyScript.AnalyzerStrokeType();
        expect(analyzerStrokeType.getType()).to.be.undefined;
    });
});