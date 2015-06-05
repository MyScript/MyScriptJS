'use strict';

describe('AnalyzerCell: output/analyzer/analyzerCell.js', function () {

    describe('Default construction', function () {

        var analyzerCell;
        before(function (done) {
            analyzerCell = new MyScript.AnalyzerCell();
            done();
        });

        it('check initial state', function () {
            expect(analyzerCell).to.be.an('object');
            expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerCell);
        });

        it('get data', function () {
            expect(analyzerCell.getData()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerCell;
        before(function (done) {
            analyzerCell = new MyScript.AnalyzerCell({
                data: 'test'
            });
            done();
        });

        it('check initial state', function () {
            expect(analyzerCell).to.be.an('object');
            expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerCell);
        });

        it('Test AnalyzerCell object construction: AnalyzerCellData construction', function () {
            expect(analyzerCell.getData()).to.be.an.instanceof(MyScript.AnalyzerCellData);
        });

    });

});