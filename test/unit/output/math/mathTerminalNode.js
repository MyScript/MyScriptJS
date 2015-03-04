'use strict';

describe('MyScriptJS: output/math/mathTerminalNode.js', function () {

    it('MathTerminalNode object exist', function () {
        expect(MyScript.MathTerminalNode).to.exist;
        expect(MyScript.MathTerminalNode).not.to.be.null;
        expect(MyScript.MathTerminalNode).to.not.be.undefined;
    });

    var mathTerminalNode = new MyScript.MathTerminalNode();
    it('MathTerminalNode constructor', function () {
        expect(mathTerminalNode).to.be.an('object');
        expect(mathTerminalNode).to.be.an.instanceof(MyScript.MathNode);
        expect(mathTerminalNode).to.be.an.instanceof(MyScript.MathTerminalNode);
        expect(mathTerminalNode).to.have.ownProperty('candidates');
        expect(mathTerminalNode).to.have.ownProperty('inkRanges');
    });

    it('MathTerminalNode Candidates getter', function () {
        expect(mathTerminalNode.getCandidates()).to.be.empty;
    });

    it('MathTerminalNode Ink Ranges getter', function () {
        expect(mathTerminalNode.getInkRanges()).to.be.empty;
    });

    it('MathTerminalNode Selected Candidate getter', function () {
        expect(mathTerminalNode.getSelectedCandidate()).to.be.undefined;
    });

    var obj = {
        inkRanges: [{
            type: 'inkRange'
        }],
        candidates: [{
            type: 'candidate'
        }]
    };
    var mathTerminalNode2 = new MyScript.MathTerminalNode(obj);
    it('Test MathTerminalNode object construction: MathTerminalNodeCandidate construction', function () {
        expect(mathTerminalNode2.getCandidates()[0]).to.be.an.instanceof(MyScript.MathTerminalNodeCandidate);
    });
    it('Test MathTerminalNode object construction: MathTerminalNodeCandidate construction', function () {
        expect(mathTerminalNode2.getInkRanges()[0]).to.be.an.instanceof(MyScript.MathInkRange);
    });


});