'use strict';

describe('MathTerminalNode: output/math/mathTerminalNode.js', function () {

    describe('Default construction', function () {

        var mathTerminalNode;
        before(function (done) {
            mathTerminalNode = new MyScript.MathTerminalNode();
            done();
        });

        it('Check initial state', function () {
            expect(mathTerminalNode).to.be.an('object');
            expect(mathTerminalNode).to.be.an.instanceOf(MyScript.MathNode);
            expect(mathTerminalNode).to.be.an.instanceOf(MyScript.MathTerminalNode);
            expect(mathTerminalNode).to.have.ownProperty('candidates');
            expect(mathTerminalNode).to.have.ownProperty('inkRanges');
        });

        it('Get candidates', function () {
            expect(mathTerminalNode.getCandidates().length).to.equal(0);
        });

        it('Get ink ranges', function () {
            expect(mathTerminalNode.getInkRanges().length).to.equal(0);
        });

        it('Get selected candidate index', function () {
            expect(mathTerminalNode.getSelectedCandidateIdx()).to.equal(undefined);
        });

        it('Get selected candidate', function () {
            expect(mathTerminalNode.getSelectedCandidate()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var mathTerminalNode;
        before(function (done) {
            mathTerminalNode = new MyScript.MathTerminalNode({
                selectedCandidate: 0,
                inkRanges: [{
                    type: 'inkRange'
                }],
                candidates: [{
                    type: 'candidate'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(mathTerminalNode).to.be.an('object');
            expect(mathTerminalNode).to.be.an.instanceOf(MyScript.MathNode);
            expect(mathTerminalNode).to.be.an.instanceOf(MyScript.MathTerminalNode);
            expect(mathTerminalNode).to.have.ownProperty('candidates');
            expect(mathTerminalNode).to.have.ownProperty('inkRanges');
        });

        it('Get candidates', function () {
            expect(mathTerminalNode.getCandidates()[0]).not.to.be.empty;
        });

        it('Get ink ranges', function () {
            expect(mathTerminalNode.getInkRanges()[0]).to.be.an.instanceOf(MyScript.MathInkRange);
        });

        it('Get selected candidate index', function () {
            expect(mathTerminalNode.getSelectedCandidateIdx()).to.equal(0);
        });

        it('Get selected candidate', function () {
            expect(mathTerminalNode.getSelectedCandidate()).to.be.an.instanceOf(MyScript.MathTerminalNodeCandidate);
        });

    });

});