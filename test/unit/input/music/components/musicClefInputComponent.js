'use strict';

describe('MyScriptJS: input/music/components/musicClefInputComponent.js', function () {

    it('MusicClefInputComponent object exist', function () {
        expect(MyScript.MusicClefInputComponent).to.exist;
        expect(MyScript.MusicClefInputComponent).not.to.be.null;
        expect(MyScript.MusicClefInputComponent).to.not.be.undefined;
    });

    it('MusicClefInputComponent constructor', function () {
        var obj = new MyScript.MusicClefInputComponent();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(obj).to.be.an.instanceof(MyScript.MusicClefInputComponent);
        expect(obj).to.have.ownProperty('type');
    });

    it('MusicClefInputComponent value getter', function () {
        var obj = new MyScript.MusicClefInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicClefInput);
    });

    it('MusicClefInputComponent value setter', function () {
        var obj = new MyScript.MusicClefInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicClefInput);
        obj.setValue(new MyScript.MusicClefInput());
        expect(obj.getValue()).not.to.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicClefInput);
    });

});