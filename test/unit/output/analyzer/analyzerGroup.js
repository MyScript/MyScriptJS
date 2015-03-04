'use strict';

describe('MyScriptJS: output/analyzer/analyzerGroup.js', function () {

    it('AnalyzerGroup object exist', function () {
        expect(MyScript.AnalyzerGroup).to.exist;
        expect(MyScript.AnalyzerGroup).not.to.be.null;
        expect(MyScript.AnalyzerGroup).to.not.be.undefined;
    });

    var analyzerGroup = new MyScript.AnalyzerGroup();
    it('AnalyzerGroup constructor', function () {
        expect(analyzerGroup).to.be.an('object');
        expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerGroup);
        expect(analyzerGroup).to.have.ownProperty('elementReferences');
    });

    it('AnalyzerGroup Element References getter', function () {
        expect(analyzerGroup.getElementReferences()).to.be.empty;
    });

    it('AnalyzerGroup Type getter', function () {
        expect(analyzerGroup.getType()).to.be.undefined;
    });

    it('AnalyzerGroup Unique Id getter', function () {
        expect(analyzerGroup.getUniqueId()).to.be.undefined;
    });

    var obj = {
        uniqueID: 'test',
        type: 'test',
        elementReferences: [{
            type: 'test'
        }]
    };
    var analyzerGroup2 = new MyScript.AnalyzerGroup(obj);
    it('Test AnalyzerGroup object construction', function () {
        expect(analyzerGroup2.getUniqueId()).to.not.be.undefined;
        expect(analyzerGroup2.getType()).to.not.be.undefined;
    });
    it('Test AnalyzerGroup object construction: AnalyzerElementReference construction', function () {
        expect(analyzerGroup2.getElementReferences()[0]).to.be.an.instanceof(MyScript.AnalyzerElementReference);
    });
});