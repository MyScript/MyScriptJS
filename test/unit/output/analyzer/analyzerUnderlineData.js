'use strict';

describe('AnalyzerUnderlineData: output/analyzer/analyzerUnderlineData.js', function () {

    describe('Default construction', function () {

        var analyzerUnderlineData;
        before(function (done) {
            analyzerUnderlineData = new MyScript.AnalyzerUnderlineData();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerUnderlineData).to.be.an('object');
            expect(analyzerUnderlineData).to.be.an.instanceOf(MyScript.AnalyzerUnderlineData);
        });

        it('First Character getter', function () {
            expect(analyzerUnderlineData.getFirstCharacter()).to.be.undefined;
        });

        it('Last Character Ranges getter', function () {
            expect(analyzerUnderlineData.getLastCharacter()).to.be.empty;
        });

    });

});