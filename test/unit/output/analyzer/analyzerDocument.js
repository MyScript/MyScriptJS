'use strict';

describe('MyScriptJS: output/analyzer/analyzerDocument.js', function () {

    it('AnalyzerDocument object exist', function () {
        expect(MyScript.AnalyzerDocument).to.exist;
        expect(MyScript.AnalyzerDocument).not.to.be.null;
        expect(MyScript.AnalyzerDocument).to.not.be.undefined;
    });

    var analyzerDocument = new MyScript.AnalyzerDocument();
    it('AnalyzerDocument constructor', function () {
        expect(analyzerDocument).to.be.an('object');
        expect(analyzerDocument).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerDocument).to.be.an.instanceof(MyScript.AnalyzerDocument);
        expect(analyzerDocument).to.have.ownProperty('textLines');
        expect(analyzerDocument).to.have.ownProperty('shapes');
        expect(analyzerDocument).to.have.ownProperty('tables');
        expect(analyzerDocument).to.have.ownProperty('groups');
    });

    it('AnalyzerDocument Text Lines getter', function () {
        expect(analyzerDocument.getTextLines()).to.be.empty;
    });

    it('AnalyzerDocument Shapes getter', function () {
        expect(analyzerDocument.getShapes()).to.be.empty;
    });

    it('AnalyzerDocument Tables getter', function () {
        expect(analyzerDocument.getTables()).to.be.empty;
    });

    it('AnalyzerDocument Groups getter', function () {
        expect(analyzerDocument.getGroups()).to.be.empty;
    });

    var obj = {
        textLines: [{
            type: 'test'
        }],
        shapes: [{
            type: 'test'
        }],
        tables: [{
            type: 'test'
        }],
        groups: [{
            type: 'test'
        }]
    };
    var analyzerDocument2 = new MyScript.AnalyzerDocument(obj);
    it('Test AnalyzerDocument object construction: AnalyzerTextLine construction', function () {
        expect(analyzerDocument2.getTextLines()[0]).to.be.an.instanceof(MyScript.AnalyzerTextLine);
    });
    it('Test AnalyzerDocument object construction: ShapeSegment construction', function () {
        expect(analyzerDocument2.getShapes()[0]).to.be.an.instanceof(MyScript.ShapeSegment);
    });
    it('Test AnalyzerDocument object construction: AnalyzerTable construction', function () {
        expect(analyzerDocument2.getTables()[0]).to.be.an.instanceof(MyScript.AnalyzerTable);
    });
    it('Test AnalyzerDocument object construction: AnalyzerGroup construction', function () {
        expect(analyzerDocument2.getGroups()[0]).to.be.an.instanceof(MyScript.AnalyzerGroup);
    });

});