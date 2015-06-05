'use strict';

describe('ErrorResponseWSMessage: input/generic/errorResponseWSMessage.js', function () {

    describe('JSON construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.ErrorResponseWSMessage({error: 'test'});
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.ErrorResponseWSMessage);
        });

        it('error getter', function () {
            expect(message.getError()).to.equal('test');
        });

    });

});