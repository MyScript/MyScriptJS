'use strict';

describe('AnalyzerElement: output/analyzer/analyzerElement.js', function () {

    describe('Default construction', function () {

        var analyzerElement;
        before(function (done) {
            analyzerElement = new MyScript.AnalyzerElement();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerElement).to.be.an('object');
            expect(analyzerElement).to.be.an.instanceOf(MyScript.AnalyzerElement);
        });

        it('Element Type getter', function () {
            expect(analyzerElement.getElementType()).to.be.undefined;
        });

    });

});