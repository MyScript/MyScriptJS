'use strict';

describe('MyScriptJS: output/analyzer/analyzerTableData.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerTableData object exist', function () {
        expect(MyScript.AnalyzerTableData).to.exist;
        expect(MyScript.AnalyzerTableData).not.to.be.null;
        expect(MyScript.AnalyzerTableData).to.not.be.undefined;
    });

    it('AnalyzerTableData constructor', function () {
        var analyzerTableData = new MyScript.AnalyzerTableData();
        expect(analyzerTableData).to.be.an('object');
        expect(analyzerTableData).to.be.an.instanceof(MyScript.AnalyzerTableData);
    });

    it('AnalyzerTableData Column Count getter', function () {
        var analyzerTableData = new MyScript.AnalyzerTableData();
        expect(analyzerTableData.getColumnCount()).to.be.undefined;
    });

    it('AnalyzerTableData Row Count getter', function () {
        var analyzerTableData = new MyScript.AnalyzerTableData();
        expect(analyzerTableData.getRowCount()).to.be.undefined;
    });

});