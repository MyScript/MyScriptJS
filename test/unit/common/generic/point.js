'use strict';

describe('Point: common/generic/point.js', function () {

    describe('Default construction', function () {

        var point;
        before(function (done) {
            point = new MyScript.Point({x: 0, y: 0});
            done();
        });

        it('check initial state', function () {
            expect(point).to.be.an('object');
            expect(point).to.be.an.instanceof(MyScript.Point);
            expect(point).to.have.ownProperty('x');
            expect(point).to.have.ownProperty('y');
        });

    });

    describe('Accessors', function () {

        var point;
        beforeEach(function (done) {
            point = new MyScript.Point({x: 0, y: 0});
            done();
        });

        it('X getter', function () {
            expect(point.getX()).to.be.an('number');
            expect(point.getX()).to.equal(0);
        });

        it('X setter', function () {
            expect(point.getX()).to.equal(0);
            point.setX(6);
            expect(point.getX()).to.equal(6);
        });

        it('Y getter', function () {
            expect(point.getY()).to.be.an('number');
            expect(point.getY()).to.equal(0);
        });

        it('Y setter', function () {
            expect(point.getY()).to.equal(0);
            point.setY(10);
            expect(point.getY()).to.equal(10);
        });
    });

});