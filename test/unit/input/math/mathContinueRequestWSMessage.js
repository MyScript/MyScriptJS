'use strict';

describe('MyScriptJS: input/math/mathContinueRequestWSMessage.js', function () {

    it('MathContinueRequestWSMessage object exist', function () {
        expect(MyScript.MathContinueRequestWSMessage).to.exist;
        expect(MyScript.MathContinueRequestWSMessage).not.to.be.null;
        expect(MyScript.MathContinueRequestWSMessage).to.not.be.undefined;
    });

    it('MathContinueRequestWSMessage constructor', function () {
        var obj = new MyScript.MathContinueRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractContinueRequestWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.MathContinueRequestWSMessage);
    });

    it('MathContinueRequestWSMessage components getter', function () {
        var obj = new MyScript.MathContinueRequestWSMessage();
        expect(obj.getComponents()).to.be.undefined;
    });

    it('MathContinueRequestWSMessage components setter', function () {
        var obj = new MyScript.MathContinueRequestWSMessage();
        expect(obj.getComponents()).to.be.undefined;
        obj.setComponents(new MyScript.AbstractComponent());
        expect(obj.getComponents()).not.to.be.undefined;
    });

});