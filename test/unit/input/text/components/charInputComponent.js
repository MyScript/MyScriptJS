'use strict';

describe('CharInputComponent: input/text/components/charInputComponent.js', function () {

    describe('Default construction', function () {

        var charInputComponent;
        before(function (done) {
            charInputComponent = new MyScript.CharInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(charInputComponent).to.be.an('object');
            expect(charInputComponent).to.be.an.instanceOf(MyScript.AbstractTextInputComponent);
            expect(charInputComponent).to.be.an.instanceOf(MyScript.CharInputComponent);
            expect(charInputComponent).to.have.ownProperty('type');
        });

        it('Get label', function () {
            expect(charInputComponent.getLabel()).to.be.undefined;
        });

        it('Set label', function () {
            charInputComponent.setLabel('c');
            expect(charInputComponent.getLabel()).not.to.be.undefined;
            expect(charInputComponent.getLabel()).to.equal('c');
        });

    });

    describe('Deprecated construction', function () {

        var charInputComponent;
        before(function (done) {
            charInputComponent = new MyScript.CharInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(charInputComponent).to.be.an('object');
            expect(charInputComponent).to.be.an.instanceOf(MyScript.AbstractTextInputComponent);
            expect(charInputComponent).to.be.an.instanceOf(MyScript.CharInputComponent);
            expect(charInputComponent).to.have.ownProperty('type');
        });

        it('Get character (deprecated)', function () {
            expect(charInputComponent.getCharacter()).to.be.undefined;
        });

        it('Set character (deprecated)', function () {
            charInputComponent.setCharacter('c');
            expect(charInputComponent.getCharacter()).not.to.be.undefined;
            expect(charInputComponent.getCharacter()).to.equal('c');
        });

    });

});