'use strict';

describe('MyScriptJS: output/math/mathNonTerminalNode.js', function () {

    var expect = require('chai').expect;

    it('MathNonTerminalNode object exist', function () {
        expect(MyScript.MathNonTerminalNode).to.exist;
        expect(MyScript.MathNonTerminalNode).not.to.be.null;
        expect(MyScript.MathNonTerminalNode).to.not.be.undefined;
    });

    it('MathNonTerminalNode constructor', function () {
        var mathNonTerminalNode = new MyScript.MathNonTerminalNode();
        expect(mathNonTerminalNode).to.be.an('object');
        expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNode);
        expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathNonTerminalNode).to.have.ownProperty('candidates');
    });

    it('MathNonTerminalNode Candidates getter', function () {
        var mathNonTerminalNode = new MyScript.MathNonTerminalNode();
        expect(mathNonTerminalNode.getCandidates()).to.be.empty;
    });

    it('MathNonTerminalNode Selected Candidate Idx getter', function () {
        var mathNonTerminalNode = new MyScript.MathNonTerminalNode();
        expect(mathNonTerminalNode.getSelectedCandidateIdx()).to.be.undefined;
    });

    it('MathNonTerminalNode Selected Candidate getter', function () {
        var mathNonTerminalNode = new MyScript.MathNonTerminalNode();
        expect(mathNonTerminalNode.getSelectedCandidate()).to.be.undefined;
    });

    it('MathNonTerminalNode Bounding Box getter', function () {
        var mathNonTerminalNode = new MyScript.MathNonTerminalNode();
        expect(mathNonTerminalNode.getBoundingBox()).to.be.undefined;
    });
});