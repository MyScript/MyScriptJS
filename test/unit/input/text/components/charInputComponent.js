'use strict';

describe('CharInputComponent: input/text/components/charInputComponent.js', function () {

    describe('Default construction', function () {

        var charInputComponent;
        before(function (done) {
            charInputComponent = new MyScript.CharInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(charInputComponent).to.be.an('object');
            expect(charInputComponent).to.be.an.instanceof(MyScript.AbstractTextInputComponent);
            expect(charInputComponent).to.be.an.instanceof(MyScript.CharInputComponent);
            expect(charInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var charInputComponent;
        beforeEach(function (done) {
            charInputComponent = new MyScript.CharInputComponent();
            done();
        });

        it('Character getter', function () {
            expect(charInputComponent.getCharacter()).to.be.undefined;
        });

        it('Character setter', function () {
            expect(charInputComponent.getCharacter()).to.be.undefined;
            charInputComponent.setCharacter('c');
            expect(charInputComponent.getCharacter()).not.to.be.undefined;
            expect(charInputComponent.getCharacter()).to.be.equal('c');
        });

    });

});