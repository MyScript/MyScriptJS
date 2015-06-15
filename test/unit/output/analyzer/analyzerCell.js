'use strict';

describe('AnalyzerCell: output/analyzer/analyzerCell.js', function () {

    describe('Default construction', function () {

        var analyzerCell;
        before(function (done) {
            analyzerCell = new MyScript.AnalyzerCell();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerCell).to.be.an('object');
            expect(analyzerCell).to.be.an.instanceOf(MyScript.AnalyzerElement);
            expect(analyzerCell).to.be.an.instanceOf(MyScript.AnalyzerCell);
        });

        it('Get data', function () {
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

        it('Check initial state', function () {
            expect(analyzerCell).to.be.an('object');
            expect(analyzerCell).to.be.an.instanceOf(MyScript.AnalyzerElement);
            expect(analyzerCell).to.be.an.instanceOf(MyScript.AnalyzerCell);
        });

        it('Test AnalyzerCell object construction: AnalyzerCellData construction', function () {
            expect(analyzerCell.getData()).to.be.an.instanceOf(MyScript.AnalyzerCellData);
        });

    });

});