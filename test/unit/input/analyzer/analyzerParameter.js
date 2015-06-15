'use strict';

describe('AnalyzerParameter: input/analyzer/analyzerParameter.js', function () {

    describe('Default construction', function () {

        var analyzerParameter;
        before(function (done) {
            analyzerParameter = new MyScript.AnalyzerParameter();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerParameter).to.be.an('object');
            expect(analyzerParameter).to.be.an.instanceOf(MyScript.AbstractParameter);
            expect(analyzerParameter).to.be.an.instanceOf(MyScript.AnalyzerParameter);
        });

        it('Get text parameters', function () {
            expect(analyzerParameter.getTextParameters()).to.not.be.undefined;
        });

        it('Set text parameters', function () {
            analyzerParameter.setTextParameters(new MyScript.TextParameter());
            expect(analyzerParameter.getTextParameters()).not.to.be.undefined;
        });

        it('Get coordinate resolution', function () {
            expect(analyzerParameter.getCoordinateResolution()).to.be.undefined;
        });

        it('Set coordinate resolution', function () {
            analyzerParameter.setCoordinateResolution(10.3);
            expect(analyzerParameter.getCoordinateResolution()).not.to.be.undefined;
            expect(analyzerParameter.getCoordinateResolution()).to.equal(10.3);
        });

    });

});