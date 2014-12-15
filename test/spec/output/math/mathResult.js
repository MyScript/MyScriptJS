'use strict';

describe('MyScriptJS: output/math/mathResult.js', function () {

    it('MathResult object exist', function () {
        expect(MyScript.MathResult).to.exist;
        expect(MyScript.MathResult).not.to.be.null;
        expect(MyScript.MathResult).to.not.be.undefined;
    });

});