'use strict';

describe('MyScriptJS: input/math/mathParameter.js', function () {

    it('MathParameter object exist', function () {
        expect(MyScript.MathParameter).to.exist;
        expect(MyScript.MathParameter).not.to.be.null;
        expect(MyScript.MathParameter).to.not.be.undefined;
    });

    it('MathParameter constructor', function () {
        var mathParameter = new MyScript.MathParameter();
        expect(mathParameter).to.be.an('object');
        expect(mathParameter).to.be.an.instanceof(MyScript.AbstractParameter);
        expect(mathParameter).to.be.an.instanceof(MyScript.MathParameter);
        expect(mathParameter).to.have.ownProperty('resultTypes');
        expect(mathParameter).to.have.ownProperty('userResources');
    });

    it('MathParameter result types getter', function () {
        var mathParameter = new MyScript.MathParameter();
        expect(mathParameter.getResultTypes()).to.be.empty;
    });

    it('MathParameter result types setter', function () {
        var mathParameter = new MyScript.MathParameter();
        assert(Array.isArray(mathParameter.getResultTypes()), 'empty ResultType array is an array');

        mathParameter.setResultTypes(['LaTex', 'MathML', 'SymbolTree']);
        expect(mathParameter.getResultTypes().length).to.equal(3);
        expect(mathParameter.getResultTypes()[0]).to.equal('LaTex');
        expect(mathParameter.getResultTypes()[1]).to.equal('MathML');
        expect(mathParameter.getResultTypes()[2]).to.equal('SymbolTree');

    });

    it('MathParameter user ressources getter', function () {
        var mathParameter = new MyScript.MathParameter();
        expect(mathParameter.getUserResources()).to.be.empty;
    });

    it('MathParameter user ressources setter', function () {
        var mathParameter = new MyScript.MathParameter();
        assert(Array.isArray(mathParameter.getUserResources()), 'empty UserResources array is an array');

        mathParameter.setResultTypes(['LaTex', 'MathML', 'SymbolTree']);
        expect(mathParameter.getResultTypes().length).to.equal(3);
        expect(mathParameter.getResultTypes()[0]).to.equal('LaTex');
        expect(mathParameter.getResultTypes()[1]).to.equal('MathML');
        expect(mathParameter.getResultTypes()[2]).to.equal('SymbolTree');

    });

});