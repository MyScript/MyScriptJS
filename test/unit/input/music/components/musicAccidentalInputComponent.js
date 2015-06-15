'use strict';

describe('MusicAccidentalInputComponent: input/music/components/musicAccidentalInputComponent.js', function () {

    describe('Default construction', function () {

        var musicAccidentalInputComponent;
        before(function (done) {
            musicAccidentalInputComponent = new MyScript.MusicAccidentalInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicAccidentalInputComponent).to.be.an('object');
            expect(musicAccidentalInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicAccidentalInputComponent).to.be.an.instanceOf(MyScript.MusicAccidentalInputComponent);
            expect(musicAccidentalInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicAccidentalInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            musicAccidentalInputComponent.setValue('NATURAL');
            expect(musicAccidentalInputComponent.getValue()).to.equal('NATURAL');
        });

    });

});