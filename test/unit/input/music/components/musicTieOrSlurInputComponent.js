'use strict';

describe('MusicTieOrSlurInputComponent: input/music/components/musicTieOrSlurInputComponent.js', function () {

    describe('Default construction', function () {

        var musicTieOrSlurInputComponent;
        before(function (done) {
            musicTieOrSlurInputComponent = new MyScript.MusicTieOrSlurInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicTieOrSlurInputComponent).to.be.an('object');
            expect(musicTieOrSlurInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicTieOrSlurInputComponent).to.be.an.instanceof(MyScript.MusicTieOrSlurInputComponent);
            expect(musicTieOrSlurInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicTieOrSlurInputComponent;
        beforeEach(function (done) {
            musicTieOrSlurInputComponent = new MyScript.MusicTieOrSlurInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicTieOrSlurInputComponent.getValue()).to.be.undefined;
        });

        it('value setter', function () {
            expect(musicTieOrSlurInputComponent.getValue()).to.be.undefined;
            musicTieOrSlurInputComponent.setValue('ABOVE');
            expect(musicTieOrSlurInputComponent.getValue()).not.to.be.undefined;
            expect(musicTieOrSlurInputComponent.getValue()).to.be.equal('ABOVE');
        });

    });

});