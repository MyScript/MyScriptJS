'use strict';

describe('MyScriptJS: input/text/components/characterInputComponent.js', function () {

    var expect = require('chai').expect;

    it('CharacterInputComponent object exist', function () {
        expect(MyScript.CharacterInputComponent).to.exist;
        expect(MyScript.CharacterInputComponent).not.to.be.null;
        expect(MyScript.CharacterInputComponent).to.not.be.undefined;
    });

    it('CharacterInputComponent constructor', function () {
        var characterInputComponent = new MyScript.CharacterInputComponent();
        expect(characterInputComponent).to.be.an('object');
        expect(characterInputComponent).to.be.an.instanceof(MyScript.AbstractTextInputComponent);
        expect(characterInputComponent).to.be.an.instanceof(MyScript.CharacterInputComponent);
        expect(characterInputComponent).to.have.ownProperty('type');
        expect(characterInputComponent).to.have.ownProperty('alternates');
    });

    it('CharacterInputComponent Alternates getter', function () {
        var characterInputComponent = new MyScript.CharacterInputComponent();
        expect(characterInputComponent.getAlternates()).not.to.be.undefined;
        expect(characterInputComponent.getAlternates()).to.be.empty;
    });

    it('CharacterInputComponent Alternates setter', function () {
        var characterInputComponent = new MyScript.CharacterInputComponent();
        expect(characterInputComponent.getAlternates()).not.to.be.undefined;
        expect(characterInputComponent.getAlternates()).to.be.empty;
        characterInputComponent.setAlternates([new MyScript.CharacterInputComponentAlternate(), new MyScript.CharacterInputComponentAlternate()]);
        expect(characterInputComponent.getAlternates()).not.to.be.empty;
        expect(characterInputComponent.getAlternates().length).to.be.equal(2);
        expect(characterInputComponent.getAlternates()[0]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
        expect(characterInputComponent.getAlternates()[1]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
    });

    it('CharacterInputComponent Add Alternate', function () {
        var characterInputComponent = new MyScript.CharacterInputComponent();
        expect(characterInputComponent.getAlternates()).not.to.be.undefined;
        expect(characterInputComponent.getAlternates()).to.be.empty;
        characterInputComponent.addAlternate(new MyScript.CharacterInputComponentAlternate());
        expect(characterInputComponent.getAlternates()).not.to.be.empty;
        expect(characterInputComponent.getAlternates().length).to.be.equal(1);
        expect(characterInputComponent.getAlternates()[0]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
    });
});