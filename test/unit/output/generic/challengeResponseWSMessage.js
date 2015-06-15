'use strict';

describe('ChallengeResponseWSMessage: input/generic/challengeResponseWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.ChallengeResponseWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.ChallengeResponseWSMessage);
        });

        it('Get challenge', function () {
            expect(message.getChallenge()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.ChallengeResponseWSMessage({challenge: 'test'});
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.ChallengeResponseWSMessage);
        });

        it('Get challenge', function () {
            expect(message.getChallenge()).to.equal('test');
        });

    });

});