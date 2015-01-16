'use strict';

describe('MyScriptJS: input/music/components/musicArpeggiateInputComponent.js', function () {

    var expect = require('chai').expect;

    it('MusicArpeggiateInputComponent object exist', function () {
        expect(MyScript.MusicArpeggiateInputComponent).to.exist;
        expect(MyScript.MusicArpeggiateInputComponent).not.to.be.null;
        expect(MyScript.MusicArpeggiateInputComponent).to.not.be.undefined;
    });

    it('MusicArpeggiateInputComponent constructor', function () {
        var musicArpeggiateInputComponent = new MyScript.MusicArpeggiateInputComponent();
        expect(musicArpeggiateInputComponent).to.be.an('object');
        expect(musicArpeggiateInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicArpeggiateInputComponent).to.be.an.instanceof(MyScript.MusicArpeggiateInputComponent);
        expect(musicArpeggiateInputComponent).to.have.ownProperty('type');
    });

    it('MusicArpeggiateInputComponent value getter', function () {
        var musicArpeggiateInputComponent = new MyScript.MusicArpeggiateInputComponent();
        expect(musicArpeggiateInputComponent.getValue()).to.be.undefined;
    });

    it('MusicArpeggiateInputComponent value setter', function () {
        var musicArpeggiateInputComponent = new MyScript.MusicArpeggiateInputComponent();
        expect(musicArpeggiateInputComponent.getValue()).to.be.undefined;
        musicArpeggiateInputComponent.setValue('DOWN');
        expect(musicArpeggiateInputComponent.getValue()).to.equal('DOWN');
    });
});