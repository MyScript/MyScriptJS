'use strict';

describe('MyScriptJS: input/generic/challengeRequestWSMessage.js', function () {

    it('ChallengeRequestWSMessage object exist', function () {
        expect(MyScript.ChallengeRequestWSMessage).to.exist;
        expect(MyScript.ChallengeRequestWSMessage).not.to.be.null;
        expect(MyScript.ChallengeRequestWSMessage).to.not.be.undefined;
    });

    var challengeRequestWSMessage = new MyScript.ChallengeRequestWSMessage();
    it('ChallengeRequestWSMessage constructor', function () {
        expect(challengeRequestWSMessage).to.be.an('object');
        expect(challengeRequestWSMessage).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(challengeRequestWSMessage).to.be.an.instanceof(MyScript.ChallengeRequestWSMessage);
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
        challengeRequestWSMessage.setApplicationKey('9faa1259-48ba-44c4-9857-b3c86d986f94');
        expect(challengeRequestWSMessage.getApplicationKey()).not.to.be.undefined;
        expect(challengeRequestWSMessage.getApplicationKey()).to.equal('9faa1259-48ba-44c4-9857-b3c86d986f94');
    });

    it('Get HMAC Signature', function () {
        expect(challengeRequestWSMessage.getHmacSignature()).to.be.undefined;
    });

    it('Set HMAC Signature', function () {
        challengeRequestWSMessage.setHmacSignature('fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0');
        expect(challengeRequestWSMessage.getHmacSignature()).not.to.be.undefined;
        expect(challengeRequestWSMessage.getHmacSignature()).to.equal('fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0');
    });

});
