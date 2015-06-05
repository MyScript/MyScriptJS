'use strict';

describe('RenderingParameters: rendering/renderingParameters.js', function () {

    describe('Default construction', function () {

        var renderingParameters;
        before(function (done) {
            renderingParameters = new MyScript.RenderingParameters();
            done();
        });

        it('check initial state', function () {
            expect(renderingParameters).to.be.an('object');
            expect(renderingParameters).to.be.an.instanceof(MyScript.RenderingParameters);
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

    });

    describe('Accessors', function () {

        var renderingParameters;
        beforeEach(function (done) {
            renderingParameters = new MyScript.RenderingParameters();
            done();
        });

        it('Color getter', function () {
            expect(renderingParameters.getColor()).to.be.equal('black');
        });

        it('Color setter', function () {
            expect(renderingParameters.getColor()).to.be.equal('black');
            renderingParameters.setColor('red');
            expect(renderingParameters.getColor()).to.be.equal('red');
        });

        it('Rect Color getter', function () {
            expect(renderingParameters.getRectColor()).to.be.equal('rgba(0, 0, 0, 0.2)');
        });

        it('Rect Color setter', function () {
            expect(renderingParameters.getRectColor()).to.be.equal('rgba(0, 0, 0, 0.2)');
            renderingParameters.setRectColor('rgba(255, 0, 0, 0.2)');
            expect(renderingParameters.getRectColor()).to.be.equal('rgba(255, 0, 0, 0.2)');
        });

        it('Font getter', function () {
            expect(renderingParameters.getFont()).to.be.equal('Times New Roman');
        });

        it('Font setter', function () {
            expect(renderingParameters.getFont()).to.be.equal('Times New Roman');
            renderingParameters.setFont('Arial');
            expect(renderingParameters.getFont()).to.be.equal('Arial');
        });

        it('Decoration getter', function () {
            expect(renderingParameters.getDecoration()).to.be.equal('');
        });

        it('Decoration setter', function () {
            expect(renderingParameters.getDecoration()).to.be.equal('');
            renderingParameters.setDecoration('NONE');
            expect(renderingParameters.getDecoration()).to.be.equal('NONE');
        });

        it('Width getter', function () {
            expect(renderingParameters.getWidth()).to.be.equal(4);
        });

        it('Width setter', function () {
            expect(renderingParameters.getWidth()).to.be.equal(4);
            renderingParameters.setWidth(2);
            expect(renderingParameters.getWidth()).to.be.equal(2);
        });

        it('Pressure Type getter', function () {
            expect(renderingParameters.getPressureType()).to.be.equal('SIMULATED');
        });

        it('Pressure Type setter', function () {
            expect(renderingParameters.getPressureType()).to.be.equal('SIMULATED');
            renderingParameters.setPressureType('NORMAL');
            expect(renderingParameters.getPressureType()).to.be.equal('NORMAL');
        });

        it('Alpha getter', function () {
            expect(renderingParameters.getAlpha()).to.be.equal('1.0');
        });

        it('Alpha setter', function () {
            expect(renderingParameters.getAlpha()).to.be.equal('1.0');
            renderingParameters.setAlpha('4.0');
            expect(renderingParameters.getAlpha()).to.be.equal('4.0');
        });

        it('Do Fade Out Loop getter', function () {
            expect(renderingParameters.getDoFadeOutLoop()).to.be.false;
        });

        it('Do Fade Out Loop setter', function () {
            expect(renderingParameters.getDoFadeOutLoop()).to.false;
            renderingParameters.setDoFadeOutLoop(true);
            expect(renderingParameters.getDoFadeOutLoop()).to.be.true;
        });

        it('Show Bounding Boxes getter', function () {
            expect(renderingParameters.getShowBoundingBoxes()).to.be.false;
        });

        it('Show Bounding Boxes setter', function () {
            expect(renderingParameters.getShowBoundingBoxes()).to.false;
            renderingParameters.setShowBoundingBoxes(true);
            expect(renderingParameters.getShowBoundingBoxes()).to.be.true;
        });

    });

});