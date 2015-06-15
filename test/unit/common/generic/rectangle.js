'use strict';

describe('Rectangle: common/generic/rectangle.js', function () {

    describe('Default construction', function () {

        var rectangle;
        before(function (done) {
            rectangle = new MyScript.Rectangle();
            done();
        });

        it('Check initial state', function () {
            expect(rectangle).to.be.an('object');
            expect(rectangle).to.be.an.instanceOf(MyScript.Rectangle);
        });

        it('Get X', function () {
            expect(rectangle.getX()).to.be.undefined;
        });

        it('Set X', function () {
            rectangle.setX(6);
            expect(rectangle.getX()).to.equal(6);
        });

        it('Get Y', function () {
            expect(rectangle.getY()).to.be.undefined;
        });

        it('Set Y', function () {
            rectangle.setY(10);
            expect(rectangle.getY()).to.equal(10);
        });

        it('Get top left point', function () {
            expect(rectangle.getTopLeftPoint()).to.be.an.instanceOf(MyScript.Point);
        });

        it('Set top left point', function () {
            var point = new MyScript.Point({x: 10, y: 20});
            rectangle.setTopLeftPoint(point);
            expect(rectangle.getTopLeftPoint().getX()).to.equal(10);
            expect(rectangle.getTopLeftPoint().getY()).to.equal(20);
        });

        it('Get width', function () {
            expect(rectangle.getWidth()).to.be.undefined;
        });

        it('Set width', function () {
            rectangle.setWidth(10);
            expect(rectangle.getWidth()).to.equal(10);
        });

        it('Get height', function () {
            expect(rectangle.getHeight()).to.be.undefined;
        });

        it('Set height', function () {
            rectangle.setHeight(20);
            expect(rectangle.getHeight()).to.equal(20);
        });

    });

    describe('Default construction', function () {

        var rectangle;
        before(function (done) {
            rectangle = new MyScript.Rectangle({x: 1, y: 2, width: 20, height: 10});
            done();
        });

        it('Check initial state', function () {
            expect(rectangle).to.be.an('object');
            expect(rectangle).to.be.an.instanceOf(MyScript.Rectangle);
            expect(rectangle).to.have.ownProperty('x');
            expect(rectangle).to.have.ownProperty('y');
            expect(rectangle).to.have.ownProperty('width');
            expect(rectangle).to.have.ownProperty('height');
        });

        it('Get X', function () {
            expect(rectangle.getX()).to.equal(1);
        });

        it('Set X', function () {
            rectangle.setX(6);
            expect(rectangle.getX()).to.equal(6);
        });

        it('Get Y', function () {
            expect(rectangle.getY()).to.equal(2);
        });

        it('Set Y', function () {
            rectangle.setY(10);
            expect(rectangle.getY()).to.equal(10);
        });

        it('Get top left point', function () {
            expect(rectangle.getTopLeftPoint()).to.be.an.instanceOf(MyScript.Point);
        });

        it('Set top left point', function () {
            var point = new MyScript.Point({x: 10, y: 20});
            rectangle.setTopLeftPoint(point);
            expect(rectangle.getTopLeftPoint().getX()).to.equal(10);
            expect(rectangle.getTopLeftPoint().getY()).to.equal(20);
        });

        it('Get width', function () {
            expect(rectangle.getWidth()).to.equal(20);
        });

        it('Set width', function () {
            rectangle.setWidth(10);
            expect(rectangle.getWidth()).to.equal(10);
        });

        it('Get height', function () {
            expect(rectangle.getHeight()).to.equal(10);
        });

        it('Set height', function () {
            rectangle.setHeight(20);
            expect(rectangle.getHeight()).to.equal(20);
        });

    });

});