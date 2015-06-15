'use strict';

describe('MathParameter: input/math/mathParameter.js', function () {

    describe('Default construction', function () {

        var mathParameter;
        before(function (done) {
            mathParameter = new MyScript.MathParameter();
            done();
        });

        it('Check initial state', function () {
            expect(mathParameter).to.be.an('object');
            expect(mathParameter).to.be.an.instanceOf(MyScript.AbstractParameter);
            expect(mathParameter).to.be.an.instanceOf(MyScript.MathParameter);
            expect(mathParameter).to.have.ownProperty('resultTypes');
            expect(mathParameter).to.have.ownProperty('userResources');
        });

        it('Get result types', function () {
            expect(mathParameter.getResultTypes().length).to.equal(0);
        });

        it('Set result types', function () {
            mathParameter.setResultTypes(['LaTex', 'MathML', 'SymbolTree']);
            expect(mathParameter.getResultTypes().length).to.equal(3);
            expect(mathParameter.getResultTypes()[0]).to.equal('LaTex');
            expect(mathParameter.getResultTypes()[1]).to.equal('MathML');
            expect(mathParameter.getResultTypes()[2]).to.equal('SymbolTree');
        });

        it('Get user resources', function () {
            expect(mathParameter.getUserResources()).to.be.empty;
        });

        it('Set user resources', function () {
            mathParameter.setUserResources(['math-grm-calculator', 'math-grm-standard']);
            expect(mathParameter.getUserResources().length).to.equal(2);
            expect(mathParameter.getUserResources()[0]).to.equal('math-grm-calculator');
            expect(mathParameter.getUserResources()[1]).to.equal('math-grm-standard');
        });

        it('Get scratchOut detection sensitivity', function () {
            expect(mathParameter.getScratchOutDetectionSensitivity()).to.be.undefined;
        });

        it('Set scratchOut detection sensitivity', function () {
            mathParameter.setScratchOutDetectionSensitivity(15);
            expect(mathParameter.getScratchOutDetectionSensitivity()).not.to.be.undefined;
            expect(mathParameter.getScratchOutDetectionSensitivity()).to.equal(15);
        });

        it('Get is columnar', function () {
            expect(mathParameter.isColumnar()).to.be.undefined;
        });

        it('Set is columnar', function () {
            mathParameter.setColumnar(true);
            expect(mathParameter.isColumnar()).not.to.be.undefined;
            expect(mathParameter.isColumnar()).to.be.true;
        });

    });

});