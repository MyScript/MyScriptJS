'use strict';

describe('MyScriptJS: input/math/textStartRequestWSMessage.js', function () {

    it('TextStartRequestWSMessage object exist', function () {
        expect(MyScript.TextStartRequestWSMessage).to.exist;
        expect(MyScript.TextStartRequestWSMessage).not.to.be.null;
        expect(MyScript.TextStartRequestWSMessage).to.not.be.undefined;
    });

    it('TextStartRequestWSMessage constructor', function () {
        var obj = new MyScript.TextStartRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractStartRequestWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.TextStartRequestWSMessage);
    });

    it('TextStartRequestWSMessage inputUnits getter', function () {
        var obj = new MyScript.TextStartRequestWSMessage();
        expect(obj.getInputUnits()).to.be.undefined;
    });

    it('TextStartRequestWSMessage inputUnits setter', function () {
        var obj = new MyScript.TextStartRequestWSMessage();
        expect(obj.getInputUnits()).to.be.undefined;
        obj.setInputUnits([new MyScript.TextInputUnit()]);
        expect(obj.getInputUnits()).not.to.be.undefined;
    });

    it('TextStartRequestWSMessage parameters getter', function () {
        var obj = new MyScript.TextStartRequestWSMessage();
        expect(obj.getParameters()).to.be.empty;
    });

    it('TextStartRequestWSMessage parameters setter', function () {
        var obj = new MyScript.TextStartRequestWSMessage();
        expect(obj.getParameters()).to.be.undefined;
        obj.setParameters(new MyScript.AbstractParameter());
        expect(obj.getParameters()).not.to.be.undefined;
    });

});