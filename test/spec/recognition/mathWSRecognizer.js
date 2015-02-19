'use strict';

describe('MyScriptJS: recognition/mathWSRecognizer.js', function () {

    it('MathWSRecognizer object exist', function () {
        expect(MyScript.MathWSRecognizer).to.exist;
        expect(MyScript.MathWSRecognizer).not.to.be.null;
        expect(MyScript.MathWSRecognizer).to.not.be.undefined;
    });

    it('MathWSRecognizer constructor', function () {
        var obj = new MyScript.MathWSRecognizer('localhost:3001');
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
    });

});