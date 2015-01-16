'use strict';

describe('MyScriptJS: output/analyzer/analyzerTextLine.js', function () {

    var expect = require('chai').expect;

    it('AnalyzerTextLine object exist', function () {
        expect(MyScript.AnalyzerTextLine).to.exist;
        expect(MyScript.AnalyzerTextLine).not.to.be.null;
        expect(MyScript.AnalyzerTableData).to.not.be.undefined;
    });

    it('AnalyzerTextLine constructor', function () {
        var analyzerTextLine = new MyScript.AnalyzerTextLine();
        expect(analyzerTextLine).to.be.an('object');
        expect(analyzerTextLine).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerTextLine).to.be.an.instanceof(MyScript.AnalyzerTextLine);
        expect(analyzerTextLine).to.have.ownProperty('inkRanges');
        expect(analyzerTextLine).to.have.ownProperty('underlineList');
    });

    it('AnalyzerTextLine Data getter', function () {
        var analyzerTextLine = new MyScript.AnalyzerTextLine();
        expect(analyzerTextLine.getData()).to.be.undefined;
    });

    it('AnalyzerTextLine Text Document getter', function () {
        var analyzerTextLine = new MyScript.AnalyzerTextLine();
        expect(analyzerTextLine.getTextDocument()).to.be.undefined;
    });

    it('AnalyzerTextLine Ink Ranges getter', function () {
        var analyzerTextLine = new MyScript.AnalyzerTextLine();
        expect(analyzerTextLine.getInkRanges()).to.be.empty;
    });

    it('AnalyzerTextLine Underline List getter', function () {
        var analyzerTextLine = new MyScript.AnalyzerTextLine();
        expect(analyzerTextLine.getUnderlineList()).to.be.empty;
    });


});