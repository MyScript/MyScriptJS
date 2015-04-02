'use strict';

describe('MyScriptJS: input/music/components/abstractMusicInputComponent.js', function () {

    it('AbstractMusicInputComponent object exist', function () {
        expect(MyScript.AbstractMusicInputComponent).to.exist;
        expect(MyScript.AbstractMusicInputComponent).not.to.be.null;
        expect(MyScript.AbstractMusicInputComponent).to.not.be.undefined;
    });

    it('AbstractMusicInputComponent constructor', function () {
        var abstractMusicInputComponent = new MyScript.AbstractMusicInputComponent();
        expect(abstractMusicInputComponent).to.be.an('object');
        expect(abstractMusicInputComponent).to.be.an.instanceof(MyScript.AbstractComponent);
        expect(abstractMusicInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
    });

    it('AbstractMusicInputComponent user resources getter', function () {
        var abstractMusicInputComponent = new MyScript.AbstractMusicInputComponent();
        expect(abstractMusicInputComponent.getBoundingBox()).to.be.undefined;
    });

    it('AbstractMusicInputComponent user resources setter', function () {
        var abstractMusicInputComponent = new MyScript.AbstractMusicInputComponent();
        expect(abstractMusicInputComponent.getBoundingBox()).to.be.undefined;

        var boundingBox = new MyScript.Rectangle();
        boundingBox.setX(12);
        boundingBox.setY(12);
        boundingBox.setWidth(215 - 12);
        boundingBox.setHeight(521 - 12);
        abstractMusicInputComponent.setBoundingBox(boundingBox);
        expect(abstractMusicInputComponent.getBoundingBox()).to.deep.equal(boundingBox);
    });
});