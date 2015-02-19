'use strict';

describe('MyScriptJS: common/abstractWSMessage.js', function () {

    it('AbstractWSMessage static object exist', function () {
        expect(MyScript.AbstractWSMessage).to.exist;
        expect(MyScript.AbstractWSMessage).not.to.be.null;
        expect(MyScript.AbstractWSMessage).to.not.be.undefined;
    });

    it('AbstractWSMessage constructor', function () {
        var mathUtils = new MyScript.AbstractWSMessage();
        expect(mathUtils).to.be.an('object');
        expect(mathUtils).to.be.an.instanceof(MyScript.AbstractWSMessage);
    });
});