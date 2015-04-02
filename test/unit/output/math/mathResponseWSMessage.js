'use strict';

describe('MyScriptJS: input/generic/mathResponseWSMessage.js', function () {

    it('MathResponseWSMessage object exist', function () {
        expect(MyScript.MathResponseWSMessage).to.exist;
        expect(MyScript.MathResponseWSMessage).not.to.be.null;
        expect(MyScript.MathResponseWSMessage).to.not.be.undefined;
    });

    var mathResponse = new MyScript.MathResponseWSMessage();
    it('MathResponseWSMessage constructor', function () {
        expect(mathResponse).to.be.an('object');
        expect(mathResponse).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(mathResponse).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
        expect(mathResponse).to.be.an.instanceof(MyScript.MathResponseWSMessage);
    });

    it('MathResponseWSMessage result getter', function () {
        expect(mathResponse.getMathDocument()).to.be.undefined;
    });

    var obj = {
        result: {
            type: 'document'
        }
    };
    var mathResponse2 = new MyScript.MathResponseWSMessage(obj);
    it('Test MathResponseWSMessage object construction: MathDocument construction', function () {
        expect(mathResponse2.getMathDocument()).to.be.an.instanceof(MyScript.MathDocument);
    });

});