'use strict';

describe('QuadraticPoint: common/generic/quadraticPoint.js', function () {

    describe('Default construction', function () {

        var quadraticPoint;
        before(function (done) {
            quadraticPoint = new MyScript.QuadraticPoint({x: 0, y: 0});
            done();
        });

        it('check initial state', function () {
            expect(quadraticPoint).to.be.an('object');
            expect(quadraticPoint).to.be.an.instanceof(MyScript.Point);
            expect(quadraticPoint).to.be.an.instanceof(MyScript.QuadraticPoint);
            expect(quadraticPoint).to.have.ownProperty('pressure');
            expect(quadraticPoint).to.have.ownProperty('distance');
            expect(quadraticPoint).to.have.ownProperty('length');
            expect(quadraticPoint).to.have.ownProperty('cos');
            expect(quadraticPoint).to.have.ownProperty('sin');
            expect(quadraticPoint).to.have.ownProperty('x1');
            expect(quadraticPoint).to.have.ownProperty('x2');
            expect(quadraticPoint).to.have.ownProperty('y1');
            expect(quadraticPoint).to.have.ownProperty('y2');
        });

    });

    describe('Accessors', function () {

        var quadraticPoint;
        beforeEach(function (done) {
            quadraticPoint = new MyScript.QuadraticPoint({x: 0, y: 0});
            done();
        });

        it('Pressure getter', function () {
            expect(quadraticPoint.getPressure()).to.be.equal(0.5);
        });

        it('Pressure setter', function () {
            expect(quadraticPoint.getPressure()).to.be.equal(0.5);
            quadraticPoint.setPressure(1.0);
            expect(quadraticPoint.getPressure()).to.be.equal(1.0);
        });

        it('Distance getter', function () {
            expect(quadraticPoint.getDistance()).to.be.equal(0.0);
        });

        it('Distance setter', function () {
            expect(quadraticPoint.getDistance()).to.be.equal(0.0);
            quadraticPoint.setDistance(1.0);
            expect(quadraticPoint.getDistance()).to.be.equal(1.0);
        });

        it('Length getter', function () {
            expect(quadraticPoint.getLength()).to.be.equal(0.0);
        });

        it('Length setter', function () {
            expect(quadraticPoint.getLength()).to.be.equal(0.0);
            quadraticPoint.setLength(1.0);
            expect(quadraticPoint.getLength()).to.be.equal(1.0);
        });

        it('Ux getter', function () {
            expect(quadraticPoint.getCos()).to.be.equal(0.0);
        });

        it('Ux setter', function () {
            expect(quadraticPoint.getCos()).to.be.equal(0.0);
            quadraticPoint.setCos(1.0);
            expect(quadraticPoint.getCos()).to.be.equal(1.0);
        });

        it('Uy getter', function () {
            expect(quadraticPoint.getSin()).to.be.equal(0.0);
        });

        it('Uy setter', function () {
            expect(quadraticPoint.getSin()).to.be.equal(0.0);
            quadraticPoint.setSin(1.0);
            expect(quadraticPoint.getSin()).to.be.equal(1.0);
        });

        it('X1 getter', function () {
            expect(quadraticPoint.getX1()).to.be.equal(0.0);
        });

        it('X1 setter', function () {
            expect(quadraticPoint.getX1()).to.be.equal(0.0);
            quadraticPoint.setX1(1.0);
            expect(quadraticPoint.getX1()).to.be.equal(1.0);
        });

        it('X2 getter', function () {
            expect(quadraticPoint.getX2()).to.be.equal(0.0);
        });

        it('X2 setter', function () {
            expect(quadraticPoint.getX2()).to.be.equal(0.0);
            quadraticPoint.setX2(1.0);
            expect(quadraticPoint.getX2()).to.be.equal(1.0);
        });

        it('Y1 getter', function () {
            expect(quadraticPoint.getY1()).to.be.equal(0.0);
        });

        it('Y1 setter', function () {
            expect(quadraticPoint.getY1()).to.be.equal(0.0);
            quadraticPoint.setY1(1.0);
            expect(quadraticPoint.getY1()).to.be.equal(1.0);
        });

        it('Y2 getter', function () {
            expect(quadraticPoint.getY2()).to.be.equal(0.0);
        });

        it('Y2 setter', function () {
            expect(quadraticPoint.getY2()).to.be.equal(0.0);
            quadraticPoint.setY2(1.0);
            expect(quadraticPoint.getY2()).to.be.equal(1.0);
        });

    });

});