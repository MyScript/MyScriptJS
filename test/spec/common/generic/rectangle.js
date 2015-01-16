'use strict';

describe('MyScriptJS: common/generic/rectangle.js', function () {

    var expect = require('chai').expect;

    it('Rectangle object exist', function () {
        expect(MyScript.Rectangle).to.exist;
        expect(MyScript.Rectangle).not.to.be.null;
        expect(MyScript.Rectangle).to.not.be.undefined;
    });

    it('Rectangle constructor', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle).to.be.an('object');
        expect(rectangle).to.be.an.instanceof(MyScript.Rectangle);
        expect(rectangle).to.have.ownProperty('x');
        expect(rectangle).to.have.ownProperty('y');
        expect(rectangle).to.have.ownProperty('width');
        expect(rectangle).to.have.ownProperty('height');
    });

    it('Rectangle X getter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getX()).to.be.an('number');
        expect(rectangle.getX()).to.equal(0);
    });

    it('Rectangle X setter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getX()).to.equal(0);
        rectangle.setX(6);
        expect(rectangle.getX()).to.equal(6);
    });

    it('Rectangle Y getter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getY()).to.be.an('number');
        expect(rectangle.getY()).to.equal(0);
    });

    it('Rectangle Y setter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getY()).to.equal(0);
        rectangle.setY(10);
        expect(rectangle.getY()).to.equal(10);
    });

    it('Rectangle top left point getter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
        expect(rectangle.getTopLeftPoint().getX()).to.equal(0);
        expect(rectangle.getTopLeftPoint().getY()).to.equal(0);
    });

    it('Rectangle top left point setter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        var point = new MyScript.Point({x:10, y:20});
        expect(rectangle.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
        expect(rectangle.getTopLeftPoint().getX()).to.equal(0);
        expect(rectangle.getTopLeftPoint().getY()).to.equal(0);
        rectangle.setTopLeftPoint(point);
        expect(rectangle.getTopLeftPoint()).to.be.an.instanceof(MyScript.Point);
        expect(rectangle.getTopLeftPoint().getX()).to.equal(10);
        expect(rectangle.getTopLeftPoint().getY()).to.equal(20);
    });

    it('Rectangle width getter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getWidth()).to.be.an('number');
        expect(rectangle.getWidth()).to.equal(20);
    });

    it('Rectangle width setter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getWidth()).to.equal(20);
        rectangle.setWidth(10);
        expect(rectangle.getWidth()).to.equal(10);
    });

    it('Rectangle height getter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getHeight()).to.be.an('number');
        expect(rectangle.getHeight()).to.equal(10);
    });

    it('Rectangle height setter', function () {
        var rectangle = new MyScript.Rectangle({x:0, y:0, width: 20, height: 10});
        expect(rectangle.getHeight()).to.equal(10);
        rectangle.setHeight(20);
        expect(rectangle.getHeight()).to.equal(20);
    });

});