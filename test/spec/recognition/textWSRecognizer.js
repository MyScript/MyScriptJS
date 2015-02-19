'use strict';

describe('MyScriptJS: recognition/textWSRecognizer.js', function () {

    it('TextWSRecognizer object exist', function () {
        expect(MyScript.TextWSRecognizer).to.exist;
        expect(MyScript.TextWSRecognizer).not.to.be.null;
        expect(MyScript.TextWSRecognizer).to.not.be.undefined;
    });

    it('TextWSRecognizer constructor', function () {
        var obj = new MyScript.TextWSRecognizer('localhost:3001');
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
    });

});