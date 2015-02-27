'use strict';

describe('MyScriptJS: input/generic/mathResponseWSMessage.js', function () {

    it('MathResponseWSMessage object exist', function () {
        expect(MyScript.MathResponseWSMessage).to.exist;
        expect(MyScript.MathResponseWSMessage).not.to.be.null;
        expect(MyScript.MathResponseWSMessage).to.not.be.undefined;
    });

    it('MathResponseWSMessage constructor', function () {
        var obj = new MyScript.MathResponseWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.MathResponseWSMessage);
    });

    it('MathResponseWSMessage result getter', function () {
        var obj = new MyScript.MathResponseWSMessage();
        expect(obj.getMathDocument()).to.be.undefined;
    });

});