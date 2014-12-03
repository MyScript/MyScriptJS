'use strict';

describe('MyScriptJS: common/generic/point.js', function () {

    it('Point object exist', function () {
        expect(MyScript.Point).to.exist;
        expect(MyScript.Point).not.to.be.null;
        expect(MyScript.Point).to.not.be.undefined;
    });

    it('Point constructor', function () {
        var point = new MyScript.Point({x:0, y:0});
        expect(point).to.be.an('object');
        expect(point).to.be.an.instanceof(MyScript.Point);
        expect(point).to.have.ownProperty('x');
        expect(point).to.have.ownProperty('y');
    });

    it('Point X getter', function () {
        var point = new MyScript.Point({x:0, y:0});
        expect(point).to.have.ownProperty('x');
        expect(point.getX()).to.be.an('number');
        expect(point.getX()).to.equal(0);
    });

    it('Point X setter', function () {
        var point = new MyScript.Point({x:0, y:0});
        expect(point.getX()).to.equal(0);
        point.setX(6);
        expect(point.getX()).to.equal(6);
    });

    it('Point Y getter', function () {
        var point = new MyScript.Point({x:0, y:0});
        expect(point).to.have.ownProperty('y');
        expect(point.getY()).to.be.an('number');
        expect(point.getY()).to.equal(0);
    });

    it('Point Y setter', function () {
        var point = new MyScript.Point({x:0, y:0});
        expect(point.getY()).to.equal(0);
        point.setY(10);
        expect(point.getY()).to.equal(10);
    });

});