'use strict';

describe('MyScriptJS: output/music/abstractMusicElement.js', function () {

    it('AbstractMusicElement object exist', function () {
        expect(MyScript.AbstractMusicElement).to.exist;
        expect(MyScript.AbstractMusicElement).not.to.be.null;
        expect(MyScript.AbstractMusicElement).to.not.be.undefined;
    });

    it('AbstractMusicElement constructor', function () {
        var abstractMusicElement = new MyScript.AbstractMusicElement();
        expect(abstractMusicElement).to.be.an('object');
        expect(abstractMusicElement).to.be.an.instanceof(MyScript.AbstractMusicElement);
        expect(abstractMusicElement).to.have.ownProperty('inputRanges');
    });

});