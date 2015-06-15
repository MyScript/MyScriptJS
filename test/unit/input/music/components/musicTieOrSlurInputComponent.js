'use strict';

describe('MusicTieOrSlurInputComponent: input/music/components/musicTieOrSlurInputComponent.js', function () {

    describe('Default construction', function () {

        var musicTieOrSlurInputComponent;
        before(function (done) {
            musicTieOrSlurInputComponent = new MyScript.MusicTieOrSlurInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicTieOrSlurInputComponent).to.be.an('object');
            expect(musicTieOrSlurInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicTieOrSlurInputComponent).to.be.an.instanceOf(MyScript.MusicTieOrSlurInputComponent);
            expect(musicTieOrSlurInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicTieOrSlurInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            musicTieOrSlurInputComponent.setValue('ABOVE');
            expect(musicTieOrSlurInputComponent.getValue()).not.to.be.undefined;
            expect(musicTieOrSlurInputComponent.getValue()).to.equal('ABOVE');
        });

    });

});