'use strict';

describe('MyScriptJS: input/analyzer/analyzerParameter.js', function () {

    it('AnalyzerParameter object exist', function () {
        expect(MyScript.AnalyzerParameter).to.exist;
        expect(MyScript.AnalyzerParameter).not.to.be.null;
        expect(MyScript.AnalyzerParameter).to.not.be.undefined;
    });

    var analyzerParameter = new MyScript.AnalyzerParameter();
    it('AnalyzerParameter constructor', function () {
        expect(analyzerParameter).to.be.an('object');
        expect(analyzerParameter).to.be.an.instanceof(MyScript.AbstractParameter);
        expect(analyzerParameter).to.be.an.instanceof(MyScript.AnalyzerParameter);
    });

    it('AnalyzerParameter text parameters getter', function () {
        expect(analyzerParameter.getTextParameters()).to.be.undefined;
    });

    it('AnalyzerParameter text parameters setter', function () {
        analyzerParameter.setTextParameters(new MyScript.TextParameter());
        expect(analyzerParameter.getTextParameters()).not.to.be.undefined;
    });

    it('AnalyzerParameter coordinate resolution getter', function () {
        expect(analyzerParameter.getCoordinateResolution()).to.be.undefined;
    });

    it('AnalyzerParameter coordinate resolution setter', function () {
        var analyzerParameter = new MyScript.AnalyzerParameter();
        analyzerParameter.setCoordinateResolution(10.3);
        expect(analyzerParameter.getCoordinateResolution()).not.to.be.undefined;
        expect(analyzerParameter.getCoordinateResolution()).to.equal(10.3);
    });
});