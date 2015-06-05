'use strict';

describe('AbstractMusicInputComponent: input/music/components/abstractMusicInputComponent.js', function () {

    describe('Default construction', function () {

        var abstractMusicInputComponent;
        before(function (done) {
            abstractMusicInputComponent = new MyScript.AbstractMusicInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(abstractMusicInputComponent).to.be.an('object');
            expect(abstractMusicInputComponent).to.be.an.instanceof(MyScript.AbstractComponent);
            expect(abstractMusicInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        });

    });

    describe('Accessors', function () {

        var abstractMusicInputComponent;
        beforeEach(function (done) {
            abstractMusicInputComponent = new MyScript.AbstractMusicInputComponent();
            done();
        });

        it('user resources getter', function () {
            expect(abstractMusicInputComponent.getBoundingBox()).to.be.undefined;
        });

        it('user resources setter', function () {
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