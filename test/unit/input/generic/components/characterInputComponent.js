'use strict';

describe('CharacterInputComponent: input/generic/components/characterInputComponent.js', function () {

    describe('Default construction', function () {

        var characterInputComponent;
        before(function (done) {
            characterInputComponent = new MyScript.CharacterInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(characterInputComponent).to.be.an('object');
            expect(characterInputComponent).to.be.an.instanceOf(MyScript.AbstractComponent);
            expect(characterInputComponent).to.be.an.instanceOf(MyScript.CharacterInputComponent);
            expect(characterInputComponent).to.have.ownProperty('type');
            expect(characterInputComponent).to.have.ownProperty('alternates');
        });

        it('Get alternates', function () {
            expect(characterInputComponent.getAlternates()).not.to.be.undefined;
            expect(characterInputComponent.getAlternates()).to.be.empty;
        });

        it('Set alternates', function () {
            characterInputComponent.setAlternates([new MyScript.CharacterInputComponentAlternate(), new MyScript.CharacterInputComponentAlternate()]);
            expect(characterInputComponent.getAlternates()).not.to.be.empty;
            expect(characterInputComponent.getAlternates().length).to.equal(2);
            expect(characterInputComponent.getAlternates()[0]).to.be.an.instanceOf(MyScript.CharacterInputComponentAlternate);
            expect(characterInputComponent.getAlternates()[1]).to.be.an.instanceOf(MyScript.CharacterInputComponentAlternate);
        });

        it('Add alternate', function () {
            characterInputComponent.addAlternate(new MyScript.CharacterInputComponentAlternate());
            expect(characterInputComponent.getAlternates()).not.to.be.empty;
            expect(characterInputComponent.getAlternates().length).to.equal(3);
            expect(characterInputComponent.getAlternates()[2]).to.be.an.instanceOf(MyScript.CharacterInputComponentAlternate);
        });

        it('Get bounding box', function () {
            expect(characterInputComponent.getBoundingBox()).to.be.undefined;
        });

        it('Set bounding box', function () {
            var rect = new MyScript.Rectangle({x: 12, y: 25, height: 10, width: 130});
            characterInputComponent.setBoundingBox(rect);
            expect(characterInputComponent.getBoundingBox()).not.to.be.undefined;
            expect(characterInputComponent.getBoundingBox()).to.be.an.instanceOf(MyScript.Rectangle);
        });

    });

});