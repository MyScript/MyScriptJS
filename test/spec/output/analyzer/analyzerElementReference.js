'use strict';

describe('MyScriptJS: output/analyzer/analyzerElementReference.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerElementReference object exist', function () {
        expect(MyScript.AnalyzerElementReference).to.exist;
        expect(MyScript.AnalyzerElementReference).not.to.be.null;
        expect(MyScript.AnalyzerElementReference).to.not.be.undefined;
    });

    it('AnalyzerElementReference constructor', function () {
        var analyzerElementReference = new MyScript.AnalyzerElementReference();
        expect(analyzerElementReference).to.be.an('object');
        expect(analyzerElementReference).to.be.an.instanceof(MyScript.AnalyzerElementReference);
    });

    it('AnalyzerElementReference Unique Id getter', function () {
        var analyzerElementReference = new MyScript.AnalyzerElementReference();
        expect(analyzerElementReference.getUniqueId()).to.be.undefined;
    });

    it('AnalyzerElementReference Type getter', function () {
        var analyzerElementReference = new MyScript.AnalyzerElementReference();
        expect(analyzerElementReference.getType()).to.be.undefined;
    });


});