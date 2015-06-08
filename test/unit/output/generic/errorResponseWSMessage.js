'use strict';

describe('ErrorResponseWSMessage: input/generic/errorResponseWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.ErrorResponseWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.ErrorResponseWSMessage);
        });

        it('Get error', function () {
            expect(message.getError()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.ErrorResponseWSMessage({error: 'test'});
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.ErrorResponseWSMessage);
        });

        it('Get error', function () {
            expect(message.getError()).to.equal('test');
        });

    });

});