'use strict';

describe('AnalyzerTable: output/analyzer/analyzerTable.js', function () {

    describe('Default construction', function () {

        var analyzerTable;
        before(function (done) {
            analyzerTable = new MyScript.AnalyzerTable();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerTable).to.be.an('object');
            expect(analyzerTable).to.be.an.instanceOf(MyScript.AnalyzerElement);
            expect(analyzerTable).to.be.an.instanceOf(MyScript.AnalyzerTable);
            expect(analyzerTable).to.have.ownProperty('lines');
            expect(analyzerTable).to.have.ownProperty('cells');
            expect(analyzerTable).to.have.ownProperty('inkRanges');
        });

        it('Data getter', function () {
            expect(analyzerTable.getData()).to.be.undefined;
        });

        it('Lines getter', function () {
            expect(analyzerTable.getLines()).to.be.empty;
        });

        it('Cells getter', function () {
            expect(analyzerTable.getCells()).to.be.empty;
        });

        it('Ink Ranges getter', function () {
            expect(analyzerTable.getInkRanges()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var analyzerTable;
        before(function (done) {
            analyzerTable = new MyScript.AnalyzerTable({
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
            });
            done();
        });

        it('Test AnalyzerTable object construction: AnalyzerTableData construction', function () {
            expect(analyzerTable.getData()).to.be.an.instanceOf(MyScript.AnalyzerTableData);
        });

        it('Test AnalyzerTable object construction: AnalyzerLine construction', function () {
            expect(analyzerTable.getLines()[0]).to.be.an.instanceOf(MyScript.AnalyzerLine);
        });

        it('Test AnalyzerTable object construction: AnalyzerCell construction', function () {
            expect(analyzerTable.getCells()[0]).to.be.an.instanceOf(MyScript.AnalyzerCell);
        });

        it('Test AnalyzerTable object construction: AnalyzerInkRange construction', function () {
            expect(analyzerTable.getInkRanges()[0]).to.be.an.instanceOf(MyScript.AnalyzerInkRange);
        });

    });

});