'use strict';

describe('MyScriptJS: output/music/musicXMLResultElement.js', function () {

    var expect = require('chai').expect;

    it('MusicXMLResultElement object exist', function () {
        expect(MyScript.MusicXMLResultElement).to.exist;
        expect(MyScript.MusicXMLResultElement).not.to.be.null;
        expect(MyScript.MusicXMLResultElement).to.not.be.undefined;
    });

    it('MusicXMLResultElement constructor', function () {
        var musicXMLResultElement = new MyScript.MusicXMLResultElement();
        expect(musicXMLResultElement).to.be.an('object');
        expect(musicXMLResultElement).to.be.an.instanceof(MyScript.MusicResultElement);
        expect(musicXMLResultElement).to.be.an.instanceof(MyScript.MusicXMLResultElement);
    });

    it('MusicXMLResultElement Value getter', function () {
        var musicXMLResultElement = new MyScript.MusicXMLResultElement();
        expect(musicXMLResultElement.getValue()).to.be.undefined;
    });

});