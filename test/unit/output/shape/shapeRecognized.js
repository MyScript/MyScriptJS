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

        it('Primitives getter', function () {
            expect(shapeRecognized.getPrimitives()).to.be.empty;
        });

        it('Label getter', function () {
            expect(shapeRecognized.getLabel()).to.be.undefined;
        });

        it('Normalized Recognition Score getter', function () {
            expect(shapeRecognized.getNormalizedRecognitionScore()).to.be.undefined;
        });

        it('Resemblance Score getter', function () {
            expect(shapeRecognized.getResemblanceScore()).to.be.undefined;
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

        it('Test ShapeRecognized object construction: ShapeLine construction', function () {
            expect(shapeRecognized.getPrimitives()[0]).to.be.an.instanceOf(MyScript.ShapeLine);
        });
        it('Test ShapeRecognized object construction: ShapeEllipse construction', function () {
            expect(shapeRecognized.getPrimitives()[1]).to.be.an.instanceOf(MyScript.ShapeEllipse);
        });

        it('Test ShapeRecognized object construction: wrong elementType', function () {
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