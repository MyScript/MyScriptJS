'use strict';

describe('MyScriptJS: input/generic/components/characterInputComponentAlternate.js', function () {

    it('CharacterInputComponentAlternate object exist', function () {
        expect(MyScript.CharacterInputComponentAlternate).to.exist;
        expect(MyScript.CharacterInputComponentAlternate).not.to.be.null;
        expect(MyScript.CharacterInputComponentAlternate).to.not.be.undefined;
    });

    var characterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
    it('CharacterInputComponentAlternate constructor', function () {
        expect(characterInputComponentAlternate).to.be.an('object');
        expect(characterInputComponentAlternate).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
        expect(characterInputComponentAlternate).to.have.ownProperty('alternate');
        expect(characterInputComponentAlternate).to.have.ownProperty('probability');
    });

    it('Get CharacterInputComponentAlternate alternate', function () {
        expect(characterInputComponentAlternate.getAlternate()).to.be.undefined;
    });

    it('Set CharacterInputComponentAlternate alternate', function () {
        characterInputComponentAlternate.setAlternate('');
        expect(characterInputComponentAlternate.getAlternate()).not.to.be.undefined;
        expect(characterInputComponentAlternate.getAlternate()).to.be.equal('');
    });

    it('Get CharacterInputComponentAlternate probability', function () {
        expect(characterInputComponentAlternate.getProbability()).to.be.undefined;
    });

    it('Set CharacterInputComponentAlternate probability', function () {
        characterInputComponentAlternate.setProbability(3.5);
        expect(characterInputComponentAlternate.getProbability()).not.to.be.undefined;
        expect(characterInputComponentAlternate.getProbability()).to.be.equal(3.5);
    });
});