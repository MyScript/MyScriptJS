'use strict';

describe('MusicAccidentalInputComponent: input/music/components/musicAccidentalInputComponent.js', function () {

    describe('Default construction', function () {

        var musicAccidentalInputComponent;
        before(function (done) {
            musicAccidentalInputComponent = new MyScript.MusicAccidentalInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicAccidentalInputComponent).to.be.an('object');
            expect(musicAccidentalInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicAccidentalInputComponent).to.be.an.instanceof(MyScript.MusicAccidentalInputComponent);
            expect(musicAccidentalInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicAccidentalInputComponent;
        beforeEach(function (done) {
            musicAccidentalInputComponent = new MyScript.MusicAccidentalInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicAccidentalInputComponent.getValue()).to.be.undefined;
        });

        it('value setter', function () {
            expect(musicAccidentalInputComponent.getValue()).to.be.undefined;
            musicAccidentalInputComponent.setValue('NATURAL');
            expect(musicAccidentalInputComponent.getValue()).to.equal('NATURAL');
        });

    });

});