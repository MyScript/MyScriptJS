'use strict';

describe('MyScriptJS: output/analyzer/analyzerLineData.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerLineData object exist', function () {
        expect(MyScript.AnalyzerLineData).to.exist;
        expect(MyScript.AnalyzerLineData).not.to.be.null;
        expect(MyScript.AnalyzerLineData).to.not.be.undefined;
    });

    it('AnalyzerLineData constructor', function () {
        var analyzerLineData = new MyScript.AnalyzerLineData();
        expect(analyzerLineData).to.be.an('object');
        expect(analyzerLineData).to.be.an.instanceof(MyScript.AnalyzerLineData);
    });

    it('AnalyzerLineData P1 getter', function () {
        var analyzerLineData = new MyScript.AnalyzerLineData();
        expect(analyzerLineData.getP1()).to.be.undefined;
    });

    it('AnalyzerLineData P2 getter', function () {
        var analyzerLineData = new MyScript.AnalyzerLineData();
        expect(analyzerLineData.getP2()).to.be.undefined;
    });
});