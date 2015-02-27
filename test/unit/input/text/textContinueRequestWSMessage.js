'use strict';

describe('MyScriptJS: input/math/textContinueRequestWSMessage.js', function () {

    it('TextContinueRequestWSMessage object exist', function () {
        expect(MyScript.TextContinueRequestWSMessage).to.exist;
        expect(MyScript.TextContinueRequestWSMessage).not.to.be.null;
        expect(MyScript.TextContinueRequestWSMessage).to.not.be.undefined;
    });

    it('TextContinueRequestWSMessage constructor', function () {
        var obj = new MyScript.TextContinueRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractContinueRequestWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.TextContinueRequestWSMessage);
    });

    it('TextContinueRequestWSMessage inputUnits getter', function () {
        var obj = new MyScript.TextContinueRequestWSMessage();
        expect(obj.getInputUnits()).to.be.undefined;
    });

    it('TextContinueRequestWSMessage inputUnits setter', function () {
        var obj = new MyScript.TextContinueRequestWSMessage();
        expect(obj.getInputUnits()).to.be.undefined;
        obj.setInputUnits([new MyScript.TextInputUnit()]);
        expect(obj.getInputUnits()).not.to.be.undefined;
    });

});