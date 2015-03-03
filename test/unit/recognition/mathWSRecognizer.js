'use strict';

describe('MyScriptJS: recognition/mathWSRecognizer.js', function () {

    it('MathWSRecognizer object exist', function () {
        expect(MyScript.MathWSRecognizer).to.exist;
        expect(MyScript.MathWSRecognizer).not.to.be.null;
        expect(MyScript.MathWSRecognizer).to.not.be.undefined;
    });

    var mathRecognizer = new MyScript.MathWSRecognizer('cloud-internal-master.visionobjects.com');
    it('MathWSRecognizer constructor', function () {
        expect(mathRecognizer).to.be.an('object');
        expect(mathRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(mathRecognizer).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
        expect(mathRecognizer).to.be.an.instanceof(MyScript.MathWSRecognizer);
    });

    it('Get parameters', function () {
        expect(mathRecognizer.getParameters()).to.be.an.instanceof(MyScript.MathParameter);
    });

    var parameters = new MyScript.MathParameter();
    parameters.setResultTypes(['LATEX']);
    it('Set parameters', function () {
        mathRecognizer.setParameters(parameters);
        expect(mathRecognizer.getParameters()).to.be.an.instanceof(MyScript.MathParameter);
    });

});