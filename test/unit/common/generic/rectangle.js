'use strict';

describe('Rectangle: common/generic/rectangle.js', function () {

    describe('Default construction', function () {

        var rectangle;
        before(function (done) {
            rectangle = new MyScript.Rectangle({x: 0, y: 0, width: 20, height: 10});
            done();
        });

        it('check initial state', function () {
            expect(rectangle).to.be.an('object');
            expect(rectangle).to.be.an.instanceof(MyScript.Rectangle);
            expect(rectangle).to.have.ownProperty('x');
            expect(rectangle).to.have.ownProperty('y');
            expect(rectangle).to.have.ownProperty('width');
            expect(rectangle).to.have.ownProperty('height');
        });

    });

    describe('Accessors', function () {

        var rectangle;
        beforeEach(function (done) {
            rectangle = new MyScript.Rectangle({x: 0, y: 0, width: 20, height: 10});
            done();
        });

        it('X getter', function () {
            expect(rectangle.getX()).to.be.an('number');
            expect(rectangle.getX()).to.equal(0);
        });

        it('X setter', function () {
            expect(rectangle.getX()).to.equal(0);
            rectangle.setX(6);
            expect(rectangle.getX()).to.equal(6);
        });

        it('Y getter', function () {
            expect(rectangle.getY()).to.be.an('number');
            expect(rectangle.getY()).to.equal(0);
        });

        it('Y setter', function () {
            expect(rectangle.getY()).to.equal(0);
            rectangle.setY(10);
            expect(rectangle.getY()).to.equal(10);
        });

        it('Top left point getter', function () {
            expect(rectangle.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
            expect(rectangle.getTopLeftPoint().getX()).to.equal(0);
            expect(rectangle.getTopLeftPoint().getY()).to.equal(0);
        });

        it('Top left point setter', function () {
            var point = new MyScript.Point({x: 10, y: 20});
            expect(rectangle.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
            expect(rectangle.getTopLeftPoint().getX()).to.equal(0);
            expect(rectangle.getTopLeftPoint().getY()).to.equal(0);
            rectangle.setTopLeftPoint(point);
            expect(rectangle.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
            expect(rectangle.getTopLeftPoint().getX()).to.equal(10);
            expect(rectangle.getTopLeftPoint().getY()).to.equal(20);
        });

        it('Width getter', function () {
            expect(rectangle.getWidth()).to.be.an('number');
            expect(rectangle.getWidth()).to.equal(20);
        });

        it('Width setter', function () {
            expect(rectangle.getWidth()).to.equal(20);
            rectangle.setWidth(10);
            expect(rectangle.getWidth()).to.equal(10);
        });

        it('Height getter', function () {
            expect(rectangle.getHeight()).to.be.an('number');
            expect(rectangle.getHeight()).to.equal(10);
        });

        it('Height setter', function () {
            expect(rectangle.getHeight()).to.equal(10);
            rectangle.setHeight(20);
            expect(rectangle.getHeight()).to.equal(20);
        });

    });

});