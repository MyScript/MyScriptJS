'use strict';

describe('MyScriptJS: input/generic/abstractStartRequestWSMessage.js', function () {

    it('AbstractStartRequestWSMessage object exist', function () {
        expect(MyScript.AbstractStartRequestWSMessage).to.exist;
        expect(MyScript.AbstractStartRequestWSMessage).not.to.be.null;
        expect(MyScript.AbstractStartRequestWSMessage).to.not.be.undefined;
    });

    it('AbstractContinueRequestWSMessage constructor', function () {
        var obj = new MyScript.AbstractStartRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractStartRequestWSMessage);
        expect(obj.getType()).to.equal('start');
    });

});
