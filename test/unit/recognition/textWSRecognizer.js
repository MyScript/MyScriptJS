'use strict';

describe('MyScriptJS: recognition/textWSRecognizer.js', function () {

    it('TextWSRecognizer object exist', function () {
        expect(MyScript.TextWSRecognizer).to.exist;
        expect(MyScript.TextWSRecognizer).not.to.be.null;
        expect(MyScript.TextWSRecognizer).to.not.be.undefined;
    });

    var textRecognizer = new MyScript.TextWSRecognizer('cloud-internal-stable.visionobjects.com');
    it('MathWSRecognizer constructor', function () {
        expect(textRecognizer).to.be.an('object');
        expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
        expect(textRecognizer).to.be.an.instanceof(MyScript.TextWSRecognizer);
    });

    it('Get parameters', function () {
        expect(textRecognizer.getParameters()).to.be.an.instanceof(MyScript.TextParameter);
    });

    var parameters = new MyScript.TextParameter();
    parameters.setLanguage('en_US');
    parameters.setInputMode('CURSIVE');
    it('Set parameters', function () {
        textRecognizer.setParameters(parameters);
        expect(textRecognizer.getParameters()).to.be.an.instanceof(MyScript.TextParameter);
    });

});