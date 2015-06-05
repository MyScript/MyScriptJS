'use strict';

describe('AbstractWSMessage: common/abstractWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.AbstractWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
        });

    });

});