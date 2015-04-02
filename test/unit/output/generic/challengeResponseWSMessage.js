'use strict';

describe('MyScriptJS: input/generic/challengeResponseWSMessage.js', function () {

    it('ChallengeResponseWSMessage object exist', function () {
        expect(MyScript.ChallengeResponseWSMessage).to.exist;
        expect(MyScript.ChallengeResponseWSMessage).not.to.be.null;
        expect(MyScript.ChallengeResponseWSMessage).to.not.be.undefined;
    });

    it('ChallengeResponseWSMessage constructor', function () {
        var obj = new MyScript.ChallengeResponseWSMessage();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractWSMessage);
        expect(obj).to.be.an.instanceof(MyScript.ChallengeResponseWSMessage);
    });

    it('ChallengeResponseWSMessage challenge getter', function () {
        var obj = new MyScript.ChallengeResponseWSMessage({challenge: 'test'});
        expect(obj.getChallenge()).to.equal('test');
    });

});