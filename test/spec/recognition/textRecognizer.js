'use strict';

describe('MyScriptJS: recognition/textRecognizer.js', function () {

    it('TextRecognizer object exist', function () {
        expect(MyScript.TextRecognizer).to.exist;
        expect(MyScript.TextRecognizer).not.to.be.null;
        expect(MyScript.TextRecognizer).to.not.be.undefined;
    });

    it('TextRecognizer constructor', function () {
        var textRecognizer = new MyScript.TextRecognizer('http://localhost:3001');
        expect(textRecognizer).to.be.an('object');
        expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(textRecognizer).to.be.an.instanceof(MyScript.TextRecognizer);
    });

    it('TextRecognizer Do SimpleRecognition', function () {
        var textRecognizer = new MyScript.TextRecognizer('http://localhost:3001'),
            applicationKey = '',
            parameters = new MyScript.TextParameter(),
            instanceId = '',
            inputUnits = [new MyScript.TextInputUnit()],
            hmacKey = '';

        textRecognizer.doSimpleRecognition(applicationKey, parameters, instanceId, inputUnits, hmacKey).then(
            function success (response) {

            },
            function error (response) {

            }
        );
    });

});