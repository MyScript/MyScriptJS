'use strict';

describe('MusicStemInputComponent: input/music/components/musicStemInputComponent.js', function () {

    describe('Default construction', function () {

        var musicStemInputComponent;
        before(function (done) {
            musicStemInputComponent = new MyScript.MusicStemInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicStemInputComponent).to.be.an('object');
            expect(musicStemInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicStemInputComponent).to.be.an.instanceof(MyScript.MusicStemInputComponent);
            expect(musicStemInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicStemInputComponent;
        beforeEach(function (done) {
            musicStemInputComponent = new MyScript.MusicStemInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicStemInputComponent.getValue()).to.be.undefined;
        });

        it('value setter', function () {
            expect(musicStemInputComponent.getValue()).to.be.undefined;
            musicStemInputComponent.setValue('DOWN_FLAG1');
            expect(musicStemInputComponent.getValue()).not.to.be.undefined;
            expect(musicStemInputComponent.getValue()).to.be.equal('DOWN_FLAG1');
        });

    });

});