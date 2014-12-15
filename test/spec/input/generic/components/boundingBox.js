'use strict';

describe('MyScriptJS: input/generic/components/boundingBox.js', function () {

    it('BoundingBox object exist', function () {
        expect(MyScript.BoundingBox).to.exist;
        expect(MyScript.BoundingBox).not.to.be.null;
        expect(MyScript.BoundingBox).to.not.be.undefined;
    });

    it('BoundingBox constructor', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox).to.be.an('object');
        expect(boundingBox).to.be.an.instanceof(MyScript.Rectangle);
        expect(boundingBox).to.be.an.instanceof(MyScript.BoundingBox);
    });

    it('BoundingBox x getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getX()).to.be.undefined;
    });

    it('BoundingBox y getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getY()).to.be.undefined;
    });

    it('BoundingBox xMin getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getXMin()).to.be.undefined;
    });

    it('BoundingBox xMin setter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getXMin()).to.be.undefined;
        boundingBox.setXMin(10);
        expect(boundingBox.getXMin()).not.to.be.undefined;
        expect(boundingBox.getXMin()).to.equal(10);
    });

    it('BoundingBox xMax getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getXMax()).to.be.undefined;
    });

    it('BoundingBox xMax setter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getXMax()).to.be.undefined;
        boundingBox.setXMax(154);
        expect(boundingBox.getXMax()).not.to.be.undefined;
        expect(boundingBox.getXMax()).to.equal(154);
    });

    it('BoundingBox yMin getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getYMin()).to.be.undefined;
    });

    it('BoundingBox yMin setter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getYMin()).to.be.undefined;
        boundingBox.setYMin(15);
        expect(boundingBox.getYMin()).not.to.be.undefined;
        expect(boundingBox.getYMin()).to.equal(15);
    });

    it('BoundingBox yMax getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getYMax()).to.be.undefined;
    });

    it('BoundingBox yMax setter', function () {
        var boundingBox = new MyScript.BoundingBox();
        expect(boundingBox.getYMax()).to.be.undefined;
        boundingBox.setYMax(258);
        expect(boundingBox.getYMax()).not.to.be.undefined;
        expect(boundingBox.getYMax()).to.equal(258);
    });

    it('BoundingBox width getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        boundingBox.setXMin(20);
        boundingBox.setXMax(60);
        expect(boundingBox.getWidth()).to.equal(40);
    });

    it('BoundingBox height getter', function () {
        var boundingBox = new MyScript.BoundingBox();
        boundingBox.setYMin(15);
        boundingBox.setYMax(160);
        expect(boundingBox.getHeight()).to.equal(145);
    });

});