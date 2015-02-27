'use strict';

describe('MyScriptJS: recognition/abstractWSRecognizer.js', function () {

    it('AbstractWSRecognizer object exist', function () {
        expect(MyScript.AbstractWSRecognizer).to.exist;
        expect(MyScript.AbstractWSRecognizer).not.to.be.null;
        expect(MyScript.AbstractWSRecognizer).to.not.be.undefined;
    });

    it('AbstractWSRecognizer constructor', function () {
        var abstractWSRecognizer = new MyScript.AbstractWSRecognizer('cloud-internal-master.visionobjects.com');
        expect(abstractWSRecognizer).to.be.an('object');
        expect(abstractWSRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(abstractWSRecognizer).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
    });
});