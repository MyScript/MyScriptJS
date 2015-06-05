'use strict';

describe('AbstractRecognitionData: input/generic/abstractRecognitionData.js', function () {

    describe('Default construction', function () {

        var abstractRecognitionData;
        before(function (done) {
            abstractRecognitionData = new MyScript.AbstractRecognitionData();
            done();
        });

        it('check initial state', function () {
            expect(abstractRecognitionData).to.be.an('object');
            expect(abstractRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
        });

    });

    describe('Accessors', function () {

        var abstractRecognitionData;
        beforeEach(function (done) {
            abstractRecognitionData = new MyScript.AbstractRecognitionData();
            done();
        });

        it('Application Key getter', function () {
            expect(abstractRecognitionData.getApplicationKey()).to.be.undefined;
        });

        it('Application Key setter', function () {
            expect(abstractRecognitionData.getApplicationKey()).to.be.undefined;
            abstractRecognitionData.setApplicationKey('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            expect(abstractRecognitionData.getApplicationKey()).not.to.be.undefined;
            expect(abstractRecognitionData.getApplicationKey()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        });

        it('Instance Id getter', function () {
            expect(abstractRecognitionData.getInstanceId()).to.be.undefined;
        });

        it('Instance Id setter', function () {
            expect(abstractRecognitionData.getInstanceId()).to.be.undefined;
            abstractRecognitionData.setInstanceId('89856545451847545454');
            expect(abstractRecognitionData.getInstanceId()).not.to.be.undefined;
            expect(abstractRecognitionData.getInstanceId()).to.equal('89856545451847545454');
        });

        it('HMAC getter', function () {
            expect(abstractRecognitionData.getHmac()).to.be.undefined;
        });

        it('HMAC setter', function () {
            expect(abstractRecognitionData.getHmac()).to.be.undefined;
            abstractRecognitionData.setHmac('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            expect(abstractRecognitionData.getHmac()).not.to.be.undefined;
            expect(abstractRecognitionData.getHmac()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        });

    });

});