'use strict';

describe('MyScriptJS: output/analyzer/analyzerGroup.js', function () {

    it('AnalyzerGroup object exist', function () {
        expect(MyScript.AnalyzerGroup).to.exist;
        expect(MyScript.AnalyzerGroup).not.to.be.null;
        expect(MyScript.AnalyzerGroup).to.not.be.undefined;
    });

    it('AnalyzerGroup constructor', function () {
        var analyzerGroup = new MyScript.AnalyzerGroup();
        expect(analyzerGroup).to.be.an('object');
        expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerGroup);
        expect(analyzerGroup).to.have.ownProperty('elementReferences');
    });

    it('AnalyzerGroup Element References getter', function () {
        var analyzerGroup = new MyScript.AnalyzerGroup();
        expect(analyzerGroup.getElementReferences()).to.be.empty;
    });

    it('AnalyzerGroup Type getter', function () {
        var analyzerGroup = new MyScript.AnalyzerGroup();
        expect(analyzerGroup.getType()).to.be.undefined;
    });

    it('AnalyzerGroup Unique Id getter', function () {
        var analyzerGroup = new MyScript.AnalyzerGroup();
        expect(analyzerGroup.getUniqueId()).to.be.undefined;
    });
});