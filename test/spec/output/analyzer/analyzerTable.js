'use strict';

describe('MyScriptJS: output/analyzer/analyzerTable.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerTable object exist', function () {
        expect(MyScript.AnalyzerTable).to.exist;
        expect(MyScript.AnalyzerTable).not.to.be.null;
        expect(MyScript.AnalyzerTable).to.not.be.undefined;
    });

    it('AnalyzerTable constructor', function () {
        var analyzerTable = new MyScript.AnalyzerTable();
        expect(analyzerTable).to.be.an('object');
        expect(analyzerTable).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerTable).to.be.an.instanceof(MyScript.AnalyzerTable);
        expect(analyzerTable).to.have.ownProperty('lines');
        expect(analyzerTable).to.have.ownProperty('cells');
        expect(analyzerTable).to.have.ownProperty('inkRanges');
    });

    it('AnalyzerTable Data getter', function () {
        var analyzerTable = new MyScript.AnalyzerTable();
        expect(analyzerTable.getData()).to.be.undefined;
    });

    it('AnalyzerTable Lines getter', function () {
        var analyzerTable = new MyScript.AnalyzerTable();
        expect(analyzerTable.getLines()).to.be.empty;
    });

    it('AnalyzerTable Cells getter', function () {
        var analyzerTable = new MyScript.AnalyzerTable();
        expect(analyzerTable.getCells()).to.be.empty;
    });

    it('AnalyzerTable Ink Ranges getter', function () {
        var analyzerTable = new MyScript.AnalyzerTable();
        expect(analyzerTable.getInkRanges()).to.be.empty;
    });

});