'use strict';

describe('MyScriptJS: input/generic/initRequestWSMessage.js', function () {

    it('InitRequestWSMessage object exist', function () {
        expect(MyScript.InitRequestWSMessage).to.exist;
        expect(MyScript.InitRequestWSMessage).not.to.be.null;
        expect(MyScript.InitRequestWSMessage).to.not.be.undefined;
    });

    var initRequestWSMessage = new MyScript.InitRequestWSMessage();
    it('InitRequestWSMessage constructor', function () {
        expect(initRequestWSMessage).to.be.an('object');
        expect(initRequestWSMessage).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(initRequestWSMessage).to.be.an.instanceof(MyScript.InitRequestWSMessage);
        expect(initRequestWSMessage.getType()).to.equal('applicationKey');
    });

    it('Get application key', function () {
        expect(initRequestWSMessage.getApplicationKey()).to.be.undefined;
    });

    it('Set application key', function () {
        initRequestWSMessage.setApplicationKey('9faa1259-48ba-44c4-9857-b3c86d986f94');
        expect(initRequestWSMessage.getApplicationKey()).not.to.be.undefined;
        expect(initRequestWSMessage.getApplicationKey()).to.equal('9faa1259-48ba-44c4-9857-b3c86d986f94');
    });

});
