'use strict';

describe('Stroke: input/generic/components/stroke.js', function () {

    describe('Default construction', function () {

        var stroke;
        before(function (done) {
            stroke = new MyScript.Stroke();
            done();
        });

        it('Check initial state', function () {
            expect(stroke).to.be.an('object');
            expect(stroke).to.be.an.instanceof(MyScript.AbstractComponent);
            expect(stroke).to.be.an.instanceof(MyScript.Stroke);
            expect(stroke).to.have.ownProperty('type');
            expect(stroke).to.have.ownProperty('x');
            expect(stroke).to.have.ownProperty('y');
            expect(stroke).to.have.ownProperty('t');
        });

        it('Get x', function () {
            expect(stroke.getX()).to.be.empty;
        });

        it('Set x', function () {
            stroke.setX([12, 54, 215, 21, 47]);
            expect(stroke.getX()).not.to.be.empty;
            expect(stroke.getX()).to.eql([12, 54, 215, 21, 47]);
        });

        it('Add x', function () {
            var length = stroke.getX().length;
            stroke.addX(undefined);
            expect(stroke.getX().length).to.eql(length);
            stroke.addX(54);
            expect(stroke.getX().length).to.eql(length + 1);
        });

        it('Get y', function () {
            expect(stroke.getY()).to.be.empty;
        });

        it('Set y', function () {
            stroke.setY([21, 45, 521, 12, 74]);
            expect(stroke.getY()).not.to.be.empty;
            expect(stroke.getY()).to.eql([21, 45, 521, 12, 74]);
        });

        it('Add y', function () {
            var length = stroke.getY().length;
            stroke.addY(undefined);
            expect(stroke.getY().length).to.eql(length);
            stroke.addY(45);
            expect(stroke.getY().length).to.eql(length + 1);
        });

        it('Get t', function () {
            expect(stroke.getT()).to.be.empty;
        });

        it('Set t', function () {
            stroke.setT([1424085446156, 1424085446159, 1424085446164, 1424085446171, 1424085446175]);
            expect(stroke.getT()).not.to.be.empty;
            expect(stroke.getT()).to.eql([1424085446156, 1424085446159, 1424085446164, 1424085446171, 1424085446175]);
        });

        it('Add t', function () {
            var length = stroke.getT().length;
            stroke.addT(undefined);
            expect(stroke.getT().length).to.eql(length);
            stroke.addT(1424085446156);
            expect(stroke.getT().length).to.eql(length + 1);
        });

        it('Get length', function () {
            var length = stroke.getX().length;
            expect(stroke.getLength()).to.be.equal(length);
        });

        it('Get bounding box', function () {
            var boundingBox = new MyScript.Rectangle();
            boundingBox.setX(12);
            boundingBox.setY(12);
            boundingBox.setWidth(215 - 12);
            boundingBox.setHeight(521 - 12);
            expect(stroke.getBoundingBox()).to.deep.equal(boundingBox);
        });

    });

});