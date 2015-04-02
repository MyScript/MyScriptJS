'use strict';

describe('MyScriptJS: output/analyzer/analyzerPointData.js', function () {

    it('AnalyzerPointData object exist', function () {
        expect(MyScript.AnalyzerPointData).to.exist;
        expect(MyScript.AnalyzerPointData).not.to.be.null;
        expect(MyScript.AnalyzerPointData).to.not.be.undefined;
    });

    it('AnalyzerPointData constructor', function () {
        var analyzerPointData = new MyScript.AnalyzerPointData();
        expect(analyzerPointData).to.be.an('object');
        expect(analyzerPointData).to.be.an.instanceof(MyScript.Point);
        expect(analyzerPointData).to.be.an.instanceof(MyScript.AnalyzerPointData);
    });

});