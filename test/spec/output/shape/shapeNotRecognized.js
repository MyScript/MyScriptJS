'use strict';

describe('MyScriptJS: output/shape/shapeNotRecognized.js', function () {

    var expect = require('chai').expect;

    it('ShapeNotRecognized object exist', function () {
        expect(MyScript.ShapeNotRecognized).to.exist;
        expect(MyScript.ShapeNotRecognized).not.to.be.null;
        expect(MyScript.ShapeNotRecognized).to.not.be.undefined;
    });

    it('ShapeNotRecognized constructor', function () {
        var shapeNotRecognized = new MyScript.ShapeNotRecognized();
        expect(shapeNotRecognized).to.be.an('object');
        expect(shapeNotRecognized).to.be.an.instanceof(MyScript.ShapeCandidate);
        expect(shapeNotRecognized).to.be.an.instanceof(MyScript.ShapeNotRecognized);
    });
});