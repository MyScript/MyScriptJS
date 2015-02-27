'use strict';

describe('MyScriptJS: input/generic/abstractRecognitionData.js', function () {

    it('AbstractRecognitionData object exist', function () {
        expect(MyScript.AbstractRecognitionData).to.exist;
        expect(MyScript.AbstractRecognitionData).not.to.be.null;
        expect(MyScript.AbstractRecognitionData).to.not.be.undefined;
    });

    it('AbstractRecognitionData constructor', function () {
        var abstractRecognitionData = new MyScript.AbstractRecognitionData();
        expect(abstractRecognitionData).to.be.an('object');
        expect(abstractRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
    });

    it('AbstractRecognitionData Application Key getter', function () {
        var abstractRecognitionData = new MyScript.AbstractRecognitionData();
        expect(abstractRecognitionData.getApplicationKey()).to.be.undefined;
    });

    it('AbstractRecognitionData Application Key setter', function () {
        var abstractRecognitionData = new MyScript.AbstractRecognitionData();
        expect(abstractRecognitionData.getApplicationKey()).to.be.undefined;
        abstractRecognitionData.setApplicationKey('9faa1259-48ba-44c4-9857-b3c86d986f94');
        expect(abstractRecognitionData.getApplicationKey()).not.to.be.undefined;
        expect(abstractRecognitionData.getApplicationKey()).to.equal('9faa1259-48ba-44c4-9857-b3c86d986f94');
    });

    it('AbstractRecognitionData Instance Id getter', function () {
        var abstractRecognitionData = new MyScript.AbstractRecognitionData();
        expect(abstractRecognitionData.getInstanceId()).to.be.undefined;
    });

    it('AbstractRecognitionData Instance Id setter', function () {
        var abstractRecognitionData = new MyScript.AbstractRecognitionData();
        expect(abstractRecognitionData.getInstanceId()).to.be.undefined;
        abstractRecognitionData.setInstanceId('89856545451847545454');
        expect(abstractRecognitionData.getInstanceId()).not.to.be.undefined;
        expect(abstractRecognitionData.getInstanceId()).to.equal('89856545451847545454');
    });

    it('AbstractRecognitionData Hmac getter', function () {
        var abstractRecognitionData = new MyScript.AbstractRecognitionData();
        expect(abstractRecognitionData.getHmac()).to.be.undefined;
    });

    it('AbstractRecognitionData Hmac setter', function () {
        var abstractRecognitionData = new MyScript.AbstractRecognitionData();
        expect(abstractRecognitionData.getHmac()).to.be.undefined;
        abstractRecognitionData.setHmac('fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0');
        expect(abstractRecognitionData.getHmac()).not.to.be.undefined;
        expect(abstractRecognitionData.getHmac()).to.equal('fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0');
    });

});