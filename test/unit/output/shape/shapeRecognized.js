'use strict';

describe('ShapeRecognized: output/shape/shapeRecognized.js', function () {

    describe('Default construction', function () {

        var shapeRecognized;
        before(function (done) {
            shapeRecognized = new MyScript.ShapeRecognized();
            done();
        });

        it('Check initial state', function () {
            expect(shapeRecognized).to.be.an('object');
            expect(shapeRecognized).to.be.an.instanceOf(MyScript.ShapeCandidate);
            expect(shapeRecognized).to.be.an.instanceOf(MyScript.ShapeRecognized);
            expect(shapeRecognized).to.have.ownProperty('primitives');
        });

        it('Get primitives', function () {
            expect(shapeRecognized.getPrimitives().length).to.equal(0);
        });

        it('Get label', function () {
            expect(shapeRecognized.getLabel()).to.equal(undefined);
        });

        it('Get normalized recognition score', function () {
            expect(shapeRecognized.getNormalizedRecognitionScore()).to.equal(undefined);
        });

        it('Get resemblance score', function () {
            expect(shapeRecognized.getResemblanceScore()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var shapeRecognized;
        before(function (done) {
            shapeRecognized = new MyScript.ShapeRecognized({
                primitives: [{
                    type: 'line'
                }, {
                    type: 'ellipse'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(shapeRecognized).to.be.an('object');
            expect(shapeRecognized).to.be.an.instanceOf(MyScript.ShapeCandidate);
            expect(shapeRecognized).to.be.an.instanceOf(MyScript.ShapeRecognized);
            expect(shapeRecognized).to.have.ownProperty('primitives');
        });

        it('Get line primitive', function () {
            expect(shapeRecognized.getPrimitives()[0]).to.be.an.instanceOf(MyScript.ShapeLine);
        });
        it('Get ellipse primitive', function () {
            expect(shapeRecognized.getPrimitives()[1]).to.be.an.instanceOf(MyScript.ShapeEllipse);
        });

        it('Get unknown primitive', function () {
            var data = {
                primitives: [{
                    type: 'square'
                }]
            };
            expect(function () {
                new MyScript.ShapeRecognized(data);
            }).to.throw(Error);
        });

    });

});