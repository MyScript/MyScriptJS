'use strict';

describe('MyScriptJS: output/analyzer/analyzerUnderlineData.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerUnderlineData object exist', function () {
        expect(MyScript.AnalyzerUnderlineData).to.exist;
        expect(MyScript.AnalyzerUnderlineData).not.to.be.null;
        expect(MyScript.AnalyzerUnderlineData).to.not.be.undefined;
    });

    it('AnalyzerUnderlineData constructor', function () {
        var analyzerUnderlineData = new MyScript.AnalyzerUnderlineData();
        expect(analyzerUnderlineData).to.be.an('object');
        expect(analyzerUnderlineData).to.be.an.instanceof(MyScript.AnalyzerUnderlineData);
    });

    it('AnalyzerUnderlineData First Character getter', function () {
        var analyzerUnderlineData = new MyScript.AnalyzerUnderlineData();
        expect(analyzerUnderlineData.getFirstCharacter()).to.be.undefined;
    });

    it('AnalyzerUnderlineData Last Character Ranges getter', function () {
        var analyzerUnderlineData = new MyScript.AnalyzerUnderlineData();
        expect(analyzerUnderlineData.getLastCharacter()).to.be.empty;
    });
});