'use strict';

describe('MyScriptJS: recognition/textWSRecognizer.js', function () {

    it('TextWSRecognizer object exist', function () {
        expect(MyScript.TextWSRecognizer).to.exist;
        expect(MyScript.TextWSRecognizer).not.to.be.null;
        expect(MyScript.TextWSRecognizer).to.not.be.undefined;
    });

    it('TextWSRecognizer constructor', function () {
        var obj = new MyScript.TextWSRecognizer();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
        expect(obj).to.be.an.instanceof(MyScript.TextWSRecognizer);
    });

    var textRecognizer;
    it('Create a text WebSocket', function () {
        textRecognizer = new MyScript.TextWSRecognizer('cloud-internal-master.visionobjects.com');
    });

});