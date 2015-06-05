'use strict';

describe('MathTableData: output/math/mathTableData.js', function () {

    describe('Default construction', function () {

        var tableData;
        before(function (done) {
            tableData = new MyScript.MathTableData();
            done();
        });

        it('check initial state', function () {
            expect(tableData).to.be.an('object');
            expect(tableData).to.be.an.instanceof(MyScript.MathTableData);
        });

        it('Get column count', function () {
            expect(tableData.getColumnCount()).to.be.undefined;
        });

        it('Get row count', function () {
            expect(tableData.getRowCount()).to.be.undefined;
        });

    });

});