'use strict';

describe('MathDocument: output/math/mathDocument.js', function () {

    describe('Default construction', function () {

        var mathDocument;
        before(function (done) {
            mathDocument = new MyScript.MathDocument();
            done();
        });

        it('Check initial state', function () {
            expect(mathDocument).to.be.an('object');
            expect(mathDocument).to.be.an.instanceOf(MyScript.MathDocument);
            expect(mathDocument).to.have.ownProperty('results');
            expect(mathDocument).to.have.ownProperty('scratchOutResults');
        });

        it('Get result elements', function () {
            expect(mathDocument.getResultElements().length).to.equal(0);
        });

        it('Get scratch-out', function () {
            expect(mathDocument.getScratchOutResults().length).to.equal(0);
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

        it('Check initial state', function () {
            expect(mathDocument).to.be.an('object');
            expect(mathDocument).to.be.an.instanceOf(MyScript.MathDocument);
            expect(mathDocument).to.have.ownProperty('results');
            expect(mathDocument).to.have.ownProperty('scratchOutResults');
        });

        it('Get MathML', function () {
            expect(mathDocument.getResultElements()[0]).to.be.an.instanceOf(MyScript.MathMathMLResultElement);
        });

        it('Get LaTeX', function () {
            expect(mathDocument.getResultElements()[1]).to.be.an.instanceOf(MyScript.MathLaTexResultElement);
        });

        it('Get SymbolTree', function () {
            expect(mathDocument.getResultElements()[2]).to.be.an.instanceOf(MyScript.MathSymbolTreeResultElement);
        });

        it('Get scratch-out', function () {
            expect(mathDocument.getScratchOutResults()[0]).to.be.an.instanceOf(MyScript.MathScratchOut);
        });

        it('Get wrong mathResult', function () {
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