'use strict';

describe('MyScriptJS: recognition/abstractRecognizer.js', function () {

    it('AbstractRecognizer object exist', function () {
        expect(MyScript.AbstractRecognizer).to.exist;
        expect(MyScript.AbstractRecognizer).not.to.be.null;
        expect(MyScript.AbstractRecognizer).to.not.be.undefined;
    });

    var abstractRecognizer = new MyScript.AbstractRecognizer();
    it('AbstractRecognizer constructor', function () {
        expect(abstractRecognizer).to.be.an('object');
        expect(abstractRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
    });

    //var applicationKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    //var inputMode;
    //it('Get available language list', function (done) {
    //
    //    abstractRecognizer.getAvailableLanguageList(applicationKey, inputMode).then(
    //        function success(response) {
    //            expect(response.length).to.be.equal(64);
    //            done(undefined, response);
    //        },
    //        function error(response) {
    //            expect(response).to.be.an.instanceof(Error);
    //            done(response);
    //        }
    //    );
    //});
    //
    //var data = '';
    //var hmacKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    //it('Compute HMAC', function () {
    //    expect(abstractRecognizer.computeHmac(applicationKey, data, hmacKey)).to.be.equal('xxxxxxxx');
    //});
});