'use strict';

describe('StringInputComponent: input/text/components/stringInputComponent.js', function () {

    describe('Default construction', function () {

        var stringInputComponent;
        before(function (done) {
            stringInputComponent = new MyScript.StringInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(stringInputComponent).to.be.an('object');
            expect(stringInputComponent).to.be.an.instanceof(MyScript.AbstractTextInputComponent);
            expect(stringInputComponent).to.be.an.instanceof(MyScript.StringInputComponent);
            expect(stringInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var stringInputComponent;
        beforeEach(function (done) {
            stringInputComponent = new MyScript.StringInputComponent();
            done();
        });

        it('String getter', function () {
            expect(stringInputComponent.getString()).to.be.undefined;
        });

        it('String setter', function () {
            expect(stringInputComponent.getString()).to.be.undefined;
            stringInputComponent.setString('mystring');
            expect(stringInputComponent.getString()).not.to.be.undefined;
            expect(stringInputComponent.getString()).to.be.equal('mystring');
        });

    });

});