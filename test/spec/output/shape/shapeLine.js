'use strict';

describe('MyScriptJS: output/shape/shapeLine.js', function () {

    var expect = require('chai').expect;

    it('ShapeLine object exist', function () {
        expect(MyScript.ShapeLine).to.exist;
        expect(MyScript.ShapeLine).not.to.be.null;
        expect(MyScript.ShapeLine).to.not.be.undefined;
    });

    it('ShapeLine constructor', function () {
        var shapeLine = new MyScript.ShapeLine();
        expect(shapeLine).to.be.an('object');
        expect(shapeLine).to.be.an.instanceof(MyScript.AbstractDecoratedShape);
        expect(shapeLine).to.be.an.instanceof(MyScript.ShapeLine);
    });

    it('ShapeLine First Point getter', function () {
        var shapeLine = new MyScript.ShapeLine();
        expect(shapeLine.getFirstPoint()).to.be.undefined;
    });

    it('ShapeLine Last Point getter', function () {
        var shapeLine = new MyScript.ShapeLine();
        expect(shapeLine.getLastPoint()).to.be.undefined;
    });

});