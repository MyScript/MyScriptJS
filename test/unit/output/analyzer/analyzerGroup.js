'use strict';

describe('AnalyzerGroup: output/analyzer/analyzerGroup.js', function () {

    describe('Default construction', function () {

        var analyzerGroup;
        before(function (done) {
            analyzerGroup = new MyScript.AnalyzerGroup();
            done();
        });

        it('check initial state', function () {
            expect(analyzerGroup).to.be.an('object');
            expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerGroup);
            expect(analyzerGroup).to.have.ownProperty('elementReferences');
        });

        it('Element References getter', function () {
            expect(analyzerGroup.getElementReferences()).to.be.empty;
        });

        it('Type getter', function () {
            expect(analyzerGroup.getType()).to.be.undefined;
        });

        it('Unique Id getter', function () {
            expect(analyzerGroup.getUniqueId()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerGroup;
        before(function (done) {
            analyzerGroup = new MyScript.AnalyzerGroup({
                uniqueID: 'test',
                type: 'test',
                elementReferences: [{
                    type: 'test'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(analyzerGroup).to.be.an('object');
            expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerGroup).to.be.an.instanceof(MyScript.AnalyzerGroup);
            expect(analyzerGroup).to.have.ownProperty('elementReferences');
        });

        it('Type getter', function () {
            expect(analyzerGroup.getType()).to.not.be.undefined;
        });

        it('Unique Id getter', function () {
            expect(analyzerGroup.getUniqueId()).to.not.be.undefined;
        });

        it('Test AnalyzerGroup object construction: AnalyzerElementReference construction', function () {
            expect(analyzerGroup.getElementReferences()[0]).to.be.an.instanceof(MyScript.AnalyzerElementReference);
        });

    });
});