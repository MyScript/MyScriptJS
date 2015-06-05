'use strict';

describe('ShapeParameter: input/shape/shapeParameter.js', function () {

    describe('Default construction', function () {

        var shapeParameter;
        before(function (done) {
            shapeParameter = new MyScript.ShapeParameter();
            done();
        });

        it('check initial state', function () {
            expect(shapeParameter).to.be.an('object');
            expect(shapeParameter).to.be.an.instanceof(MyScript.AbstractParameter);
            expect(shapeParameter).to.be.an.instanceof(MyScript.ShapeParameter);
        });

    });

    describe('Accessors', function () {

        var shapeParameter;
        beforeEach(function (done) {
            shapeParameter = new MyScript.ShapeParameter();
            done();
        });

        it('Reject Detection Sensitivity getter', function () {
            expect(shapeParameter.getRejectDetectionSensitivity()).to.be.undefined;
        });

        it('Reject Detection Sensitivity setter', function () {
            expect(shapeParameter.getRejectDetectionSensitivity()).to.be.undefined;
            shapeParameter.setRejectDetectionSensitivity(true);
            expect(shapeParameter.getRejectDetectionSensitivity()).not.to.be.undefined;
            expect(shapeParameter.getRejectDetectionSensitivity()).to.be.true;
        });

        it('has Beautification getter', function () {
            expect(shapeParameter.hasBeautification()).to.be.undefined;
        });

        it('has Beautification setter', function () {
            expect(shapeParameter.hasBeautification()).to.be.undefined;
            shapeParameter.setBeautification(true);
            expect(shapeParameter.hasBeautification()).not.to.be.undefined;
            expect(shapeParameter.hasBeautification()).to.be.true;
        });

        it('user resources getter', function () {
            expect(shapeParameter.getUserResources()).to.be.empty;
        });

        it('user resources setter', function () {
            expect(shapeParameter.getUserResources()).to.be.undefined;
            shapeParameter.setUserResources(['shape-ak', 'shape-grm-standard']);
            expect(shapeParameter.getUserResources().length).to.equal(2);
            expect(shapeParameter.getUserResources()[0]).to.equal('shape-ak');
            expect(shapeParameter.getUserResources()[1]).to.equal('shape-grm-standard');
        });

    });

});