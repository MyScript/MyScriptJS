'use strict';

describe('MyScriptJS: recognition/abstractRecognizer.js', function () {

    it('AbstractRecognizer object exist', function () {
        expect(MyScript.AbstractRecognizer).to.exist;
        expect(MyScript.AbstractRecognizer).not.to.be.null;
        expect(MyScript.AbstractRecognizer).to.not.be.undefined;
    });

    var abstractRecognizer = new MyScript.AbstractRecognizer('cloud-internal-master.visionobjects.com');
    it('AbstractRecognizer constructor', function () {
        expect(abstractRecognizer).to.be.an('object');
        expect(abstractRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
    });

    var applicationKey = 'f4ae326e-69f9-42a2-b194-51aeb4bce527';
    var inputMode;
    it('Get available language list', function (done) {

        abstractRecognizer.getAvailableLanguageList(applicationKey, inputMode).then(
            function success(response) {
                expect(response.length).to.be.equal(64);
                done(undefined, response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(response);
            }
        );
    });

    var data = '';
    var hmacKey = 'c55d7cad-c506-fe2b-6386-631b53262c0a';
    it('Compute HMAC', function () {
        expect(abstractRecognizer.computeHmac(applicationKey, data, hmacKey)).to.be.equal('fbf2b22158a947e0a95f1698a9fb02f6a94d0c26c18d23ba6797333cae7b9fe8694852a8318a77f3abca77ff195c7e06290f7cac870b71ff7d4d7ae40b91ddd8');
    });
});