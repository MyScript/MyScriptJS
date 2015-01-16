'use strict';

describe('MyScriptJS: recognition/abstractRecognizer.js', function () {

    var expect = require('chai').expect;

    it('AbstractRecognizer object exist', function () {
        expect(MyScript.AbstractRecognizer).to.exist;
        expect(MyScript.AbstractRecognizer).not.to.be.null;
        expect(MyScript.AbstractRecognizer).to.not.be.undefined;
    });

    it('AbstractRecognizer constructor', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001/api/myscript/v2.0');
        expect(abstractRecognizer).to.be.an('object');
        expect(abstractRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
    });

    it('AbstractRecognizer Available Language List getter', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001/api/myscript/v2.0'),
            applicationKey = 'f4ae326e-69f9-42a2-b194-51aeb4bce527',
            hmacKey = 'c55d7cad-c506-fe2b-6386-631b53262c0a',
            inputMode = '';

        abstractRecognizer.getAvailableLanguageList(applicationKey, hmacKey, inputMode).then(
            function success (response) {
                expect(response.length).to.be.equal(64);
            },
            function error (response) {
                expect(response).to.be.equal('');
            }
        );
    });

    it('AbstractRecognizer Compute Hmac', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001/api/myscript/v2.0'),
            applicationKey = 'f4ae326e-69f9-42a2-b194-51aeb4bce527',
            data = '',
            hmacKey = 'c55d7cad-c506-fe2b-6386-631b53262c0a';

        expect(abstractRecognizer.computeHmac(applicationKey, data, hmacKey)).to.be.equal('fbf2b22158a947e0a95f1698a9fb02f6a94d0c26c18d23ba6797333cae7b9fe8694852a8318a77f3abca77ff195c7e06290f7cac870b71ff7d4d7ae40b91ddd8');
    });

    it('AbstractRecognizer Take Up Hmac Challenge', function () {
        var abstractRecognizer = new MyScript.AbstractRecognizer('http://localhost:3001/api/myscript/v2.0'),
            applicationKey = 'f4ae326e-69f9-42a2-b194-51aeb4bce527',
            challenge = '',
            hmacKey = 'c55d7cad-c506-fe2b-6386-631b53262c0a';

        abstractRecognizer.takeUpHmacChallenge(applicationKey, challenge, hmacKey);
    });
});