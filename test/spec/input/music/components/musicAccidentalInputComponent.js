'use strict';

describe('MyScriptJS: input/music/components/musicAccidentalInputComponent.js', function () {

    var expect = require('chai').expect;

    it('MusicAccidentalInputComponent object exist', function () {
        expect(MyScript.MusicAccidentalInputComponent).to.exist;
        expect(MyScript.MusicAccidentalInputComponent).not.to.be.null;
        expect(MyScript.MusicAccidentalInputComponent).to.not.be.undefined;
    });

    it('MusicAccidentalInputComponent constructor', function () {
        var musicAccidentalInputComponent = new MyScript.MusicAccidentalInputComponent();
        expect(musicAccidentalInputComponent).to.be.an('object');
        expect(musicAccidentalInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicAccidentalInputComponent).to.be.an.instanceof(MyScript.MusicAccidentalInputComponent);
        expect(musicAccidentalInputComponent).to.have.ownProperty('type');
    });

    it('MusicAccidentalInputComponent value getter', function () {
        var musicAccidentalInputComponent = new MyScript.MusicAccidentalInputComponent();
        expect(musicAccidentalInputComponent.getValue()).to.be.undefined;
    });

    it('MusicAccidentalInputComponent value setter', function () {
        var musicAccidentalInputComponent = new MyScript.MusicAccidentalInputComponent();
        expect(musicAccidentalInputComponent.getValue()).to.be.undefined;
        musicAccidentalInputComponent.setValue('NATURAL');
        expect(musicAccidentalInputComponent.getValue()).to.equal('NATURAL');
    });
});