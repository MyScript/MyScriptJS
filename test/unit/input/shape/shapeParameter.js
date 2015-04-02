'use strict';

describe('MyScriptJS: input/shape/shapeParameter.js', function () {

    it('ShapeParameter object exist', function () {
        expect(MyScript.ShapeParameter).to.exist;
        expect(MyScript.ShapeParameter).not.to.be.null;
        expect(MyScript.ShapeParameter).to.not.be.undefined;
    });

    it('ShapeParameter constructor', function () {
        var shapeParameter = new MyScript.ShapeParameter();
        expect(shapeParameter).to.be.an('object');
        expect(shapeParameter).to.be.an.instanceof(MyScript.AbstractParameter);
        expect(shapeParameter).to.be.an.instanceof(MyScript.ShapeParameter);
    });

    it('ShapeParameter Reject Detection Sensitivity getter', function () {
        var shapeParameter = new MyScript.ShapeParameter();
        expect(shapeParameter.getRejectDetectionSensitivity()).to.be.undefined;
    });

    it('ShapeParameter Reject Detection Sensitivity setter', function () {
        var shapeParameter = new MyScript.ShapeParameter();
        expect(shapeParameter.getRejectDetectionSensitivity()).to.be.undefined;
        shapeParameter.setRejectDetectionSensitivity(true);
        expect(shapeParameter.getRejectDetectionSensitivity()).not.to.be.undefined;
        expect(shapeParameter.getRejectDetectionSensitivity()).to.be.true;
    });

    it('ShapeParameter has Beautification getter', function () {
        var shapeParameter = new MyScript.ShapeParameter();
        expect(shapeParameter.hasBeautification()).to.be.undefined;
    });

    it('ShapeParameter has Beautification setter', function () {
        var shapeParameter = new MyScript.ShapeParameter();
        expect(shapeParameter.hasBeautification()).to.be.undefined;
        shapeParameter.setBeautification(true);
        expect(shapeParameter.hasBeautification()).not.to.be.undefined;
        expect(shapeParameter.hasBeautification()).to.be.true;
    });

    it('ShapeParameter user resources getter', function () {
        var shapeParameter = new MyScript.ShapeParameter();
        expect(shapeParameter.getUserResources()).to.be.empty;
    });

    it('ShapeParameter user resources setter', function () {
        var shapeParameter = new MyScript.ShapeParameter();
        expect(shapeParameter.getUserResources()).to.be.undefined;

        shapeParameter.setUserResources(['shape-ak', 'shape-grm-standard']);
        expect(shapeParameter.getUserResources().length).to.equal(2);
        expect(shapeParameter.getUserResources()[0]).to.equal('shape-ak');
        expect(shapeParameter.getUserResources()[1]).to.equal('shape-grm-standard');
    });
});