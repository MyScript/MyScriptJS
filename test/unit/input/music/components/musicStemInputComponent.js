'use strict';

describe('MusicStemInputComponent: input/music/components/musicStemInputComponent.js', function () {

    describe('Default construction', function () {

        var musicStemInputComponent;
        before(function (done) {
            musicStemInputComponent = new MyScript.MusicStemInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicStemInputComponent).to.be.an('object');
            expect(musicStemInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicStemInputComponent).to.be.an.instanceOf(MyScript.MusicStemInputComponent);
            expect(musicStemInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicStemInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            musicStemInputComponent.setValue('DOWN_FLAG1');
            expect(musicStemInputComponent.getValue()).not.to.be.undefined;
            expect(musicStemInputComponent.getValue()).to.equal('DOWN_FLAG1');
        });

    });

});