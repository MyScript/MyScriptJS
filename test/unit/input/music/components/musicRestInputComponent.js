'use strict';

describe('MusicRestInputComponent: input/music/components/musicRestInputComponent.js', function () {

    describe('Default construction', function () {

        var musicRestInputComponent;
        before(function (done) {
            musicRestInputComponent = new MyScript.MusicRestInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicRestInputComponent).to.be.an('object');
            expect(musicRestInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicRestInputComponent).to.be.an.instanceOf(MyScript.MusicRestInputComponent);
            expect(musicRestInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicRestInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            musicRestInputComponent.setValue('WHOLE');
            expect(musicRestInputComponent.getValue()).not.to.be.undefined;
            expect(musicRestInputComponent.getValue()).to.equal('WHOLE');
        });

    });

});