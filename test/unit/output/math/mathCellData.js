'use strict';

describe('MyScriptJS: output/math/mathCellData.js', function () {

    it('MathCellData object exist', function () {
        expect(MyScript.MathCellData).to.exist;
        expect(MyScript.MathCellData).not.to.be.null;
        expect(MyScript.MathCellData).to.not.be.undefined;
    });

    var cellData = new MyScript.MathCellData();
    it('MathCellData constructor', function () {
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