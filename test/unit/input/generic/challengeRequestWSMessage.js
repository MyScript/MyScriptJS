'use strict';

describe('MyScriptJS: input/generic/challengeRequestWSMessage.js', function () {

    it('ChallengeRequestWSMessage object exist', function () {
        expect(MyScript.ChallengeRequestWSMessage).to.exist;
        expect(MyScript.ChallengeRequestWSMessage).not.to.be.null;
        expect(MyScript.ChallengeRequestWSMessage).to.not.be.undefined;
    });

    it('ChallengeRequestWSMessage constructor', function () {
        var obj = new MyScript.ChallengeRequestWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.ChallengeRequestWSMessage);
        expect(obj.getType()).to.equal('hmac');
    });

});
