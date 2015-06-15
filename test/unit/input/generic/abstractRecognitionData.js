'use strict';

describe('AbstractRecognitionData: input/generic/abstractRecognitionData.js', function () {

    describe('Default construction', function () {

        var abstractRecognitionData;
        before(function (done) {
            abstractRecognitionData = new MyScript.AbstractRecognitionData();
            done();
        });

        it('Check initial state', function () {
            expect(abstractRecognitionData).to.be.an('object');
            expect(abstractRecognitionData).to.be.an.instanceOf(MyScript.AbstractRecognitionData);
        });

        it('Get application key', function () {
            expect(abstractRecognitionData.getApplicationKey()).to.be.undefined;
        });

        it('Set application key', function () {
            abstractRecognitionData.setApplicationKey('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            expect(abstractRecognitionData.getApplicationKey()).not.to.be.undefined;
            expect(abstractRecognitionData.getApplicationKey()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        });

        it('Get instance id', function () {
            expect(abstractRecognitionData.getInstanceId()).to.be.undefined;
        });

        it('Set instance id', function () {
            abstractRecognitionData.setInstanceId('89856545451847545454');
            expect(abstractRecognitionData.getInstanceId()).not.to.be.undefined;
            expect(abstractRecognitionData.getInstanceId()).to.equal('89856545451847545454');
        });

        it('Get HMAC', function () {
            expect(abstractRecognitionData.getHmac()).to.be.undefined;
        });

        it('Set HMAC', function () {
            abstractRecognitionData.setHmac('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            expect(abstractRecognitionData.getHmac()).not.to.be.undefined;
            expect(abstractRecognitionData.getHmac()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        });

    });

});