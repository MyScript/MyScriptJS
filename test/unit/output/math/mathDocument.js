'use strict';

describe('MathDocument: output/math/mathDocument.js', function () {

    describe('Default construction', function () {

        var mathDocument;
        before(function (done) {
            mathDocument = new MyScript.MathDocument();
            done();
        });

        it('check initial state', function () {
            expect(mathDocument).to.be.an('object');
            expect(mathDocument).to.be.an.instanceof(MyScript.MathDocument);
            expect(mathDocument).to.have.ownProperty('results');
            expect(mathDocument).to.have.ownProperty('scratchOutResults');
        });

        it('Result Elements getter', function () {
            expect(mathDocument.getResultElements()).to.be.empty;
        });

        it('Scratch Out Results getter', function () {
            expect(mathDocument.getScratchOutResults()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var mathDocument;
        before(function (done) {
            mathDocument = new MyScript.MathDocument({
                results: [{
                    type: 'MATHML'
                }, {
                    type: 'LATEX'
                }, {
                    type: 'SYMBOLTREE',
                    root: {
                        type: 'terminalNode'
                    }
                }],
                scratchOutResults: [{
                    type: 'test'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(mathDocument).to.be.an('object');
            expect(mathDocument).to.be.an.instanceof(MyScript.MathDocument);
            expect(mathDocument).to.have.ownProperty('results');
            expect(mathDocument).to.have.ownProperty('scratchOutResults');
        });

        it('Test MathDocument object construction: MathMathMLResultElement construction', function () {
            expect(mathDocument.getResultElements()[0]).to.be.an.instanceof(MyScript.MathMathMLResultElement);
        });

        it('Test MathDocument object construction: MathLaTexResultElement construction', function () {
            expect(mathDocument.getResultElements()[1]).to.be.an.instanceof(MyScript.MathLaTexResultElement);
        });

        it('Test MathDocument object construction: MathSymbolTreeResultElement construction', function () {
            expect(mathDocument.getResultElements()[2]).to.be.an.instanceof(MyScript.MathSymbolTreeResultElement);
        });

        it('Test MathDocument object construction: MathScratchOut construction', function () {
            expect(mathDocument.getScratchOutResults()[0]).to.be.an.instanceof(MyScript.MathScratchOut);
        });

        it('Test MathDocument object construction: wrong mathResult', function () {
            var data = {
                results: [{
                    type: 'unknown'
                }]
            };
            expect(function () {
                new MyScript.MathDocument(data);
            }).to.throw(Error);
        });

    });

});