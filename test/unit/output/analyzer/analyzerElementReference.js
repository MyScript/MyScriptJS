'use strict';

describe('AnalyzerElementReference: output/analyzer/analyzerElementReference.js', function () {

    describe('Default construction', function () {

        var analyzerElementReference;
        before(function (done) {
            analyzerElementReference = new MyScript.AnalyzerElementReference();
            done();
        });

        it('check initial state', function () {
            expect(analyzerElementReference).to.be.an('object');
            expect(analyzerElementReference).to.be.an.instanceof(MyScript.AnalyzerElementReference);
        });

        it('Unique Id getter', function () {
            expect(analyzerElementReference.getUniqueId()).to.be.undefined;
        });

        it('Type getter', function () {
            expect(analyzerElementReference.getType()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerElementReference;
        before(function (done) {
            analyzerElementReference = new MyScript.AnalyzerElementReference({
                uniqueID: 'test',
                type: 'test'
            });
            done();
        });

        it('check initial state', function () {
            expect(analyzerElementReference).to.be.an('object');
            expect(analyzerElementReference).to.be.an.instanceof(MyScript.AnalyzerElementReference);
        });

        it('Test AnalyzerElementReference object construction', function () {
            expect(analyzerElementReference.getUniqueId()).to.not.be.undefined;
            expect(analyzerElementReference.getType()).to.not.be.undefined;
        });

    });

});