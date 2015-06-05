'use strict';

describe('QuadraticPoint: common/generic/quadraticPoint.js', function () {

    describe('Default construction', function () {

        var quadraticPoint;
        before(function (done) {
            quadraticPoint = new MyScript.QuadraticPoint();
            done();
        });

        it('Check initial state', function () {
            expect(quadraticPoint).to.be.an('object');
            expect(quadraticPoint).to.be.an.instanceof(MyScript.Point);
            expect(quadraticPoint).to.be.an.instanceof(MyScript.QuadraticPoint);
            expect(quadraticPoint).to.have.ownProperty('pressure');
            expect(quadraticPoint).to.have.ownProperty('distance');
            expect(quadraticPoint).to.have.ownProperty('length');
            expect(quadraticPoint).to.have.ownProperty('cos');
            expect(quadraticPoint).to.have.ownProperty('sin');
            expect(quadraticPoint).to.have.ownProperty('p1');
            expect(quadraticPoint).to.have.ownProperty('p2');
        });

        it('Get pressure', function () {
            expect(quadraticPoint.getPressure()).to.equal(0.5);
        });

        it('Set pressure', function () {
            quadraticPoint.setPressure(1.0);
            expect(quadraticPoint.getPressure()).to.equal(1.0);
        });

        it('Get distance', function () {
            expect(quadraticPoint.getDistance()).to.equal(0.0);
        });

        it('Set distance', function () {
            quadraticPoint.setDistance(1.0);
            expect(quadraticPoint.getDistance()).to.equal(1.0);
        });

        it('Get length', function () {
            expect(quadraticPoint.getLength()).to.equal(0.0);
        });

        it('Set length', function () {
            expect(quadraticPoint.getLength()).to.equal(0.0);
            quadraticPoint.setLength(1.0);
            expect(quadraticPoint.getLength()).to.equal(1.0);
        });

        it('Get cos', function () {
            expect(quadraticPoint.getCos()).to.equal(0.0);
        });

        it('Set cos', function () {
            quadraticPoint.setCos(1.0);
            expect(quadraticPoint.getCos()).to.equal(1.0);
        });

        it('Get sin', function () {
            expect(quadraticPoint.getSin()).to.equal(0.0);
        });

        it('Set sin', function () {
            quadraticPoint.setSin(1.0);
            expect(quadraticPoint.getSin()).to.equal(1.0);
        });

        it('Get P1', function () {
            expect(quadraticPoint.getP1()).to.be.an.instanceOf(MyScript.Point);
            expect(quadraticPoint.getP1().getX()).to.equal(quadraticPoint.getX());
            expect(quadraticPoint.getP1().getY()).to.equal(quadraticPoint.getY());
        });

        it('Set P1', function () {
            var point = new MyScript.Point({x:1, y:2});
            quadraticPoint.setP1(point);
            expect(quadraticPoint.getP1()).to.equal(point);
        });

        it('Get P2', function () {
            expect(quadraticPoint.getP2()).to.be.an.instanceOf(MyScript.Point);
            expect(quadraticPoint.getP2().getX()).to.equal(quadraticPoint.getX());
            expect(quadraticPoint.getP2().getY()).to.equal(quadraticPoint.getY());
        });

        it('Set P2', function () {
            var point = new MyScript.Point({x:1, y:2});
            quadraticPoint.setP2(point);
            expect(quadraticPoint.getP2()).to.equal(point);
        });

    });

});