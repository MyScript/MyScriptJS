'use strict';

describe('MusicHeadInputComponent: input/music/components/musicHeadInputComponent.js', function () {

    describe('Default construction', function () {

        var musicHeadInputComponent;
        before(function (done) {
            musicHeadInputComponent = new MyScript.MusicHeadInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicHeadInputComponent).to.be.an('object');
            expect(musicHeadInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicHeadInputComponent).to.be.an.instanceOf(MyScript.MusicHeadInputComponent);
            expect(musicHeadInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicHeadInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            musicHeadInputComponent.setValue('BLACK');
            expect(musicHeadInputComponent.getValue()).not.to.be.undefined;
            expect(musicHeadInputComponent.getValue()).to.equal('BLACK');
        });

    });

});