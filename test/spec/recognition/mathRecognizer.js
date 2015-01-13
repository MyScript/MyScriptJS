'use strict';

describe('MyScriptJS: recognition/mathRecognizer.js', function () {

    it('MathRecognizer object exist', function () {
        expect(MyScript.MathRecognizer).to.exist;
        expect(MyScript.MathRecognizer).not.to.be.null;
        expect(MyScript.MathRecognizer).to.not.be.undefined;
    });

    it('MathRecognizer constructor', function () {
        var mathRecognizer = new MyScript.MathRecognizer('http://localhost:3001');
        expect(mathRecognizer).to.be.an('object');
        expect(mathRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(mathRecognizer).to.be.an.instanceof(MyScript.MathRecognizer);
    });

    it('MathRecognizer Do SimpleRecognition', function () {
        var mathRecognizer = new MyScript.MathRecognizer('http://localhost:3001'),
            applicationKey = '',
            parameters = new MyScript.MathParameter(),
            instanceId = '',
            components = [new MyScript.AbstractComponent()],
            hmacKey = '';

        mathRecognizer.doSimpleRecognition(applicationKey, parameters, instanceId, components, hmacKey).then(
            function success (response) {

            },
            function error (response) {

            }
        );
    });

});