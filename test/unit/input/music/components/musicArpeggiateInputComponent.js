'use strict';

describe('MusicArpeggiateInputComponent: input/music/components/musicArpeggiateInputComponent.js', function () {

    describe('Default construction', function () {

        var musicArpeggiateInputComponent;
        before(function (done) {
            musicArpeggiateInputComponent = new MyScript.MusicArpeggiateInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicArpeggiateInputComponent).to.be.an('object');
            expect(musicArpeggiateInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicArpeggiateInputComponent).to.be.an.instanceOf(MyScript.MusicArpeggiateInputComponent);
            expect(musicArpeggiateInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicArpeggiateInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            expect(musicArpeggiateInputComponent.getValue()).to.be.undefined;
            musicArpeggiateInputComponent.setValue('DOWN');
            expect(musicArpeggiateInputComponent.getValue()).to.equal('DOWN');
        });

    });

});