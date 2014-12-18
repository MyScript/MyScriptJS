'use strict';

describe('MyScriptJS: input/text/components/characterInputComponentAlternate.js', function () {

    it('CharacterInputComponentAlternate object exist', function () {
        expect(MyScript.CharacterInputComponentAlternate).to.exist;
        expect(MyScript.CharacterInputComponentAlternate).not.to.be.null;
        expect(MyScript.CharacterInputComponentAlternate).to.not.be.undefined;
    });

    it('CharacterInputComponentAlternate constructor', function () {
        var CharacterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
        expect(CharacterInputComponentAlternate).to.be.an('object');
        expect(CharacterInputComponentAlternate).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
        expect(CharacterInputComponentAlternate).to.have.ownProperty('alternate');
        expect(CharacterInputComponentAlternate).to.have.ownProperty('probability');
    });

    it('CharacterInputComponentAlternate Alternate getter', function () {
        var CharacterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
        expect(CharacterInputComponentAlternate.getAlternate()).to.be.undefined;
    });

    it('CharacterInputComponentAlternate Alternate setter', function () {
        var CharacterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
        expect(CharacterInputComponentAlternate.getAlternate()).to.be.undefined;
        CharacterInputComponentAlternate.setAlternate('');
        expect(CharacterInputComponentAlternate.getAlternate()).not.to.be.undefined;
        expect(CharacterInputComponentAlternate.getAlternate()).to.be.equal('');
    });

    it('CharacterInputComponentAlternate Probability getter', function () {
        var CharacterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
        expect(CharacterInputComponentAlternate.getProbability()).to.be.undefined;
    });

    it('CharacterInputComponentAlternate Probability setter', function () {
        var CharacterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
        expect(CharacterInputComponentAlternate.getProbability()).to.be.undefined;
        CharacterInputComponentAlternate.setProbability(3.5);
        expect(CharacterInputComponentAlternate.getProbability()).not.to.be.undefined;
        expect(CharacterInputComponentAlternate.getProbability()).to.be.equal(3.5);
    });
});