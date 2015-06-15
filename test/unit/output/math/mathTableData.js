'use strict';

describe('MathTableData: output/math/mathTableData.js', function () {

    describe('Default construction', function () {

        var tableData;
        before(function (done) {
            tableData = new MyScript.MathTableData();
            done();
        });

        it('Check initial state', function () {
            expect(tableData).to.be.an('object');
            expect(tableData).to.be.an.instanceOf(MyScript.MathTableData);
        });

        it('Get column count', function () {
            expect(tableData.getColumnCount()).to.be.undefined;
        });

        it('Get row count', function () {
            expect(tableData.getRowCount()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var tableData;
        before(function (done) {
            tableData = new MyScript.MathTableData({
                columnCount: 0,
                rowCount: 1
            });
            done();
        });

        it('Check initial state', function () {
            expect(tableData).to.be.an('object');
            expect(tableData).to.be.an.instanceOf(MyScript.MathTableData);
        });

        it('Get column count', function () {
            expect(tableData.getColumnCount()).to.equal(0);
        });

        it('Get row count', function () {
            expect(tableData.getRowCount()).to.equal(1);
        });

    });

});