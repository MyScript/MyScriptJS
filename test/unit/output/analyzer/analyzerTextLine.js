'use strict';

describe('MyScriptJS: output/analyzer/analyzerTextLine.js', function () {

    it('AnalyzerTextLine object exist', function () {
        expect(MyScript.AnalyzerTextLine).to.exist;
        expect(MyScript.AnalyzerTextLine).not.to.be.null;
        expect(MyScript.AnalyzerTableData).to.not.be.undefined;
    });

    var analyzerTextLine = new MyScript.AnalyzerTextLine();
    it('AnalyzerTextLine constructor', function () {
        expect(analyzerTextLine).to.be.an('object');
        expect(analyzerTextLine).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerTextLine).to.be.an.instanceof(MyScript.AnalyzerTextLine);
        expect(analyzerTextLine).to.have.ownProperty('inkRanges');
        expect(analyzerTextLine).to.have.ownProperty('underlineList');
    });

    it('AnalyzerTextLine Data getter', function () {
        expect(analyzerTextLine.getData()).to.be.undefined;
    });

    it('AnalyzerTextLine Text Document getter', function () {
        expect(analyzerTextLine.getTextDocument()).to.be.undefined;
    });

    it('AnalyzerTextLine Ink Ranges getter', function () {
        expect(analyzerTextLine.getInkRanges()).to.be.empty;
    });

    it('AnalyzerTextLine Underline List getter', function () {
        expect(analyzerTextLine.getUnderlineList()).to.be.empty;
    });

    var obj = {
        data: 'data',
        result: 'result',
        underlineList: [{
            type: 'underline'
        }],
        inkRanges: [{
            type: 'inkRange'
        }]
    };
    var analyzerTextLine2 = new MyScript.AnalyzerTextLine(obj);
    it('Test AnalyzerTextLine object construction: AnalyzerTextLineData construction', function () {
        expect(analyzerTextLine2.getData()).to.be.an.instanceof(MyScript.AnalyzerTextLineData);
    });
    it('Test AnalyzerTextLine object construction: AnalyzerInkRange construction', function () {
        expect(analyzerTextLine2.getInkRanges()[0]).to.be.an.instanceof(MyScript.AnalyzerInkRange);
    });
    it('Test AnalyzerTextLine object construction: AnalyzerUnderline construction', function () {
        expect(analyzerTextLine2.getUnderlineList()[0]).to.be.an.instanceof(MyScript.AnalyzerUnderline);
    });
    it('Test AnalyzerTextLine object construction: TextDocument construction', function () {
        expect(analyzerTextLine2.getTextDocument()).to.be.an.instanceof(MyScript.TextDocument);
    });


});