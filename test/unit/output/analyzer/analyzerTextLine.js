'use strict';

describe('AnalyzerTextLine: output/analyzer/analyzerTextLine.js', function () {

    describe('Default construction', function () {

        var analyzerTextLine;
        before(function (done) {
            analyzerTextLine = new MyScript.AnalyzerTextLine();
            done();
        });

        it('check initial state', function () {
            expect(analyzerTextLine).to.be.an('object');
            expect(analyzerTextLine).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerTextLine).to.be.an.instanceof(MyScript.AnalyzerTextLine);
            expect(analyzerTextLine).to.have.ownProperty('inkRanges');
            expect(analyzerTextLine).to.have.ownProperty('underlineList');
        });

        it('Data getter', function () {
            expect(analyzerTextLine.getData()).to.be.undefined;
        });

        it('Text Document getter', function () {
            expect(analyzerTextLine.getTextDocument()).to.be.undefined;
        });

        it('Ink Ranges getter', function () {
            expect(analyzerTextLine.getInkRanges()).to.be.empty;
        });

        it('Underline List getter', function () {
            expect(analyzerTextLine.getUnderlineList()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var analyzerTextLine;
        before(function (done) {
            analyzerTextLine = new MyScript.AnalyzerTextLine({
                data: 'data',
                result: 'result',
                underlineList: [{
                    type: 'underline'
                }],
                inkRanges: [{
                    type: 'inkRange'
                }]
            });
            done();
        });

        it('Test AnalyzerTextLine object construction: AnalyzerTextLineData construction', function () {
            expect(analyzerTextLine.getData()).to.be.an.instanceof(MyScript.AnalyzerTextLineData);
        });

        it('Test AnalyzerTextLine object construction: AnalyzerInkRange construction', function () {
            expect(analyzerTextLine.getInkRanges()[0]).to.be.an.instanceof(MyScript.AnalyzerInkRange);
        });

        it('Test AnalyzerTextLine object construction: AnalyzerUnderline construction', function () {
            expect(analyzerTextLine.getUnderlineList()[0]).to.be.an.instanceof(MyScript.AnalyzerUnderline);
        });

        it('Test AnalyzerTextLine object construction: TextDocument construction', function () {
            expect(analyzerTextLine.getTextDocument()).to.be.an.instanceof(MyScript.TextDocument);
        });

    });

});