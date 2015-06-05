'use strict';

describe('ChallengeResponseWSMessage: input/generic/challengeResponseWSMessage.js', function () {

    describe('JSON construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.ChallengeResponseWSMessage({challenge: 'test'});
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.ChallengeResponseWSMessage);
        });

        it('challenge getter', function () {
            expect(message.getChallenge()).to.equal('test');
        });

    });

});