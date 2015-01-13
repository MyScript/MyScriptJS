'use strict';

describe('MyScriptJS: output/shape/abstractDecoratedShape.js', function () {

    it('AbstractDecoratedShape object exist', function () {
        expect(MyScript.AbstractDecoratedShape).to.exist;
        expect(MyScript.AbstractDecoratedShape).not.to.be.null;
        expect(MyScript.AbstractDecoratedShape).to.not.be.undefined;
    });

    it('AbstractDecoratedShape constructor', function () {
        var abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
        expect(abstractDecoratedShape).to.be.an('object');
        expect(abstractDecoratedShape).to.be.an.instanceof(MyScript.AbstractShapePrimitive);
        expect(abstractDecoratedShape).to.be.an.instanceof(MyScript.AbstractDecoratedShape);
    });

    it('AbstractDecoratedShape Has Begin Decoration', function () {
        var abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
        expect(abstractDecoratedShape.hasBeginDecoration()).to.be.undefined;
    });

    it('AbstractDecoratedShape Has End Decoration', function () {
        var abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
        expect(abstractDecoratedShape.hasEndDecoration()).to.be.undefined;
    });

    it('AbstractDecoratedShape Begin Decoration getter', function () {
        var abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
        expect(abstractDecoratedShape.getBeginDecoration()).to.be.undefined;
    });

    it('AbstractDecoratedShape End Decoration getter', function () {
        var abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
        expect(abstractDecoratedShape.getEndDecoration()).to.be.undefined;
    });

    it('AbstractDecoratedShape Begin Tangent Angle getter', function () {
        var abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
        expect(abstractDecoratedShape.getBeginTangentAngle()).to.be.undefined;
    });

    it('AbstractDecoratedShape End Tangent Angle getter', function () {
        var abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
        expect(abstractDecoratedShape.getEndTangentAngle()).to.be.undefined;
    });
});