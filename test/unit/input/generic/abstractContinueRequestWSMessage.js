'use strict';

describe('AbstractContinueRequestWSMessage: input/generic/abstractContinueRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var abstractContinueRequestWSMessage;
        before(function (done) {
            abstractContinueRequestWSMessage = new MyScript.AbstractContinueRequestWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(abstractContinueRequestWSMessage).to.be.an('object');
            expect(abstractContinueRequestWSMessage).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(abstractContinueRequestWSMessage).to.be.an.instanceOf(MyScript.AbstractContinueRequestWSMessage);
            expect(abstractContinueRequestWSMessage.getType()).to.equal('continue');
        });

        it('Get instance Id', function () {
            expect(abstractContinueRequestWSMessage.getInstanceId()).to.be.undefined;
        });

        it('Set instance Id', function () {
            abstractContinueRequestWSMessage.setInstanceId('test');
            expect(abstractContinueRequestWSMessage.getInstanceId()).not.to.be.undefined;
            expect(abstractContinueRequestWSMessage.getInstanceId()).to.equal('test');
        });

    });

});
