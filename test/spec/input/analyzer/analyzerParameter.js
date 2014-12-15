'use strict';

describe('MyScriptJS: input/analyzer/analyzerParameter.js', function () {

    it('AnalyzerParameter object exist', function () {
        expect(MyScript.AnalyzerParameter).to.exist;
        expect(MyScript.AnalyzerParameter).not.to.be.null;
        expect(MyScript.AnalyzerParameter).to.not.be.undefined;
    });

    it('AnalyzerParameter constructor', function () {
        var analyzerParameter = new MyScript.AnalyzerParameter();
        expect(analyzerParameter).to.be.an('object');
        expect(analyzerParameter).to.be.an.instanceof(MyScript.AbstractParameter);
        expect(analyzerParameter).to.be.an.instanceof(MyScript.AnalyzerParameter);
    });

    it('AnalyzerParameter text parameters getter', function () {
        var analyzerParameter = new MyScript.AnalyzerParameter();
        expect(analyzerParameter.getTextParameters()).to.be.undefined;
    });

    it('AnalyzerParameter text parameters setter', function () {
        var analyzerParameter = new MyScript.AnalyzerParameter();
        expect(analyzerParameter.getTextParameters()).to.be.undefined;
        analyzerParameter.setTextParameters(new MyScript.TextParameter());
        expect(analyzerParameter.getTextParameters()).not.to.be.undefined;
    });

    it('AnalyzerParameter coordinate resolution getter', function () {
        var analyzerParameter = new MyScript.AnalyzerParameter();
        expect(analyzerParameter.getCoordinateResolution()).to.be.undefined;
    });

    it('AnalyzerParameter coordinate resolution setter', function () {
        var analyzerParameter = new MyScript.AnalyzerParameter();
        expect(analyzerParameter.getCoordinateResolution()).to.be.undefined;
        analyzerParameter.setTextParameters(10.3);
        expect(analyzerParameter.getTextParameters()).not.to.be.undefined;
        expect(analyzerParameter.getTextParameters()).to.equal(10.3);
    });
});