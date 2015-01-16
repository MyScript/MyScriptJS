'use strict';

describe('MyScriptJS: common/generic/quadraticPoint.js', function () {

    var expect = require('chai').expect;

    it('QuadraticPoint object exist', function () {
        expect(MyScript.QuadraticPoint).to.exist;
        expect(MyScript.QuadraticPoint).not.to.be.null;
        expect(MyScript.QuadraticPoint).to.not.be.undefined;
    });

    it('QuadraticPoint constructor', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint).to.be.an('object');
        expect(quadraticPoint).to.be.an.instanceof(MyScript.Point);
        expect(quadraticPoint).to.be.an.instanceof(MyScript.QuadraticPoint);
        expect(quadraticPoint).to.have.ownProperty('pressure');
        expect(quadraticPoint).to.have.ownProperty('distance');
        expect(quadraticPoint).to.have.ownProperty('length');
        expect(quadraticPoint).to.have.ownProperty('ux');
        expect(quadraticPoint).to.have.ownProperty('uy');
        expect(quadraticPoint).to.have.ownProperty('x1');
        expect(quadraticPoint).to.have.ownProperty('x2');
        expect(quadraticPoint).to.have.ownProperty('y1');
        expect(quadraticPoint).to.have.ownProperty('y2');
    });

    it('QuadraticPoint Pressure getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getPressure()).to.be.equal(0.5);
    });

    it('QuadraticPoint Pressure setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getPressure()).to.be.equal(0.5);
        quadraticPoint.setPressure(1.0);
        expect(quadraticPoint.getPressure()).to.be.equal(1.0);
    });

    it('QuadraticPoint Distance getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getDistance()).to.be.equal(0.0);
    });

    it('QuadraticPoint Distance setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getDistance()).to.be.equal(0.0);
        quadraticPoint.setDistance(1.0);
        expect(quadraticPoint.getDistance()).to.be.equal(1.0);
    });

    it('QuadraticPoint Length getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getLength()).to.be.equal(0.0);
    });

    it('QuadraticPoint Length setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getLength()).to.be.equal(0.0);
        quadraticPoint.setLength(1.0);
        expect(quadraticPoint.getLength()).to.be.equal(1.0);
    });

    it('QuadraticPoint Ux getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getUx()).to.be.equal(0.0);
    });

    it('QuadraticPoint Ux setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getUx()).to.be.equal(0.0);
        quadraticPoint.setUx(1.0);
        expect(quadraticPoint.getUx()).to.be.equal(1.0);
    });

    it('QuadraticPoint Uy getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getUy()).to.be.equal(0.0);
    });

    it('QuadraticPoint Uy setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getUy()).to.be.equal(0.0);
        quadraticPoint.setUy(1.0);
        expect(quadraticPoint.getUy()).to.be.equal(1.0);
    });

    it('QuadraticPoint X1 getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getX1()).to.be.equal(0.0);
    });

    it('QuadraticPoint X1 setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getX1()).to.be.equal(0.0);
        quadraticPoint.setX1(1.0);
        expect(quadraticPoint.getX1()).to.be.equal(1.0);
    });

    it('QuadraticPoint X2 getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getX2()).to.be.equal(0.0);
    });

    it('QuadraticPoint X2 setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getX2()).to.be.equal(0.0);
        quadraticPoint.setX2(1.0);
        expect(quadraticPoint.getX2()).to.be.equal(1.0);
    });

    it('QuadraticPoint Y1 getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getY1()).to.be.equal(0.0);
    });

    it('QuadraticPoint Y1 setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getY1()).to.be.equal(0.0);
        quadraticPoint.setY1(1.0);
        expect(quadraticPoint.getY1()).to.be.equal(1.0);
    });

    it('QuadraticPoint Y2 getter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getY2()).to.be.equal(0.0);
    });

    it('QuadraticPoint Y2 setter', function () {
        var quadraticPoint = new MyScript.QuadraticPoint({x:0, y:0});
        expect(quadraticPoint.getY2()).to.be.equal(0.0);
        quadraticPoint.setY2(1.0);
        expect(quadraticPoint.getY2()).to.be.equal(1.0);
    });
});