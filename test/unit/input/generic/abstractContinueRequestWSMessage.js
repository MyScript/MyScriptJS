'use strict';

describe('MyScriptJS: input/generic/abstractContinueRequestWSMessage.js', function () {

    it('AbstractContinueRequestWSMessage object exist', function () {
        expect(MyScript.AbstractContinueRequestWSMessage).to.exist;
        expect(MyScript.AbstractContinueRequestWSMessage).not.to.be.null;
        expect(MyScript.AbstractContinueRequestWSMessage).to.not.be.undefined;
    });

    var abstractContinueRequestWSMessage = new MyScript.AbstractContinueRequestWSMessage();
    it('AbstractContinueRequestWSMessage constructor', function () {
        expect(abstractContinueRequestWSMessage).to.be.an('object');
        expect(abstractContinueRequestWSMessage).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(abstractContinueRequestWSMessage).to.be.an.instanceof(MyScript.AbstractContinueRequestWSMessage);
        expect(abstractContinueRequestWSMessage.getType()).to.equal('continue');
    });

    it('Get instance Id', function () {
        expect(abstractContinueRequestWSMessage.getInstanceId()).to.be.undefined;
    });

    it('Set instance Id', function () {
        abstractContinueRequestWSMessage.setInstanceId('test');
        expect(abstractContinueRequestWSMessage.getInstanceId()).not.to.be.undefined;
        expect(abstractContinueRequestWSMessage.getInstanceId()).to.equal('test');
    });

});
