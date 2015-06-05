'use strict';

describe('AbstractStartRequestWSMessage: input/generic/abstractStartRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.AbstractStartRequestWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.AbstractStartRequestWSMessage);
            expect(message.getType()).to.equal('start');
        });

    });

});
