'use strict';

describe('MyScriptJS: output/music/musicBeam.js', function () {

    var expect = require('chai').expect;

    it('MusicBeam object exist', function () {
        expect(MyScript.MusicBeam).to.exist;
        expect(MyScript.MusicBeam).not.to.be.null;
        expect(MyScript.MusicBeam).to.not.be.undefined;
    });

    it('MusicBeam constructor', function () {
        var musicBeam = new MyScript.MusicBeam();
        expect(musicBeam).to.be.an('object');
        expect(musicBeam).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicBeam).to.be.an.instanceof(MyScript.MusicBeam);
    });

    it('MusicBeam Placement getter', function () {
        var musicBeam = new MyScript.MusicBeam();
        expect(musicBeam.getPlacement()).to.be.undefined;
    });

    it('MusicBeam Left Count getter', function () {
        var musicBeam = new MyScript.MusicBeam();
        expect(musicBeam.getLeftCount()).to.be.undefined;
    });

    it('MusicBeam Right Count getter', function () {
        var musicBeam = new MyScript.MusicBeam();
        expect(musicBeam.getRightCount()).to.be.undefined;
    });
});