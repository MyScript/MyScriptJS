'use strict';

describe('MyScriptJS: common/generic/rectangle.js', function () {

    it('Rectangle object exist', function () {
        expect(MyScript.Rectangle).to.exist;
        expect(MyScript.Rectangle).not.to.be.null;
        expect(MyScript.Rectangle).to.not.be.undefined;
    });

});