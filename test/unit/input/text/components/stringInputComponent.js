'use strict';

describe('StringInputComponent: input/text/components/stringInputComponent.js', function () {

    describe('Default construction', function () {

        var stringInputComponent;
        before(function (done) {
            stringInputComponent = new MyScript.StringInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(stringInputComponent).to.be.an('object');
            expect(stringInputComponent).to.be.an.instanceOf(MyScript.AbstractTextInputComponent);
            expect(stringInputComponent).to.be.an.instanceOf(MyScript.StringInputComponent);
            expect(stringInputComponent).to.have.ownProperty('type');
        });

        it('Get string', function () {
            expect(stringInputComponent.getString()).to.be.undefined;
        });

        it('Set string', function () {
            stringInputComponent.setString('mystring');
            expect(stringInputComponent.getString()).not.to.be.undefined;
            expect(stringInputComponent.getString()).to.equal('mystring');
        });

    });

});