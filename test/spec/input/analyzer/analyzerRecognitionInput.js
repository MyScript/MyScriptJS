'use strict';

describe('MyScriptJS: input/analyzer/analyzerRecognitionInput.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerRecognitionInput object exist', function () {
        expect(MyScript.AnalyzerRecognitionInput).to.exist;
        expect(MyScript.AnalyzerRecognitionInput).not.to.be.null;
        expect(MyScript.AnalyzerRecognitionInput).to.not.be.undefined;
    });

    it('AnalyzerRecognitionInput constructor', function () {
        var analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
        expect(analyzerRecognitionInput).to.be.an('object');
        expect(analyzerRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
        expect(analyzerRecognitionInput).to.be.an.instanceof(MyScript.AnalyzerRecognitionInput);
    });

    it('AnalyzerRecognitionInput parameter getter', function () {
        var analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
        expect(analyzerRecognitionInput.getParameters()).to.be.undefined;
    });

    it('AnalyzerRecognitionInput parameter setter', function () {
        var analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
        expect(analyzerRecognitionInput.getParameters()).to.be.undefined;
        analyzerRecognitionInput.setParameters(new MyScript.AnalyzerParameter());
        expect(analyzerRecognitionInput.getParameters()).not.to.be.undefined;
    });

    it('AnalyzerRecognitionInput components getter', function () {
        var analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
        expect(analyzerRecognitionInput.getComponents()).to.be.undefined;
    });

    it('AnalyzerRecognitionInput components setter', function () {
        var analyzerRecognitionInput = new MyScript.AnalyzerRecognitionInput();
        expect(analyzerRecognitionInput.getComponents()).to.be.undefined;
        analyzerRecognitionInput.setComponents(new MyScript.AbstractComponent());
        expect(analyzerRecognitionInput.getComponents()).not.to.be.undefined;
    });
});