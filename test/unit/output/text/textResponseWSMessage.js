'use strict';

describe('MyScriptJS: input/generic/textResponseWSMessage.js', function () {

    it('TextResponseWSMessage object exist', function () {
        expect(MyScript.TextResponseWSMessage).to.exist;
        expect(MyScript.TextResponseWSMessage).not.to.be.null;
        expect(MyScript.TextResponseWSMessage).to.not.be.undefined;
    });

    var textResponse = new MyScript.TextResponseWSMessage();
    it('TextResponseWSMessage constructor', function () {
        expect(textResponse).to.be.an('object');
        expect(textResponse).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(textResponse).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
        expect(textResponse).to.be.an.instanceof(MyScript.TextResponseWSMessage);
    });

    it('TextResponseWSMessage result getter', function () {
        expect(textResponse.getTextDocument()).to.be.undefined;
    });

    var obj = {
        result: {
            type: 'result'
        }
    };
    var textResponse2 = new MyScript.TextResponseWSMessage(obj);
    it('Test TextResponseWSMessage object construction: TextDocument construction', function () {
        expect(textResponse2.getTextDocument()).to.be.an.instanceof(MyScript.TextDocument);
    });

});