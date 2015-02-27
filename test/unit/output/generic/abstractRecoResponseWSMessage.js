'use strict';

describe('MyScriptJS: input/generic/abstractRecoResponseWSMessage.js', function () {

    it('AbstractRecoResponseWSMessage object exist', function () {
        expect(MyScript.AbstractRecoResponseWSMessage).to.exist;
        expect(MyScript.AbstractRecoResponseWSMessage).not.to.be.null;
        expect(MyScript.AbstractRecoResponseWSMessage).to.not.be.undefined;
    });

    it('AbstractRecoResponseWSMessage constructor', function () {
        var obj = new MyScript.AbstractRecoResponseWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
    });

    it('AbstractRecoResponseWSMessage error getter', function () {
        var obj = new MyScript.AbstractRecoResponseWSMessage({instanceId: 'test'});
        expect(obj.getInstanceId()).to.equal('test');
    });

});