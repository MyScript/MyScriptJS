'use strict';

describe('MyScriptJS: output/music/musicScoreTreeResultElement.js', function () {

    var expect = require('chai').expect;

    it('MusicScoreTreeResultElement object exist', function () {
        expect(MyScript.MusicScoreTreeResultElement).to.exist;
        expect(MyScript.MusicScoreTreeResultElement).not.to.be.null;
        expect(MyScript.MusicScoreTreeResultElement).to.not.be.undefined;
    });

    it('MusicScoreTreeResultElement constructor', function () {
        var MusicResultElement = new MyScript.MusicScoreTreeResultElement();
        expect(MusicResultElement).to.be.an('object');
        expect(MusicResultElement).to.be.an.instanceof(MyScript.MusicResultElement);
        expect(MusicResultElement).to.be.an.instanceof(MyScript.MusicScoreTreeResultElement);
    });

    it('MusicScoreTreeResultElement Type getter', function () {
        var MusicResultElement = new MyScript.MusicScoreTreeResultElement();
        expect(MusicResultElement.getScore()).to.be.undefined;
    });

});