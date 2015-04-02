'use strict';

describe('MyScriptJS: input/generic/errorResponseWSMessage.js', function () {

    it('ErrorResponseWSMessage object exist', function () {
        expect(MyScript.ErrorResponseWSMessage).to.exist;
        expect(MyScript.ErrorResponseWSMessage).not.to.be.null;
        expect(MyScript.ErrorResponseWSMessage).to.not.be.undefined;
    });

    it('ErrorResponseWSMessage constructor', function () {
        var obj = new MyScript.ErrorResponseWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.ErrorResponseWSMessage);
    });

    it('ErrorResponseWSMessage error getter', function () {
        var obj = new MyScript.ErrorResponseWSMessage({error: 'test'});
        expect(obj.getError()).to.equal('test');
    });

});