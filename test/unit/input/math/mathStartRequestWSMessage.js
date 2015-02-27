'use strict';

describe('MyScriptJS: input/math/mathStartRequestWSMessage.js', function () {

    it('MathStartRequestWSMessage object exist', function () {
        expect(MyScript.MathStartRequestWSMessage).to.exist;
        expect(MyScript.MathStartRequestWSMessage).not.to.be.null;
        expect(MyScript.MathStartRequestWSMessage).to.not.be.undefined;
    });

    it('MathStartRequestWSMessage constructor', function () {
        var obj = new MyScript.MathStartRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractStartRequestWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.MathStartRequestWSMessage);
    });

    it('MathStartRequestWSMessage components getter', function () {
        var obj = new MyScript.MathStartRequestWSMessage();
        expect(obj.getComponents()).to.be.undefined;
    });

    it('MathStartRequestWSMessage components setter', function () {
        var obj = new MyScript.MathStartRequestWSMessage();
        expect(obj.getComponents()).to.be.undefined;
        obj.setComponents(new MyScript.AbstractComponent());
        expect(obj.getComponents()).not.to.be.undefined;
    });

    it('MathStartRequestWSMessage parameters getter', function () {
        var obj = new MyScript.MathStartRequestWSMessage();
        expect(obj.getParameters()).to.be.empty;
    });

    it('MathStartRequestWSMessage parameters setter', function () {
        var obj = new MyScript.MathStartRequestWSMessage();
        expect(obj.getParameters()).to.be.undefined;
        obj.setParameters(new MyScript.MathParameter());
        expect(obj.getParameters()).not.to.be.undefined;
    });

});