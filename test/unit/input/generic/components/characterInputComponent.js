'use strict';

describe('MyScriptJS: input/generic/components/characterInputComponent.js', function () {

    it('CharacterInputComponent object exist', function () {
        expect(MyScript.CharacterInputComponent).to.exist;
        expect(MyScript.CharacterInputComponent).not.to.be.null;
        expect(MyScript.CharacterInputComponent).to.not.be.undefined;
    });

    var characterInputComponent = new MyScript.CharacterInputComponent();
    it('CharacterInputComponent constructor', function () {
        expect(characterInputComponent).to.be.an('object');
        expect(characterInputComponent).to.be.an.instanceof(MyScript.AbstractComponent);
        expect(characterInputComponent).to.be.an.instanceof(MyScript.CharacterInputComponent);
        expect(characterInputComponent).to.have.ownProperty('type');
        expect(characterInputComponent).to.have.ownProperty('alternates');
    });

    it('Get CharacterInputComponent alternates', function () {
        expect(characterInputComponent.getAlternates()).not.to.be.undefined;
        expect(characterInputComponent.getAlternates()).to.be.empty;
    });

    it('Set CharacterInputComponent alternates', function () {
        characterInputComponent.setAlternates([new MyScript.CharacterInputComponentAlternate(), new MyScript.CharacterInputComponentAlternate()]);
        expect(characterInputComponent.getAlternates()).not.to.be.empty;
        expect(characterInputComponent.getAlternates().length).to.be.equal(2);
        expect(characterInputComponent.getAlternates()[0]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
        expect(characterInputComponent.getAlternates()[1]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
    });

    it('Add CharacterInputComponent alternate', function () {
        characterInputComponent.addAlternate(new MyScript.CharacterInputComponentAlternate());
        expect(characterInputComponent.getAlternates()).not.to.be.empty;
        expect(characterInputComponent.getAlternates().length).to.be.equal(3);
        expect(characterInputComponent.getAlternates()[2]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
    });
});