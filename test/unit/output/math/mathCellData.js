'use strict';

describe('MathCellData: output/math/mathCellData.js', function () {

    describe('Default construction', function () {

        var cellData;
        before(function (done) {
            cellData = new MyScript.MathCellData();
            done();
        });

        it('check initial state', function () {
            expect(cellData).to.be.an('object');
            expect(cellData).to.be.an.instanceof(MyScript.MathCellData);
        });

        it('Get column start', function () {
            expect(cellData.getColumnStart()).to.be.undefined;
        });

        it('Get column stop', function () {
            expect(cellData.getColumnStop()).to.be.undefined;
        });

        it('Get row start', function () {
            expect(cellData.getRowStart()).to.be.undefined;
        });

        it('Get row stop', function () {
            expect(cellData.getRowStop()).to.be.undefined;
        });

    });

});