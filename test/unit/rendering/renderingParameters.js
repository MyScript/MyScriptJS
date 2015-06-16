'use strict';

describe('RenderingParameters: rendering/renderingParameters.js', function () {

    describe('Default construction', function () {

        var renderingParameters;
        before(function (done) {
            renderingParameters = new MyScript.RenderingParameters();
            done();
        });

        it('Check initial state', function () {
            expect(renderingParameters).to.be.an('object');
            expect(renderingParameters).to.be.an.instanceOf(MyScript.RenderingParameters);
            expect(renderingParameters).to.have.ownProperty('color');
            expect(renderingParameters).to.have.ownProperty('rectColor');
            expect(renderingParameters).to.have.ownProperty('font');
            expect(renderingParameters).to.have.ownProperty('decoration');
            expect(renderingParameters).to.have.ownProperty('width');
            expect(renderingParameters).to.have.ownProperty('pressureType');
            expect(renderingParameters).to.have.ownProperty('alpha');
            expect(renderingParameters).to.have.ownProperty('doFadeOutLoop');
            expect(renderingParameters).to.have.ownProperty('showBoundingBoxes');
        });

        it('Get color getter', function () {
            expect(renderingParameters.getColor()).to.equal('black');
        });

        it('Set color', function () {
            renderingParameters.setColor('red');
            expect(renderingParameters.getColor()).to.equal('red');
        });

        it('Get rect color', function () {
            expect(renderingParameters.getRectColor()).to.equal('rgba(0, 0, 0, 0.2)');
        });

        it('Set rect color', function () {
            renderingParameters.setRectColor('rgba(255, 0, 0, 0.2)');
            expect(renderingParameters.getRectColor()).to.equal('rgba(255, 0, 0, 0.2)');
        });

        it('Get font', function () {
            expect(renderingParameters.getFont()).to.equal('Times New Roman');
        });

        it('Set font', function () {
            renderingParameters.setFont('Arial');
            expect(renderingParameters.getFont()).to.equal('Arial');
        });

        it('Get decoration', function () {
            expect(renderingParameters.getDecoration()).to.equal('');
        });

        it('Set decoration', function () {
            renderingParameters.setDecoration('NONE');
            expect(renderingParameters.getDecoration()).to.equal('NONE');
        });

        it('Get width', function () {
            expect(renderingParameters.getWidth()).to.equal(4);
        });

        it('Set width', function () {
            renderingParameters.setWidth(4);
            expect(renderingParameters.getWidth()).to.equal(4);
        });

        it('Get pressure type', function () {
            expect(renderingParameters.getPressureType()).to.equal('SIMULATED');
        });

        it('Set pressure type', function () {
            renderingParameters.setPressureType('NORMAL');
            expect(renderingParameters.getPressureType()).to.equal('NORMAL');
        });

        it('Get alpha', function () {
            expect(renderingParameters.getAlpha()).to.equal('1.0');
        });

        it('Set alpha', function () {
            renderingParameters.setAlpha('4.0');
            expect(renderingParameters.getAlpha()).to.equal('4.0');
        });

        it('Get do fade out loop', function () {
            expect(renderingParameters.getDoFadeOutLoop()).to.equal(false);
        });

        it('Set do fade out loop', function () {
            renderingParameters.setDoFadeOutLoop(true);
            expect(renderingParameters.getDoFadeOutLoop()).to.equal(true);
        });

        it('Get show bounding boxes', function () {
            expect(renderingParameters.getShowBoundingBoxes()).to.equal(false);
        });

        it('Set show bounding boxes', function () {
            renderingParameters.setShowBoundingBoxes(true);
            expect(renderingParameters.getShowBoundingBoxes()).to.equal(true);
        });

        it('Get acquisition delta', function () {
            expect(renderingParameters.getAcquisitionDelta()).to.equal(3);
        });

        it('Set acquisition delta', function () {
            renderingParameters.setAcquisitionDelta(12);
            expect(renderingParameters.getAcquisitionDelta()).to.equal(12);
        });

    });

});