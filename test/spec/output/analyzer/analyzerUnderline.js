'use strict';

describe('MyScriptJS: output/analyzer/analyzerUnderline.js', function () {

    it('AnalyzerUnderline object exist', function () {
        expect(MyScript.AnalyzerUnderline).to.exist;
        expect(MyScript.AnalyzerUnderline).not.to.be.null;
        expect(MyScript.AnalyzerTextLineData).to.not.be.undefined;
    });

});