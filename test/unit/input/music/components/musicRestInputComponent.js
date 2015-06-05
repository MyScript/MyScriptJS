'use strict';

describe('MusicRestInputComponent: input/music/components/musicRestInputComponent.js', function () {

    describe('Default construction', function () {

        var musicRestInputComponent;
        before(function (done) {
            musicRestInputComponent = new MyScript.MusicRestInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicRestInputComponent).to.be.an('object');
            expect(musicRestInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicRestInputComponent).to.be.an.instanceof(MyScript.MusicRestInputComponent);
            expect(musicRestInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicRestInputComponent;
        beforeEach(function (done) {
            musicRestInputComponent = new MyScript.MusicRestInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicRestInputComponent.getValue()).to.be.undefined;
        });

        it('value setter', function () {
            expect(musicRestInputComponent.getValue()).to.be.undefined;
            musicRestInputComponent.setValue('WHOLE');
            expect(musicRestInputComponent.getValue()).not.to.be.undefined;
            expect(musicRestInputComponent.getValue()).to.be.equal('WHOLE');
        });

    });

});