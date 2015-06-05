'use strict';

describe('CharacterInputComponent: input/generic/components/characterInputComponent.js', function () {

    describe('Default construction', function () {

        var characterInputComponent;
        before(function (done) {
            characterInputComponent = new MyScript.CharacterInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(characterInputComponent).to.be.an('object');
            expect(characterInputComponent).to.be.an.instanceof(MyScript.AbstractComponent);
            expect(characterInputComponent).to.be.an.instanceof(MyScript.CharacterInputComponent);
            expect(characterInputComponent).to.have.ownProperty('type');
            expect(characterInputComponent).to.have.ownProperty('alternates');
        });

    });

    describe('Accessors', function () {

        var characterInputComponent;
        before(function (done) {
            characterInputComponent = new MyScript.CharacterInputComponent();
            done();
        });

        it('Get alternates', function () {
            expect(characterInputComponent.getAlternates()).not.to.be.undefined;
            expect(characterInputComponent.getAlternates()).to.be.empty;
        });

        it('Set alternates', function () {
            characterInputComponent.setAlternates([new MyScript.CharacterInputComponentAlternate(), new MyScript.CharacterInputComponentAlternate()]);
            expect(characterInputComponent.getAlternates()).not.to.be.empty;
            expect(characterInputComponent.getAlternates().length).to.be.equal(2);
            expect(characterInputComponent.getAlternates()[0]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
            expect(characterInputComponent.getAlternates()[1]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
        });

        it('Add alternate', function () {
            characterInputComponent.addAlternate(new MyScript.CharacterInputComponentAlternate());
            expect(characterInputComponent.getAlternates()).not.to.be.empty;
            expect(characterInputComponent.getAlternates().length).to.be.equal(3);
            expect(characterInputComponent.getAlternates()[2]).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
        });

    });

});