'use strict';

describe('CharacterInputComponentAlternate: input/generic/components/characterInputComponentAlternate.js', function () {

    describe('Default construction', function () {

        var characterInputComponentAlternate;
        before(function (done) {
            characterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
            done();
        });

        it('check initial state', function () {
            expect(characterInputComponentAlternate).to.be.an('object');
            expect(characterInputComponentAlternate).to.be.an.instanceof(MyScript.CharacterInputComponentAlternate);
            expect(characterInputComponentAlternate).to.have.ownProperty('alternate');
            expect(characterInputComponentAlternate).to.have.ownProperty('probability');
        });

    });

    describe('Accessors', function () {

        var characterInputComponentAlternate;
        before(function (done) {
            characterInputComponentAlternate = new MyScript.CharacterInputComponentAlternate();
            done();
        });

        it('Get alternate', function () {
            expect(characterInputComponentAlternate.getAlternate()).to.be.undefined;
        });

        it('Set alternate', function () {
            characterInputComponentAlternate.setAlternate('');
            expect(characterInputComponentAlternate.getAlternate()).not.to.be.undefined;
            expect(characterInputComponentAlternate.getAlternate()).to.be.equal('');
        });

        it('Get probability', function () {
            expect(characterInputComponentAlternate.getProbability()).to.be.undefined;
        });

        it('Set probability', function () {
            characterInputComponentAlternate.setProbability(3.5);
            expect(characterInputComponentAlternate.getProbability()).not.to.be.undefined;
            expect(characterInputComponentAlternate.getProbability()).to.be.equal(3.5);
        });

    });

});