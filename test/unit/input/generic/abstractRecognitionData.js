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
        abstractRecognitionData.setApplicationKey('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        expect(abstractRecognitionData.getApplicationKey()).not.to.be.undefined;
        expect(abstractRecognitionData.getApplicationKey()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
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
        abstractRecognitionData.setHmac('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        expect(abstractRecognitionData.getHmac()).not.to.be.undefined;
        expect(abstractRecognitionData.getHmac()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    });

});