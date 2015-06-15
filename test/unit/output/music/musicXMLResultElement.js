'use strict';

describe('MusicXMLResultElement: output/music/musicXMLResultElement.js', function () {

    describe('Default construction', function () {

        var musicXMLResultElement;
        before(function (done) {
            musicXMLResultElement = new MyScript.MusicXMLResultElement();
            done();
        });

        it('Check initial state', function () {
            expect(musicXMLResultElement).to.be.an('object');
            expect(musicXMLResultElement).to.be.an.instanceOf(MyScript.MusicResultElement);
            expect(musicXMLResultElement).to.be.an.instanceOf(MyScript.MusicXMLResultElement);
        });

        it('Value getter', function () {
            expect(musicXMLResultElement.getValue()).to.be.undefined;
        });

    });

});