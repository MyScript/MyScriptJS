'use strict';

describe('MyScriptJS: output/math/mathDocument.js', function () {

    var expect = require('chai').expect;

    it('MathDocument object exist', function () {
        expect(MyScript.MathDocument).to.exist;
        expect(MyScript.MathDocument).not.to.be.null;
        expect(MyScript.MathDocument).to.not.be.undefined;
    });

    it('MathDocument constructor', function () {
        var mathDocument = new MyScript.MathDocument();
        expect(mathDocument).to.be.an('object');
        expect(mathDocument).to.be.an.instanceof(MyScript.MathDocument);
        expect(mathDocument).to.have.ownProperty('results');
        expect(mathDocument).to.have.ownProperty('scratchOutResults');
    });

    it('MathDocument Result Elements getter', function () {
        var mathDocument = new MyScript.MathDocument();
        expect(mathDocument.getResultElements()).to.be.empty;
    });

    it('MathDocument Scratch Out Results getter', function () {
        var mathDocument = new MyScript.MathDocument();
        expect(mathDocument.getScratchOutResults()).to.be.empty;
    });

});