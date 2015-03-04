'use strict';

describe('MyScriptJS: output/analyzer/analyzerTable.js', function () {

    it('AnalyzerTable object exist', function () {
        expect(MyScript.AnalyzerTable).to.exist;
        expect(MyScript.AnalyzerTable).not.to.be.null;
        expect(MyScript.AnalyzerTable).to.not.be.undefined;
    });

    var analyzerTable = new MyScript.AnalyzerTable();
    it('AnalyzerTable constructor', function () {
        expect(analyzerTable).to.be.an('object');
        expect(analyzerTable).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerTable).to.be.an.instanceof(MyScript.AnalyzerTable);
        expect(analyzerTable).to.have.ownProperty('lines');
        expect(analyzerTable).to.have.ownProperty('cells');
        expect(analyzerTable).to.have.ownProperty('inkRanges');
    });

    it('AnalyzerTable Data getter', function () {
        expect(analyzerTable.getData()).to.be.undefined;
    });

    it('AnalyzerTable Lines getter', function () {
        expect(analyzerTable.getLines()).to.be.empty;
    });

    it('AnalyzerTable Cells getter', function () {
        expect(analyzerTable.getCells()).to.be.empty;
    });

    it('AnalyzerTable Ink Ranges getter', function () {
        expect(analyzerTable.getInkRanges()).to.be.empty;
    });

    var obj = {
        data: 'data',
        lines: [{
            type: 'line'
        }],
        cells: [{
            type: 'cell'
        }],
        inkRanges: [{
            type: 'inkRange'
        }]
    };
    var analyzerTable2 = new MyScript.AnalyzerTable(obj);
    it('Test AnalyzerTable object construction: AnalyzerTableData construction', function () {
        expect(analyzerTable2.getData()).to.be.an.instanceof(MyScript.AnalyzerTableData);
    });
    it('Test AnalyzerTable object construction: AnalyzerLine construction', function () {
        expect(analyzerTable2.getLines()[0]).to.be.an.instanceof(MyScript.AnalyzerLine);
    });
    it('Test AnalyzerTable object construction: AnalyzerCell construction', function () {
        expect(analyzerTable2.getCells()[0]).to.be.an.instanceof(MyScript.AnalyzerCell);
    });
    it('Test AnalyzerTable object construction: AnalyzerInkRange construction', function () {
        expect(analyzerTable2.getInkRanges()[0]).to.be.an.instanceof(MyScript.AnalyzerInkRange);
    });

});