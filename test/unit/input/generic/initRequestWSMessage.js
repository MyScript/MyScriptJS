'use strict';

describe('InitRequestWSMessage: input/generic/initRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var initRequestWSMessage;
        before(function (done) {
            initRequestWSMessage = new MyScript.InitRequestWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(initRequestWSMessage).to.be.an('object');
            expect(initRequestWSMessage).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(initRequestWSMessage).to.be.an.instanceOf(MyScript.InitRequestWSMessage);
            expect(initRequestWSMessage.getType()).to.equal('applicationKey');
        });

        it('Get application key', function () {
            expect(initRequestWSMessage.getApplicationKey()).to.be.undefined;
        });

        it('Set application key', function () {
            initRequestWSMessage.setApplicationKey('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            expect(initRequestWSMessage.getApplicationKey()).not.to.be.undefined;
            expect(initRequestWSMessage.getApplicationKey()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        });

    });

});
