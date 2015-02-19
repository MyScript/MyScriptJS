'use strict';

describe('MyScriptJS: input/generic/textResponseWSMessage.js', function () {

    it('TextResponseWSMessage object exist', function () {
        expect(MyScript.TextResponseWSMessage).to.exist;
        expect(MyScript.TextResponseWSMessage).not.to.be.null;
        expect(MyScript.TextResponseWSMessage).to.not.be.undefined;
    });

    it('TextResponseWSMessage constructor', function () {
        var obj = new MyScript.TextResponseWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.TextResponseWSMessage);
    });

    it('TextResponseWSMessage result getter', function () {
        var obj = new MyScript.TextResponseWSMessage();
        expect(obj.getTextDocument()).to.be.undefined;
    });

});