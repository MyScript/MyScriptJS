'use strict';

describe('AbstractTextInputComponent: input/text/components/abstractTextInputComponent.js', function () {

    describe('Default construction', function () {

        var abstractTextInputComponent;
        before(function (done) {
            abstractTextInputComponent = new MyScript.AbstractTextInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(abstractTextInputComponent).to.be.an('object');
            expect(abstractTextInputComponent).to.be.an.instanceOf(MyScript.AbstractComponent);
            expect(abstractTextInputComponent).to.be.an.instanceOf(MyScript.AbstractTextInputComponent);
        });

        it('Get input bounding box', function () {
            expect(abstractTextInputComponent.getBoundingBox()).to.be.undefined;
        });

        it('Set input bounding box', function () {
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