'use strict';

describe('MusicArpeggiateInputComponent: input/music/components/musicArpeggiateInputComponent.js', function () {

    describe('Default construction', function () {

        var musicArpeggiateInputComponent;
        before(function (done) {
            musicArpeggiateInputComponent = new MyScript.MusicArpeggiateInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicArpeggiateInputComponent).to.be.an('object');
            expect(musicArpeggiateInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicArpeggiateInputComponent).to.be.an.instanceof(MyScript.MusicArpeggiateInputComponent);
            expect(musicArpeggiateInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Default construction', function () {

        var musicArpeggiateInputComponent;
        beforeEach(function (done) {
            musicArpeggiateInputComponent = new MyScript.MusicArpeggiateInputComponent();
            done();
        });

        it('MusicArpeggiateInputComponent value getter', function () {
            expect(musicArpeggiateInputComponent.getValue()).to.be.undefined;
        });

        it('MusicArpeggiateInputComponent value setter', function () {
            expect(musicArpeggiateInputComponent.getValue()).to.be.undefined;
            musicArpeggiateInputComponent.setValue('DOWN');
            expect(musicArpeggiateInputComponent.getValue()).to.equal('DOWN');
        });

    });

});