'use strict';

describe('MyScriptJS: common/mathUtils.js', function () {

    it('MathUtils static object exist', function () {
        expect(MyScript.MathUtils).to.exist;
        expect(MyScript.MathUtils).not.to.be.null;
        expect(MyScript.MathUtils).to.not.be.undefined;
    });

});