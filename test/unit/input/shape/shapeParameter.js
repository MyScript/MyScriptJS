'use strict';

describe('ShapeParameter: input/shape/shapeParameter.js', function () {

    describe('Default construction', function () {

        var shapeParameter;
        before(function (done) {
            shapeParameter = new MyScript.ShapeParameter();
            done();
        });

        it('Check initial state', function () {
            expect(shapeParameter).to.be.an('object');
            expect(shapeParameter).to.be.an.instanceOf(MyScript.AbstractParameter);
            expect(shapeParameter).to.be.an.instanceOf(MyScript.ShapeParameter);
        });

        it('Get reject detection sensitivity', function () {
            expect(shapeParameter.getRejectDetectionSensitivity()).to.be.undefined;
        });

        it('Set reject detection sensitivity', function () {
            shapeParameter.setRejectDetectionSensitivity(true);
            expect(shapeParameter.getRejectDetectionSensitivity()).not.to.be.undefined;
            expect(shapeParameter.getRejectDetectionSensitivity()).to.be.true;
        });

        it('Get has Beautification', function () {
            expect(shapeParameter.hasBeautification()).to.be.undefined;
        });

        it('Set has Beautification', function () {
            shapeParameter.setBeautification(true);
            expect(shapeParameter.hasBeautification()).not.to.be.undefined;
            expect(shapeParameter.hasBeautification()).to.be.true;
        });

        it('Get user resources', function () {
            expect(shapeParameter.getUserResources()).to.be.empty;
        });

        it('Set user resources', function () {
            shapeParameter.setUserResources(['shape-ak', 'shape-grm-standard']);
            expect(shapeParameter.getUserResources().length).to.equal(2);
            expect(shapeParameter.getUserResources()[0]).to.equal('shape-ak');
            expect(shapeParameter.getUserResources()[1]).to.equal('shape-grm-standard');
        });

    });

});