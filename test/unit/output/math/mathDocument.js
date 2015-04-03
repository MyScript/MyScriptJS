'use strict';

describe('MyScriptJS: output/math/mathDocument.js', function () {

    it('MathDocument object exist', function () {
        expect(MyScript.MathDocument).to.exist;
        expect(MyScript.MathDocument).not.to.be.null;
        expect(MyScript.MathDocument).to.not.be.undefined;
    });

    var mathDocument = new MyScript.MathDocument();
    it('MathDocument constructor', function () {
        expect(mathDocument).to.be.an('object');
        expect(mathDocument).to.be.an.instanceof(MyScript.MathDocument);
        expect(mathDocument).to.have.ownProperty('results');
        expect(mathDocument).to.have.ownProperty('scratchOutResults');
    });

    it('MathDocument Result Elements getter', function () {
        expect(mathDocument.getResultElements()).to.be.empty;
    });

    it('MathDocument Scratch Out Results getter', function () {
        expect(mathDocument.getScratchOutResults()).to.be.empty;
    });

    var obj = {
        results: [{
            type: 'MATHML'
        },{
            type: 'LATEX'
        },{
            type: 'SYMBOLTREE',
            root: {
                type: 'terminalNode'
            }
        }],
        scratchOutResults: [{
            type: 'test'
        }]
    };
    var mathDocument2 = new MyScript.MathDocument(obj);
    it('Test MathDocument object construction: MathMathMLResultElement construction', function () {
        expect(mathDocument2.getResultElements()[0]).to.be.an.instanceof(MyScript.MathMathMLResultElement);
    });
    it('Test MathDocument object construction: MathLaTexResultElement construction', function () {
        expect(mathDocument2.getResultElements()[1]).to.be.an.instanceof(MyScript.MathLaTexResultElement);
    });
    it('Test MathDocument object construction: MathSymbolTreeResultElement construction', function () {
        expect(mathDocument2.getResultElements()[2]).to.be.an.instanceof(MyScript.MathSymbolTreeResultElement);
    });
    it('Test MathDocument object construction: MathScratchOut construction', function () {
        expect(mathDocument2.getScratchOutResults()[0]).to.be.an.instanceof(MyScript.MathScratchOut);
    });
    it('Test MathDocument object construction: wrong mathResult', function () {
        var data = {
            results: [{
                type: 'unknown'
            }]
        };
        expect(function(){new MyScript.MathDocument(data);}).to.throw(Error);
    });

});