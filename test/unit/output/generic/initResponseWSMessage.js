'use strict';

describe('InitResponseWSMessage: input/generic/initResponseWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.InitResponseWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.InitResponseWSMessage);
        });

    });

});