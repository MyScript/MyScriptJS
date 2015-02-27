'use strict';

describe('MyScriptJS: input/generic/initResponseWSMessage.js', function () {

    it('InitResponseWSMessage object exist', function () {
        expect(MyScript.InitResponseWSMessage).to.exist;
        expect(MyScript.InitResponseWSMessage).not.to.be.null;
        expect(MyScript.InitResponseWSMessage).to.not.be.undefined;
    });

    it('InitResponseWSMessage constructor', function () {
        var obj = new MyScript.InitResponseWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.InitResponseWSMessage);
    });

});