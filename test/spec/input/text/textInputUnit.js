'use strict';

describe('MyScriptJS: input/text/textInputUnit.js', function () {

    it('TextInputUnit object exist', function () {
        expect(MyScript.TextInputUnit).to.exist;
        expect(MyScript.TextInputUnit).not.to.be.null;
        expect(MyScript.TextInputUnit).to.not.be.undefined;
    });

    it('TextInputUnit constructor', function () {
        var textInputUnit = new MyScript.TextInputUnit();
        expect(textInputUnit).to.be.an('object');
        expect(textInputUnit).to.be.an.instanceof(MyScript.TextInputUnit);
        expect(textInputUnit).to.have.ownProperty('hwrInputType');
        expect(textInputUnit).to.have.ownProperty('components');
    });

    it('TextInputUnit input type getter', function () {
        var textInputUnit = new MyScript.TextInputUnit();
        expect(textInputUnit.getInputType()).to.be.equal('MULTI_LINE_TEXT');
    });

    it('TextInputUnit input type setter', function () {
        var textInputUnit = new MyScript.TextInputUnit();
        expect(textInputUnit.getInputType()).to.be.equal('MULTI_LINE_TEXT');
        textInputUnit.setInputType('SINGLE_LINE_TEXT');
        expect(textInputUnit.getInputType()).to.not.be.undefined;
        expect(textInputUnit.getInputType()).to.be.equal('SINGLE_LINE_TEXT');
    });

    it('TextInputUnit components getter', function () {
        var textInputUnit = new MyScript.TextInputUnit();
        expect(textInputUnit.getComponents()).to.be.empty;
    });

    it('TextInputUnit components setter', function () {
        var textInputUnit = new MyScript.TextInputUnit();
        expect(textInputUnit.getComponents()).to.be.empty;
        textInputUnit.setComponents(new MyScript.AbstractComponent());
        expect(textInputUnit.getComponents()).not.to.be.undefined;
    });
});