'use strict';

describe('AnalyzerUnderline: output/analyzer/analyzerUnderline.js', function () {

    describe('Default construction', function () {

        var analyzerUnderline;
        before(function (done) {
            analyzerUnderline = new MyScript.AnalyzerUnderline();
            done();
        });

        it('check initial state', function () {
            expect(analyzerUnderline).to.be.an('object');
            expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerUnderline);
            expect(analyzerUnderline).to.have.ownProperty('inkRanges');
        });

        it('Data getter', function () {
            expect(analyzerUnderline.getData()).to.be.undefined;
        });

        it('Ink Ranges getter', function () {
            expect(analyzerUnderline.getInkRanges()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var analyzerUnderline;
        before(function (done) {
            analyzerUnderline = new MyScript.AnalyzerUnderline({
                data: 'data',
                inkRanges: [{
                    type: 'inkRange'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(analyzerUnderline).to.be.an('object');
            expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerUnderline).to.be.an.instanceof(MyScript.AnalyzerUnderline);
            expect(analyzerUnderline).to.have.ownProperty('inkRanges');
        });

        it('Test AnalyzerUnderline object construction: AnalyzerUnderlineData construction', function () {
            expect(analyzerUnderline.getData()).to.be.an.instanceof(MyScript.AnalyzerUnderlineData);
        });

        it('Test AnalyzerUnderline object construction: AnalyzerInkRange construction', function () {
            expect(analyzerUnderline.getInkRanges()[0]).to.be.an.instanceof(MyScript.AnalyzerInkRange);
        });

    });

});