'use strict';

describe('AnalyzerParameter: input/analyzer/analyzerParameter.js', function () {

    describe('Default construction', function () {

        var analyzerParameter;
        before(function (done) {
            analyzerParameter = new MyScript.AnalyzerParameter();
            done();
        });

        it('check initial state', function () {
            expect(analyzerParameter).to.be.an('object');
            expect(analyzerParameter).to.be.an.instanceof(MyScript.AbstractParameter);
            expect(analyzerParameter).to.be.an.instanceof(MyScript.AnalyzerParameter);
        });

    });

    describe('Accessors', function () {

        var analyzerParameter;
        before(function (done) {
            analyzerParameter = new MyScript.AnalyzerParameter();
            done();
        });

        it('text parameters getter', function () {
            expect(analyzerParameter.getTextParameters()).to.not.be.undefined;
        });

        it('text parameters setter', function () {
            analyzerParameter.setTextParameters(new MyScript.TextParameter());
            expect(analyzerParameter.getTextParameters()).not.to.be.undefined;
        });

        it('coordinate resolution getter', function () {
            expect(analyzerParameter.getCoordinateResolution()).to.be.undefined;
        });

        it('coordinate resolution setter', function () {
            analyzerParameter.setCoordinateResolution(10.3);
            expect(analyzerParameter.getCoordinateResolution()).not.to.be.undefined;
            expect(analyzerParameter.getCoordinateResolution()).to.equal(10.3);
        });

    });

});