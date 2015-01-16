'use strict';

describe('MyScriptJS: input/generic/components/stroke.js', function () {

    var expect = require('chai').expect;

    it('Stroke object exist', function () {
        expect(MyScript.Stroke).to.exist;
        expect(MyScript.Stroke).not.to.be.null;
        expect(MyScript.Stroke).to.not.be.undefined;
    });

    it('Stroke constructor', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke).to.be.an('object');
        expect(stroke).to.be.an.instanceof(MyScript.AbstractComponent);
        expect(stroke).to.be.an.instanceof(MyScript.Stroke);
        expect(stroke).to.have.ownProperty('type');
        expect(stroke).to.have.ownProperty('x');
        expect(stroke).to.have.ownProperty('y');
    });

    it('Stroke x getter', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke.getX()).to.be.empty;
    });

    it('Stroke x setter', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke.getX()).to.be.empty;
        stroke.setX([12,54,215,21,47]);
        expect(stroke.getX()).not.to.be.empty;
        expect(stroke.getX()).to.eql([12,54,215,21,47]);
    });

    it('Stroke add x', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke.getX()).to.be.empty;
        stroke.addX(54);
        expect(stroke.getX()).not.to.be.empty;
        expect(stroke.getX()).to.eql([54]);
    });

    it('Stroke y getter', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke.getY()).to.be.empty;
    });

    it('Stroke y setter', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke.getY()).to.be.empty;
        stroke.setY([21,45,521,12,74]);
        expect(stroke.getY()).not.to.be.empty;
        expect(stroke.getY()).to.eql([21,45,521,12,74]);
    });

    it('Stroke add y', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke.getY()).to.be.empty;
        stroke.addY(45);
        expect(stroke.getY()).not.to.be.empty;
        expect(stroke.getY()).to.eql([45]);
    });

    it('Stroke length getter', function () {
        var stroke = new MyScript.Stroke();
        expect(stroke.getLength()).to.be.equal(0);
    });

    it('Stroke boundingBox getter', function () {
        var stroke = new MyScript.Stroke();
        stroke.setX([12,54,215,21,47]);
        stroke.setY([21,45,521,12,74]);
        expect(stroke.getBoundingBox()).to.deep.equal(new MyScript.BoundingBox({ xMin: 12, xMax: 215, yMin: 12, yMax: 521}));
    });
});