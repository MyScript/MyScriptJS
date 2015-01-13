'use strict';

describe('MyScriptJS: output/shape/abstractShapePrimitive.js', function () {

    it('AbstractShapePrimitive object exist', function () {
        expect(MyScript.AbstractShapePrimitive).to.exist;
        expect(MyScript.AbstractShapePrimitive).not.to.be.null;
        expect(MyScript.AbstractShapePrimitive).to.not.be.undefined;
    });

    it('AbstractShapePrimitive constructor', function () {
        var abstractShapePrimitive = new MyScript.AbstractShapePrimitive();
        expect(abstractShapePrimitive).to.be.an('object');
        expect(abstractShapePrimitive).to.be.an.instanceof(MyScript.AbstractShapePrimitive);
    });

    it('AbstractShapePrimitive Type getter', function () {
        var abstractShapePrimitive = new MyScript.AbstractShapePrimitive();
        expect(abstractShapePrimitive.getType()).to.be.undefined;
    });

    it('AbstractShapePrimitive Is Line getter', function () {
        var abstractShapePrimitive = new MyScript.AbstractShapePrimitive();
        expect(abstractShapePrimitive.isLine()).to.be.false;
    });

    it('AbstractShapePrimitive Is Ellipse getter', function () {
        var abstractShapePrimitive = new MyScript.AbstractShapePrimitive();
        expect(abstractShapePrimitive.isEllipse()).to.be.false;
    });
});