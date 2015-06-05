'use strict';

describe('AbstractRecoResponseWSMessage: input/generic/abstractRecoResponseWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.AbstractRecoResponseWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
        });

    });

    describe('JSON construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.AbstractRecoResponseWSMessage({instanceId: 'test'});
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
        });

        it('instanceId getter', function () {
            expect(message.getInstanceId()).to.equal('test');
        });

    });

});