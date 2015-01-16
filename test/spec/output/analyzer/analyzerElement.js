'use strict';

describe('MyScriptJS: output/analyzer/analyzerElement.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerElement object exist', function () {
        expect(MyScript.AnalyzerElement).to.exist;
        expect(MyScript.AnalyzerElement).not.to.be.null;
        expect(MyScript.AnalyzerElement).to.not.be.undefined;
    });

    it('AnalyzerElement constructor', function () {
        var analyzerElement = new MyScript.AnalyzerElement();
        expect(analyzerElement).to.be.an('object');
        expect(analyzerElement).to.be.an.instanceof(MyScript.AnalyzerElement);
    });

    it('AnalyzerElement Element Type getter', function () {
        var analyzerElement = new MyScript.AnalyzerElement();
        expect(analyzerElement.getElementType()).to.be.undefined;
    });

});