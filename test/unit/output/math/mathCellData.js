'use strict';

describe('MathCellData: output/math/mathCellData.js', function () {

    describe('Default construction', function () {

        var cellData;
        before(function (done) {
            cellData = new MyScript.MathCellData();
            done();
        });

        it('Check initial state', function () {
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

    describe('JSON construction', function () {

        var cellData;
        before(function (done) {
            cellData = new MyScript.MathCellData({
                columnStart: 0,
                columnStop: 1,
                rowStart: 2,
                rowStop: 3
            });
            done();
        });

        it('Check initial state', function () {
            expect(cellData).to.be.an('object');
            expect(cellData).to.be.an.instanceof(MyScript.MathCellData);
        });

        it('Get column start', function () {
            expect(cellData.getColumnStart()).to.equal(0);
        });

        it('Get column stop', function () {
            expect(cellData.getColumnStop()).to.equal(1);
        });

        it('Get row start', function () {
            expect(cellData.getRowStart()).to.equal(2);
        });

        it('Get row stop', function () {
            expect(cellData.getRowStop()).to.equal(3);
        });

    });

});