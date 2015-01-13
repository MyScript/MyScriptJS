'use strict';

describe('MyScriptJS: recognition/abstractRecognizer.js', function () {

    it('AbstractRecognizer object exist', function () {
        expect(MyScript.AbstractRecognizer).to.exist;
        expect(MyScript.AbstractRecognizer).not.to.be.null;
        expect(MyScript.AbstractRecognizer).to.not.be.undefined;
    });

    it('AbstractRecognizer constructor', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001');
        expect(abstractRecognizer).to.be.an('object');
        expect(abstractRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
    });

    it('AbstractRecognizer Available Language List getter', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001'),
            applicationKey = '',
            hmacKey = '',
            inputMode = '';

        abstractRecognizer.getAvailableLanguageList(applicationKey, hmacKey, inputMode).then(
            function success (response) {

            },
            function error (response) {

            }
        );
    });

    it('AbstractRecognizer Compute Hmac', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001'),
            applicationKey = '',
            data = '',
            hmacKey = '';

        abstractRecognizer.computeHmac(applicationKey, data, hmacKey).then(
            function success (response) {

            },
            function error (response) {

            }
        );
    });

    it('AbstractRecognizer Take Up Hmac Challenge', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001'),
            applicationKey = '',
            challenge = '',
            hmacKey = '';

        abstractRecognizer.takeUpHmacChallenge(applicationKey, challenge, hmacKey);
    });
});