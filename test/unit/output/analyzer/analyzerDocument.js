'use strict';

describe('AnalyzerDocument: output/analyzer/analyzerDocument.js', function () {

    describe('Default construction', function () {

        var analyzerDocument;
        before(function (done) {
            analyzerDocument = new MyScript.AnalyzerDocument();
            done();
        });

        it('check initial state', function () {
            expect(analyzerDocument).to.be.an('object');
            expect(analyzerDocument).to.be.an.instanceof(MyScript.AnalyzerElement);
            expect(analyzerDocument).to.be.an.instanceof(MyScript.AnalyzerDocument);
            expect(analyzerDocument).to.have.ownProperty('textLines');
            expect(analyzerDocument).to.have.ownProperty('shapes');
            expect(analyzerDocument).to.have.ownProperty('tables');
            expect(analyzerDocument).to.have.ownProperty('groups');
        });

        it('Text Lines getter', function () {
            expect(analyzerDocument.getTextLines()).to.be.empty;
        });

        it('Shapes getter', function () {
            expect(analyzerDocument.getShapes()).to.be.empty;
        });

        it('Tables getter', function () {
            expect(analyzerDocument.getTables()).to.be.empty;
        });

        it('Groups getter', function () {
            expect(analyzerDocument.getGroups()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var analyzerDocument;
        before(function (done) {
            analyzerDocument = new MyScript.AnalyzerDocument({
                textLines: [{
                    type: 'test'
                }],
                shapes: [{
                    type: 'test'
                }],
                tables: [{
                    type: 'test'
                }],
                groups: [{
                    type: 'test'
                }]
            });
            done();
        });

        it('Test AnalyzerDocument object construction: AnalyzerTextLine construction', function () {
            expect(analyzerDocument.getTextLines()[0]).to.be.an.instanceof(MyScript.AnalyzerTextLine);
        });

        it('Test AnalyzerDocument object construction: ShapeSegment construction', function () {
            expect(analyzerDocument.getShapes()[0]).to.be.an.instanceof(MyScript.ShapeSegment);
        });

        it('Test AnalyzerDocument object construction: AnalyzerTable construction', function () {
            expect(analyzerDocument.getTables()[0]).to.be.an.instanceof(MyScript.AnalyzerTable);
        });

        it('Test AnalyzerDocument object construction: AnalyzerGroup construction', function () {
            expect(analyzerDocument.getGroups()[0]).to.be.an.instanceof(MyScript.AnalyzerGroup);
        });

    });

});