'use strict';

describe('AbstractTextInputComponent: input/text/components/abstractTextInputComponent.js', function () {

    describe('Default construction', function () {

        var abstractTextInputComponent;
        before(function (done) {
            abstractTextInputComponent = new MyScript.AbstractTextInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(abstractTextInputComponent).to.be.an('object');
            expect(abstractTextInputComponent).to.be.an.instanceof(MyScript.AbstractComponent);
            expect(abstractTextInputComponent).to.be.an.instanceof(MyScript.AbstractTextInputComponent);
        });

    });

    describe('Accessors', function () {

        var abstractTextInputComponent;
        beforeEach(function (done) {
            abstractTextInputComponent = new MyScript.AbstractTextInputComponent();
            done();
        });

        it('Bounding Box input getter', function () {
            expect(abstractTextInputComponent.getBoundingBox()).to.be.undefined;
        });

        it('Bounding Box input setter', function () {
            expect(abstractTextInputComponent.getBoundingBox()).to.be.undefined;

            var boundingBox = new MyScript.Rectangle();
            boundingBox.setX(12);
            boundingBox.setY(12);
            boundingBox.setWidth(215 - 12);
            boundingBox.setHeight(521 - 12);
            abstractTextInputComponent.setBoundingBox(boundingBox);
            expect(abstractTextInputComponent.getBoundingBox()).to.deep.equal(boundingBox);
        });

    });

});