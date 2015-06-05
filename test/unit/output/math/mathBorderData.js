'use strict';

describe('MathBorderData: output/math/mathBorderData.js', function () {

    describe('Default construction', function () {

        var borderData;
        before(function (done) {
            borderData = new MyScript.MathBorderData();
            done();
        });

        it('Check initial state', function () {
            expect(borderData).to.be.an('object');
            expect(borderData).to.be.an.instanceof(MyScript.MathBorderData);
        });

        it('Get position', function () {
            expect(borderData.getPosition()).to.be.undefined;
        });

        it('Get start', function () {
            expect(borderData.getStart()).to.be.undefined;
        });

        it('Get stop', function () {
            expect(borderData.getStop()).to.be.undefined;
        });

        it('Get type', function () {
            expect(borderData.getType()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var borderData;
        before(function (done) {
            borderData = new MyScript.MathBorderData({
                position: 0,
                start: 1,
                stop: 2,
                type: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(borderData).to.be.an('object');
            expect(borderData).to.be.an.instanceof(MyScript.MathBorderData);
        });

        it('Get position', function () {
            expect(borderData.getPosition()).to.equal(0);
        });

        it('Get start', function () {
            expect(borderData.getStart()).to.equal(1);
        });

        it('Get stop', function () {
            expect(borderData.getStop()).to.equal(2);
        });

        it('Get type', function () {
            expect(borderData.getType()).to.equal('test');
        });

    });

});