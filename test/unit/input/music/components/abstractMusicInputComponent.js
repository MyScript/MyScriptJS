'use strict';

describe('AbstractMusicInputComponent: input/music/components/abstractMusicInputComponent.js', function () {

    describe('Default construction', function () {

        var abstractMusicInputComponent;
        before(function (done) {
            abstractMusicInputComponent = new MyScript.AbstractMusicInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(abstractMusicInputComponent).to.be.an('object');
            expect(abstractMusicInputComponent).to.be.an.instanceOf(MyScript.AbstractComponent);
            expect(abstractMusicInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
        });

        it('Get user resources', function () {
            expect(abstractMusicInputComponent.getBoundingBox()).to.be.undefined;
        });

        it('Set user resources', function () {
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

});