'use strict';

describe('MyScriptJS: output/math/mathTableData.js', function () {

    it('MathTableData object exist', function () {
        expect(MyScript.MathTableData).to.exist;
        expect(MyScript.MathTableData).not.to.be.null;
        expect(MyScript.MathTableData).to.not.be.undefined;
    });

    var tableData = new MyScript.MathTableData();
    it('MathTableData constructor', function () {
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