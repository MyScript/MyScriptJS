'use strict';

describe('AnalyzerInkRange: output/analyzer/analyzerInkRange.js', function () {

    describe('Default construction', function () {

        var analyzerInkRange;
        before(function (done) {
            analyzerInkRange = new MyScript.AnalyzerInkRange();
            done();
        });

        it('check initial state', function () {
            expect(analyzerInkRange).to.be.an('object');
            expect(analyzerInkRange).to.be.an.instanceof(MyScript.AnalyzerInkRange);
        });

        it('First Point getter', function () {
            expect(analyzerInkRange.getFirstPoint()).to.be.undefined;
        });

        it('Last Point getter', function () {
            expect(analyzerInkRange.getLastPoint()).to.be.undefined;
        });

        it('Stroke getter', function () {
            expect(analyzerInkRange.getStroke()).to.be.undefined;
        });

    });

});