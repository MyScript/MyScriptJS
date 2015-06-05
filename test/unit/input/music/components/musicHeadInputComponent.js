'use strict';

describe('MusicHeadInputComponent: input/music/components/musicHeadInputComponent.js', function () {

    describe('Default construction', function () {

        var musicHeadInputComponent;
        before(function (done) {
            musicHeadInputComponent = new MyScript.MusicHeadInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicHeadInputComponent).to.be.an('object');
            expect(musicHeadInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicHeadInputComponent).to.be.an.instanceof(MyScript.MusicHeadInputComponent);
            expect(musicHeadInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicHeadInputComponent;
        beforeEach(function (done) {
            musicHeadInputComponent = new MyScript.MusicHeadInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicHeadInputComponent.getValue()).to.be.undefined;
        });

        it('value setter', function () {
            expect(musicHeadInputComponent.getValue()).to.be.undefined;
            musicHeadInputComponent.setValue('BLACK');
            expect(musicHeadInputComponent.getValue()).not.to.be.undefined;
            expect(musicHeadInputComponent.getValue()).to.be.equal('BLACK');
        });

    });

});