'use strict';

describe('MyScriptJS: output/analyzer/analyzerDocument.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerDocument object exist', function () {
        expect(MyScript.AnalyzerDocument).to.exist;
        expect(MyScript.AnalyzerDocument).not.to.be.null;
        expect(MyScript.AnalyzerDocument).to.not.be.undefined;
    });

    it('AnalyzerDocument constructor', function () {
        var analyzerDocument = new MyScript.AnalyzerDocument();
        expect(analyzerDocument).to.be.an('object');
        expect(analyzerDocument).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerDocument).to.be.an.instanceof(MyScript.AnalyzerDocument);
        expect(analyzerDocument).to.have.ownProperty('textLines');
        expect(analyzerDocument).to.have.ownProperty('shapes');
        expect(analyzerDocument).to.have.ownProperty('tables');
        expect(analyzerDocument).to.have.ownProperty('groups');
    });

    it('AnalyzerDocument Text Lines getter', function () {
        var analyzerDocument = new MyScript.AnalyzerDocument();
        expect(analyzerDocument.getTextLines()).to.be.empty;
    });

    it('AnalyzerDocument Shapes getter', function () {
        var analyzerDocument = new MyScript.AnalyzerDocument();
        expect(analyzerDocument.getShapes()).to.be.empty;
    });

    it('AnalyzerDocument Tables getter', function () {
        var analyzerDocument = new MyScript.AnalyzerDocument();
        expect(analyzerDocument.getTables()).to.be.empty;
    });

    it('AnalyzerDocument Groups getter', function () {
        var analyzerDocument = new MyScript.AnalyzerDocument();
        expect(analyzerDocument.getGroups()).to.be.empty;
    });

});