'use strict';

describe('AnalyzerTableData: output/analyzer/analyzerTableData.js', function () {

    describe('Default construction', function () {

        var analyzerTableData;
        before(function (done) {
            analyzerTableData = new MyScript.AnalyzerTableData();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerTableData).to.be.an('object');
            expect(analyzerTableData).to.be.an.instanceOf(MyScript.AnalyzerTableData);
        });

        it('Column Count getter', function () {
            expect(analyzerTableData.getColumnCount()).to.be.undefined;
        });

        it('Row Count getter', function () {
            expect(analyzerTableData.getRowCount()).to.be.undefined;
        });

    });

});