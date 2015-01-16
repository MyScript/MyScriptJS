'use strict';

describe('MyScriptJS: output/shape/shapeErased.js', function () {

    it('ShapeErased object exist', function () {
        expect(MyScript.ShapeErased).to.exist;
        expect(MyScript.ShapeErased).not.to.be.null;
        expect(MyScript.ShapeErased).to.not.be.undefined;
    });

    it('ShapeErased constructor', function () {
        var shapeErased = new MyScript.ShapeErased();
        expect(shapeErased).to.be.an('object');
        expect(shapeErased).to.be.an.instanceof(MyScript.ShapeErased);
    });
});