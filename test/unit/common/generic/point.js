'use strict';

describe('Point: common/generic/point.js', function () {

    describe('Default construction', function () {

        var point;
        before(function (done) {
            point = new MyScript.Point();
            done();
        });

        it('Check initial state', function () {
            expect(point).to.be.an('object');
            expect(point).to.be.an.instanceOf(MyScript.Point);
        });

        it('Get X', function () {
            expect(point.getX()).to.be.undefined;
        });

        it('Set X', function () {
            point.setX(6);
            expect(point.getX()).to.equal(6);
        });

        it('Get Y', function () {
            expect(point.getY()).to.be.undefined;
        });

        it('Set Y', function () {
            point.setY(10);
            expect(point.getY()).to.equal(10);
        });

    });

    describe('JSON construction', function () {

        var point;
        before(function (done) {
            point = new MyScript.Point({x: 1, y: 2});
            done();
        });

        it('Check initial state', function () {
            expect(point).to.be.an('object');
            expect(point).to.be.an.instanceOf(MyScript.Point);
        });

        it('Get X', function () {
            expect(point.getX()).to.equal(1);
        });

        it('Set X', function () {
            point.setX(6);
            expect(point.getX()).to.equal(6);
        });

        it('Get Y', function () {
            expect(point.getY()).to.equal(2);
        });

        it('Set Y', function () {
            point.setY(10);
            expect(point.getY()).to.equal(10);
        });

    });

});