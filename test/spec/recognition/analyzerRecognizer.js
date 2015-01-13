'use strict';

describe('MyScriptJS: recognition/analyzerRecognizer.js', function () {

    it('AnalyzerRecognizer object exist', function () {
        expect(MyScript.AnalyzerRecognizer).to.exist;
        expect(MyScript.AnalyzerRecognizer).not.to.be.null;
        expect(MyScript.AnalyzerRecognizer).to.not.be.undefined;
    });

    it('AnalyzerRecognizer constructor', function () {
        var analyzerRecognizer = new MyScript.AnalyzerRecognizer('http://localhost:3001');
        expect(analyzerRecognizer).to.be.an('object');
        expect(analyzerRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(analyzerRecognizer).to.be.an.instanceof(MyScript.AnalyzerRecognizer);
    });

    it('AnalyzerRecognizer Do SimpleRecognition', function () {
        var analyzerRecognizer = new MyScript.AnalyzerRecognizer('http://localhost:3001'),
            applicationKey = '',
            parameters = new MyScript.AnalyzerParameter(),
            instanceId = '',
            components = [new MyScript.AbstractComponent()],
            hmacKey = '';

        analyzerRecognizer.doSimpleRecognition(applicationKey, parameters, instanceId, components, hmacKey).then(
            function success (response) {

            },
            function error (response) {

            }
        );
    });

});