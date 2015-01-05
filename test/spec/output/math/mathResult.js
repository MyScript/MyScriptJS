'use strict';

describe('MyScriptJS: output/math/mathResult.js', function () {

    it('MathResult object exist', function () {
        expect(MyScript.MathResult).to.exist;
        expect(MyScript.MathResult).not.to.be.null;
        expect(MyScript.MathResult).to.not.be.undefined;
    });

    it('MathResult constructor', function () {
        var mathResult = new MyScript.MathResult();
        expect(mathResult).to.be.an('object');
        expect(mathResult).to.be.an.instanceof(MyScript.AbstractResult);
        expect(mathResult).to.be.an.instanceof(MyScript.MathResult);
    });

    it('MathResult Candidates getter', function () {
        var mathResult = new MyScript.MathResult();
        expect(mathResult.getMathDocument()).to.be.undefined;
    });
});