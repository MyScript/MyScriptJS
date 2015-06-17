'use strict';

describe('StrokeComponent: input/generic/components/strokeComponent.js', function () {

    describe('Default construction', function () {

        var stroke;
        before(function (done) {
            stroke = new MyScript.StrokeComponent();
            done();
        });

        it('Check initial state', function () {
            expect(stroke).to.be.an('object');
            expect(stroke).to.be.an.instanceOf(MyScript.AbstractComponent);
            expect(stroke).to.be.an.instanceOf(MyScript.Stroke);
            expect(stroke).to.be.an.instanceOf(MyScript.StrokeComponent);
            expect(stroke).to.have.ownProperty('type');
            expect(stroke).to.have.ownProperty('x');
            expect(stroke).to.have.ownProperty('y');
            expect(stroke).to.have.ownProperty('t');
            expect(stroke).to.have.ownProperty('p');
            expect(stroke).to.have.ownProperty('d');
            expect(stroke).to.have.ownProperty('l');
            expect(stroke).to.have.ownProperty('color');
            expect(stroke).to.have.ownProperty('alpha');
            expect(stroke).to.have.ownProperty('width');
        });

        it('Get p', function () {
            expect(stroke.getP().length).to.equal(0);
        });

        it('Set p', function () {
            stroke.setP([12, 54, 215, 21, 47]);
            expect(stroke.getP().length).to.equal(5);
        });

        it('Add p', function () {
            var length = stroke.getP().length;
            stroke.addP(45);
            expect(stroke.getP().length).to.equal(length + 1);
        });

        it('Get d', function () {
            expect(stroke.getD().length).to.equal(0);
        });

        it('Set d', function () {
            stroke.setD([21, 45, 521, 12, 74]);
            expect(stroke.getD().length).to.equal(5);
        });

        it('Add d', function () {
            var length = stroke.getD().length;
            stroke.addD(45);
            expect(stroke.getD().length).to.equal(length + 1);
        });

        it('Get t', function () {
            expect(stroke.getT().length).to.equal(0);
        });

        it('Set t', function () {
            stroke.setT([1424085446156, 1424085446159, 1424085446164, 1424085446171, 1424085446175]);
            expect(stroke.getT().length).to.equal(5);
        });

        it('Add t', function () {
            var length = stroke.getT().length;
            stroke.addT(1424085446156);
            expect(stroke.getT().length).to.equal(length + 1);
        });

        it('Get color', function () {
            expect(stroke.getColor()).to.equal(undefined);
        });

        it('Set color', function () {
            stroke.setColor('#000000');
            expect(stroke.getColor()).to.equal('#000000');
        });

        it('Get alpha', function () {
            expect(stroke.getAlpha()).to.equal(undefined);
        });

        it('Set alpha', function () {
            stroke.setAlpha('1.0');
            expect(stroke.getAlpha()).to.equal('1.0');
        });

        it('Get width', function () {
            expect(stroke.getWidth()).to.equal(0);
        });

        it('Set width', function () {
            stroke.setWidth(1);
            expect(stroke.getWidth()).to.equal(1);
        });

    });

});