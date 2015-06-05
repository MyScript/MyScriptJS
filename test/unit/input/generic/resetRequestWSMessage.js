'use strict';

describe('ResetRequestWSMessage: input/generic/resetRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.ResetRequestWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.ResetRequestWSMessage);
            expect(message.getType()).to.equal('reset');
        });

    });

});
