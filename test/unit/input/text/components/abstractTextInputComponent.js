'use strict';

describe('MyScriptJS: input/text/components/abstractTextInputComponent.js', function () {

    it('AbstractTextInputComponent object exist', function () {
        expect(MyScript.AbstractTextInputComponent).to.exist;
        expect(MyScript.AbstractTextInputComponent).not.to.be.null;
        expect(MyScript.AbstractTextInputComponent).to.not.be.undefined;
    });

    it('AbstractTextInputComponent constructor', function () {
        var abstractTextInputComponent = new MyScript.AbstractTextInputComponent();
        expect(abstractTextInputComponent).to.be.an('object');
        expect(abstractTextInputComponent).to.be.an.instanceof(MyScript.AbstractComponent);
        expect(abstractTextInputComponent).to.be.an.instanceof(MyScript.AbstractTextInputComponent);
    });

    it('AbstractTextInputComponent Bounding Box input getter', function () {
        var abstractTextInputComponent = new MyScript.AbstractTextInputComponent();
        expect(abstractTextInputComponent.getBoundingBox()).to.be.undefined;
    });

    it('AbstractTextInputComponent math recognition input setter', function () {
        var abstractTextInputComponent = new MyScript.AbstractTextInputComponent();
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