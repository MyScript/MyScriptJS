'use strict';

describe('MyScriptJS: output/math/mathBorderData.js', function () {

    it('MathBorderData object exist', function () {
        expect(MyScript.MathBorderData).to.exist;
        expect(MyScript.MathBorderData).not.to.be.null;
        expect(MyScript.MathBorderData).to.not.be.undefined;
    });

    var borderData = new MyScript.MathBorderData();
    it('MathBorderData constructor', function () {
        expect(borderData).to.be.an('object');
        expect(borderData).to.be.an.instanceof(MyScript.MathBorderData);
    });

    it('Get position', function () {
        expect(borderData.getPosition()).to.be.undefined;
    });

    it('Get start', function () {
        expect(borderData.getStart()).to.be.undefined;
    });

    it('Get stop', function () {
        expect(borderData.getStop()).to.be.undefined;
    });

    it('Get type', function () {
        expect(borderData.getType()).to.be.undefined;
    });
});