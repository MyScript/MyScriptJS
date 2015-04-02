'use strict';

describe('MyScriptJS: output/analyzer/analyzerElementReference.js', function () {

    it('AnalyzerElementReference object exist', function () {
        expect(MyScript.AnalyzerElementReference).to.exist;
        expect(MyScript.AnalyzerElementReference).not.to.be.null;
        expect(MyScript.AnalyzerElementReference).to.not.be.undefined;
    });

    var analyzerElementReference = new MyScript.AnalyzerElementReference();
    it('AnalyzerElementReference constructor', function () {
        expect(analyzerElementReference).to.be.an('object');
        expect(analyzerElementReference).to.be.an.instanceof(MyScript.AnalyzerElementReference);
    });

    it('AnalyzerElementReference Unique Id getter', function () {
        expect(analyzerElementReference.getUniqueId()).to.be.undefined;
    });

    it('AnalyzerElementReference Type getter', function () {
        expect(analyzerElementReference.getType()).to.be.undefined;
    });

    var obj = {
        uniqueID: 'test',
        type: 'test'
    };
    var analyzerElementReference2 = new MyScript.AnalyzerElementReference(obj);
    it('Test AnalyzerElementReference object construction', function () {
        expect(analyzerElementReference2.getUniqueId()).to.not.be.undefined;
        expect(analyzerElementReference2.getType()).to.not.be.undefined;
    });


});