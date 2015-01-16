'use strict';

describe('MyScriptJS: output/analyzer/analyzerCell.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerCell object exist', function () {
        expect(MyScript.AnalyzerCell).to.exist;
        expect(MyScript.AnalyzerCell).not.to.be.null;
        expect(MyScript.AnalyzerCell).to.not.be.undefined;
    });

    it('AnalyzerCell constructor', function () {
        var analyzerCell = new MyScript.AnalyzerCell();
        expect(analyzerCell).to.be.an('object');
        expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerCell);
    });

    it('AnalyzerCell data getter', function () {
        var analyzerCell = new MyScript.AnalyzerCell();
        expect(analyzerCell.getData()).to.be.undefined;
    });

});