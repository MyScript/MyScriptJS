'use strict';

describe('MyScriptJS: input/generic/resetRequestWSMessage.js', function () {

    it('ResetRequestWSMessage object exist', function () {
        expect(MyScript.ResetRequestWSMessage).to.exist;
        expect(MyScript.ResetRequestWSMessage).not.to.be.null;
        expect(MyScript.ResetRequestWSMessage).to.not.be.undefined;
    });

    it('ResetRequestWSMessage constructor', function () {
        var obj = new MyScript.ResetRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.ResetRequestWSMessage);
        expect(obj.getType()).to.equal('reset');
    });

});
