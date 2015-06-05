'use strict';

describe('AnalyzerRecognizedStroke: output/analyzer/analyzerRecognizedStroke.js', function () {

    describe('Default construction', function () {

        var analyzerRecognizedStroke;
        before(function (done) {
            analyzerRecognizedStroke = new MyScript.AnalyzerRecognizedStroke();
            done();
        });

        it('check initial state', function () {
            expect(analyzerRecognizedStroke).to.be.an('object');
            expect(analyzerRecognizedStroke).to.be.an.instanceof(MyScript.AnalyzerRecognizedStroke);
        });

        it('Type getter', function () {
            expect(analyzerRecognizedStroke.getType()).to.be.undefined;
        });

        it('X getter', function () {
            expect(analyzerRecognizedStroke.getX()).to.be.undefined;
        });

        it('Y getter', function () {
            expect(analyzerRecognizedStroke.getY()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerRecognizedStroke;
        before(function (done) {
            analyzerRecognizedStroke = new MyScript.AnalyzerRecognizedStroke({
                type: 'test',
                x: [0, 1],
                y: [0, 1]
            });
            done();
        });

        it('check initial state', function () {
            expect(analyzerRecognizedStroke).to.be.an('object');
            expect(analyzerRecognizedStroke).to.be.an.instanceof(MyScript.AnalyzerRecognizedStroke);
        });

        it('Test AnalyzerRecognizedStroke object construction', function () {
            expect(analyzerRecognizedStroke.getType()).to.not.be.undefined;
            expect(analyzerRecognizedStroke.getX()).to.not.be.undefined;
            expect(analyzerRecognizedStroke.getY()).to.not.be.undefined;
        });

    });

});