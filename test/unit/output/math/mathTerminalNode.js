'use strict';

describe('MathTerminalNode: output/math/mathTerminalNode.js', function () {

    describe('Default construction', function () {

        var mathTerminalNode;
        before(function (done) {
            mathTerminalNode = new MyScript.MathTerminalNode();
            done();
        });

        it('check initial state', function () {
            expect(mathTerminalNode).to.be.an('object');
            expect(mathTerminalNode).to.be.an.instanceof(MyScript.MathNode);
            expect(mathTerminalNode).to.be.an.instanceof(MyScript.MathTerminalNode);
            expect(mathTerminalNode).to.have.ownProperty('candidates');
            expect(mathTerminalNode).to.have.ownProperty('inkRanges');
        });

        it('Candidates getter', function () {
            expect(mathTerminalNode.getCandidates()).to.be.empty;
        });

        it('Ink Ranges getter', function () {
            expect(mathTerminalNode.getInkRanges()).to.be.empty;
        });

        it('Selected Candidate getter', function () {
            expect(mathTerminalNode.getSelectedCandidate()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var mathTerminalNode;
        before(function (done) {
            mathTerminalNode = new MyScript.MathTerminalNode({
                inkRanges: [{
                    type: 'inkRange'
                }],
                candidates: [{
                    type: 'candidate'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(mathTerminalNode).to.be.an('object');
            expect(mathTerminalNode).to.be.an.instanceof(MyScript.MathNode);
            expect(mathTerminalNode).to.be.an.instanceof(MyScript.MathTerminalNode);
            expect(mathTerminalNode).to.have.ownProperty('candidates');
            expect(mathTerminalNode).to.have.ownProperty('inkRanges');
        });

        it('Test MathTerminalNode object construction: MathTerminalNodeCandidate construction', function () {
            expect(mathTerminalNode.getCandidates()[0]).to.be.an.instanceof(MyScript.MathTerminalNodeCandidate);
        });

        it('Test MathTerminalNode object construction: MathTerminalNodeCandidate construction', function () {
            expect(mathTerminalNode.getInkRanges()[0]).to.be.an.instanceof(MyScript.MathInkRange);
        });

    });

});