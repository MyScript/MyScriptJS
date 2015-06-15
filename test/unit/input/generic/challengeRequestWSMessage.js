'use strict';

describe('ChallengeRequestWSMessage: input/generic/challengeRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var challengeRequestWSMessage;
        before(function (done) {
            challengeRequestWSMessage = new MyScript.ChallengeRequestWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(challengeRequestWSMessage).to.be.an('object');
            expect(challengeRequestWSMessage).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(challengeRequestWSMessage).to.be.an.instanceOf(MyScript.ChallengeRequestWSMessage);
            expect(challengeRequestWSMessage.getType()).to.equal('hmac');
        });

        it('Get challenge', function () {
            expect(challengeRequestWSMessage.getChallenge()).to.be.undefined;
        });

        it('Set challenge', function () {
            challengeRequestWSMessage.setChallenge('test');
            expect(challengeRequestWSMessage.getChallenge()).not.to.be.undefined;
            expect(challengeRequestWSMessage.getChallenge()).to.equal('test');
        });

        it('Get application key', function () {
            expect(challengeRequestWSMessage.getApplicationKey()).to.be.undefined;
        });

        it('Set application key', function () {
            challengeRequestWSMessage.setApplicationKey('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            expect(challengeRequestWSMessage.getApplicationKey()).not.to.be.undefined;
            expect(challengeRequestWSMessage.getApplicationKey()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        });

        it('Get HMAC Signature', function () {
            expect(challengeRequestWSMessage.getHmacSignature()).to.be.undefined;
        });

        it('Set HMAC Signature', function () {
            challengeRequestWSMessage.setHmacSignature('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            expect(challengeRequestWSMessage.getHmacSignature()).not.to.be.undefined;
            expect(challengeRequestWSMessage.getHmacSignature()).to.equal('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        });

    });

});
