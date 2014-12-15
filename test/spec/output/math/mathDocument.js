'use strict';

describe('MyScriptJS: output/math/mathDocument.js', function () {

    it('MathDocument object exist', function () {
        expect(MyScript.MathDocument).to.exist;
        expect(MyScript.MathDocument).not.to.be.null;
        expect(MyScript.MathDocument).to.not.be.undefined;
    });

});