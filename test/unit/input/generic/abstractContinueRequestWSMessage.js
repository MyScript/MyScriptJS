'use strict';

describe('MyScriptJS: input/generic/abstractContinueRequestWSMessage.js', function () {

    it('AbstractContinueRequestWSMessage object exist', function () {
        expect(MyScript.AbstractContinueRequestWSMessage).to.exist;
        expect(MyScript.AbstractContinueRequestWSMessage).not.to.be.null;
        expect(MyScript.AbstractContinueRequestWSMessage).to.not.be.undefined;
    });

    it('AbstractContinueRequestWSMessage constructor', function () {
        var obj = new MyScript.AbstractContinueRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractContinueRequestWSMessage);
        expect(obj.getType()).to.equal('continue');
    });

});
