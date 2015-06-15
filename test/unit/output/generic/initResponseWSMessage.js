'use strict';

describe('InitResponseWSMessage: input/generic/initResponseWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.InitResponseWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.InitResponseWSMessage);
        });

    });

});