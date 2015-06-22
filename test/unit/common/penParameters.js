'use strict';

describe('PenParameters: rendering/penParameters.js', function () {

    describe('Default construction', function () {

        var penParameters;
        before(function (done) {
            penParameters = new MyScript.PenParameters();
            done();
        });

        it('Check initial state', function () {
            expect(penParameters).to.be.an('object');
            expect(penParameters).to.be.an.instanceOf(MyScript.PenParameters);
            expect(penParameters).to.have.ownProperty('color');
            expect(penParameters).to.have.ownProperty('rectColor');
            expect(penParameters).to.have.ownProperty('font');
            expect(penParameters).to.have.ownProperty('decoration');
            expect(penParameters).to.have.ownProperty('width');
            expect(penParameters).to.have.ownProperty('pressureType');
            expect(penParameters).to.have.ownProperty('alpha');
        });

        it('Get color getter', function () {
            expect(penParameters.getColor()).to.equal('black');
        });

        it('Set color', function () {
            penParameters.setColor('red');
            expect(penParameters.getColor()).to.equal('red');
        });

        it('Get rect color', function () {
            expect(penParameters.getRectColor()).to.equal('rgba(0, 0, 0, 0.2)');
        });

        it('Set rect color', function () {
            penParameters.setRectColor('rgba(255, 0, 0, 0.2)');
            expect(penParameters.getRectColor()).to.equal('rgba(255, 0, 0, 0.2)');
        });

        it('Get font', function () {
            expect(penParameters.getFont()).to.equal('Times New Roman');
        });

        it('Set font', function () {
            penParameters.setFont('Arial');
            expect(penParameters.getFont()).to.equal('Arial');
        });

        it('Get decoration', function () {
            expect(penParameters.getDecoration()).to.equal('');
        });

        it('Set decoration', function () {
            penParameters.setDecoration('NONE');
            expect(penParameters.getDecoration()).to.equal('NONE');
        });

        it('Get width', function () {
            expect(penParameters.getWidth()).to.equal(4);
        });

        it('Set width', function () {
            penParameters.setWidth(4);
            expect(penParameters.getWidth()).to.equal(4);
        });

        it('Get pressure type', function () {
            expect(penParameters.getPressureType()).to.equal('SIMULATED');
        });

        it('Set pressure type', function () {
            penParameters.setPressureType('NORMAL');
            expect(penParameters.getPressureType()).to.equal('NORMAL');
        });

        it('Get alpha', function () {
            expect(penParameters.getAlpha()).to.equal('1.0');
        });

        it('Set alpha', function () {
            penParameters.setAlpha('4.0');
            expect(penParameters.getAlpha()).to.equal('4.0');
        });

    });

});