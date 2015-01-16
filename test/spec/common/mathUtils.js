'use strict';

describe('MyScriptJS: common/mathUtils.js', function () {

    var expect = require('chai').expect;

    it('MathUtils static object exist', function () {
        expect(MyScript.MathUtils).to.exist;
        expect(MyScript.MathUtils).not.to.be.null;
        expect(MyScript.MathUtils).to.not.be.undefined;
    });

});