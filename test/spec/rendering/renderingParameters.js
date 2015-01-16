'use strict';

describe('MyScriptJS: rendering/renderingParameters.js', function () {

    var expect = require('chai').expect;

    it('RenderingParameters object exist', function () {
        expect(MyScript.RenderingParameters).to.exist;
        expect(MyScript.RenderingParameters).not.to.be.null;
        expect(MyScript.RenderingParameters).to.not.be.undefined;
    });

    it('RenderingParameters constructor', function () {
        var renderingParameters = new MyScript.RenderingParameters();
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

    it('RenderingParameters Color getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getColor()).to.be.equal('black');
    });

    it('RenderingParameters Color setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getColor()).to.be.equal('black');
        renderingParameters.setColor('red');
        expect(renderingParameters.getColor()).to.be.equal('red');
    });

    it('RenderingParameters Rect Color getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getRectColor()).to.be.equal('rgba(0, 0, 0, 0.2)');
    });

    it('RenderingParameters Rect Color setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getRectColor()).to.be.equal('rgba(0, 0, 0, 0.2)');
        renderingParameters.setRectColor('rgba(255, 0, 0, 0.2)');
        expect(renderingParameters.getRectColor()).to.be.equal('rgba(255, 0, 0, 0.2)');
    });

    it('RenderingParameters Font getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getFont()).to.be.equal('Times New Roman');
    });

    it('RenderingParameters Font setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getFont()).to.be.equal('Times New Roman');
        renderingParameters.setFont('Arial');
        expect(renderingParameters.getFont()).to.be.equal('Arial');
    });

    it('RenderingParameters Decoration getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getDecoration()).to.be.equal('');
    });

    it('RenderingParameters Decoration setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getDecoration()).to.be.equal('');
        renderingParameters.setDecoration('NONE');
        expect(renderingParameters.getDecoration()).to.be.equal('NONE');
    });

    it('RenderingParameters Width getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getWidth()).to.be.equal(4);
    });

    it('RenderingParameters Width setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getWidth()).to.be.equal(4);
        renderingParameters.setWidth(2);
        expect(renderingParameters.getWidth()).to.be.equal(2);
    });

    it('RenderingParameters Pressure Type getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getPressureType()).to.be.equal('SIMULATED');
    });

    it('RenderingParameters Pressure Type setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getPressureType()).to.be.equal('SIMULATED');
        renderingParameters.setPressureType('NORMAL');
        expect(renderingParameters.getPressureType()).to.be.equal('NORMAL');
    });

    it('RenderingParameters Alpha getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getAlpha()).to.be.equal('1.0');
    });

    it('RenderingParameters Alpha setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getAlpha()).to.be.equal('1.0');
        renderingParameters.setAlpha('4.0');
        expect(renderingParameters.getAlpha()).to.be.equal('4.0');
    });

    it('RenderingParameters Do Fade Out Loop getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getDoFadeOutLoop()).to.be.false;
    });

    it('RenderingParameters Do Fade Out Loop setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getDoFadeOutLoop()).to.false;
        renderingParameters.setDoFadeOutLoop(true);
        expect(renderingParameters.getDoFadeOutLoop()).to.be.true;
    });

    it('RenderingParameters Show Bounding Boxes getter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getShowBoundingBoxes()).to.be.false;
    });

    it('RenderingParameters Show Bounding Boxes setter', function () {
        var renderingParameters = new MyScript.RenderingParameters();
        expect(renderingParameters.getShowBoundingBoxes()).to.false;
        renderingParameters.setShowBoundingBoxes(true);
        expect(renderingParameters.getShowBoundingBoxes()).to.be.true;
    });
});