'use strict';

describe('MyScriptJS: input/generic/initRequestWSMessage.js', function () {

    it('InitRequestWSMessage object exist', function () {
        expect(MyScript.InitRequestWSMessage).to.exist;
        expect(MyScript.InitRequestWSMessage).not.to.be.null;
        expect(MyScript.InitRequestWSMessage).to.not.be.undefined;
    });

    it('InitRequestWSMessage constructor', function () {
        var obj = new MyScript.InitRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.InitRequestWSMessage);
        expect(obj.getType()).to.equal('applicationKey');
    });

});
