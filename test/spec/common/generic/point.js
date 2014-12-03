'use strict';

describe('MyScriptJS: common/generic/point.js', function () {

    it('Point object exist', function () {
        expect(MyScript.Point).to.exist;
        expect(MyScript.Point).not.to.be.null;
        expect(MyScript.Point).to.not.be.undefined;
    });

});