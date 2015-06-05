'use strict';

describe('Stroke: input/generic/components/stroke.js', function () {

    describe('Default construction', function () {

        var stroke;
        before(function (done) {
            stroke = new MyScript.Stroke();
            done();
        });

        it('check initial state', function () {
            expect(stroke).to.be.an('object');
            expect(stroke).to.be.an.instanceof(MyScript.AbstractComponent);
            expect(stroke).to.be.an.instanceof(MyScript.Stroke);
            expect(stroke).to.have.ownProperty('type');
            expect(stroke).to.have.ownProperty('x');
            expect(stroke).to.have.ownProperty('y');
            expect(stroke).to.have.ownProperty('t');
        });

    });

    describe('Accessors', function () {

        var stroke;
        beforeEach(function (done) {
            stroke = new MyScript.Stroke();
            done();
        });

        it('x getter', function () {
            expect(stroke.getX()).to.be.empty;
        });

        it('x setter', function () {
            expect(stroke.getX()).to.be.empty;
            stroke.setX([12, 54, 215, 21, 47]);
            expect(stroke.getX()).not.to.be.empty;
            expect(stroke.getX()).to.eql([12, 54, 215, 21, 47]);
        });

        it('add x', function () {
            expect(stroke.getX()).to.be.empty;
            stroke.addX(54);
            expect(stroke.getX()).not.to.be.empty;
            expect(stroke.getX()).to.eql([54]);
        });

        it('y getter', function () {
            expect(stroke.getY()).to.be.empty;
        });

        it('y setter', function () {
            expect(stroke.getY()).to.be.empty;
            stroke.setY([21, 45, 521, 12, 74]);
            expect(stroke.getY()).not.to.be.empty;
            expect(stroke.getY()).to.eql([21, 45, 521, 12, 74]);
        });

        it('add y', function () {
            expect(stroke.getY()).to.be.empty;
            stroke.addY(45);
            expect(stroke.getY()).not.to.be.empty;
            expect(stroke.getY()).to.eql([45]);
        });

        it('t getter', function () {
            expect(stroke.getT()).to.be.empty;
        });

        it('t setter', function () {
            expect(stroke.getT()).to.be.empty;
            stroke.setT([1424085446156, 1424085446159, 1424085446164, 1424085446171, 1424085446175]);
            expect(stroke.getT()).not.to.be.empty;
            expect(stroke.getT()).to.eql([1424085446156, 1424085446159, 1424085446164, 1424085446171, 1424085446175]);
        });

        it('add t', function () {
            expect(stroke.getT()).to.be.empty;
            stroke.addT(1424085446156);
            expect(stroke.getT()).not.to.be.empty;
            expect(stroke.getT()).to.eql([1424085446156]);
        });

        it('length getter', function () {
            expect(stroke.getLength()).to.be.equal(0);
        });

        it('boundingBox getter', function () {
            stroke.setX([12, 54, 215, 21, 47]);
            stroke.setY([21, 45, 521, 12, 74]);

            var boundingBox = new MyScript.Rectangle();
            boundingBox.setX(12);
            boundingBox.setY(12);
            boundingBox.setWidth(215 - 12);
            boundingBox.setHeight(521 - 12);
            expect(stroke.getBoundingBox()).to.deep.equal(boundingBox);
        });

    });

});