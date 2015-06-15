'use strict';

describe('AnalyzerResult: output/analyzer/analyzerResult.js', function () {

    describe('Default construction', function () {

        var analyzerResult;
        before(function (done) {
            analyzerResult = new MyScript.AnalyzerResult();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerResult).to.be.an('object');
            expect(analyzerResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(analyzerResult).to.be.an.instanceOf(MyScript.AnalyzerResult);
        });

        it('Get AnalyzerDocument', function () {
            expect(analyzerResult.getAnalyzerDocument()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerResult;
        before(function (done) {
            analyzerResult = new MyScript.AnalyzerResult({
                result: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(analyzerResult).to.be.an('object');
            expect(analyzerResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(analyzerResult).to.be.an.instanceOf(MyScript.AnalyzerResult);
        });

        it('Get AnalyzerDocument', function () {
            expect(analyzerResult.getAnalyzerDocument()).to.be.an.instanceOf(MyScript.AnalyzerDocument);
        });

    });

});