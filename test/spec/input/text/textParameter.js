'use strict';

describe('MyScriptJS: input/text/textParameter.js', function () {

    it('TextParameter object exist', function () {
        expect(MyScript.TextParameter).to.exist;
        expect(MyScript.TextParameter).not.to.be.null;
        expect(MyScript.TextParameter).to.not.be.undefined;
    });

    it('TextParameter constructor', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter).to.be.an('object');
        expect(textParameter).to.be.an.instanceof(MyScript.AbstractParameter);
        expect(textParameter).to.be.an.instanceof(MyScript.TextParameter);
    });

    it('TextParameter language getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getLanguage()).to.be.undefined;
    });

    it('TextParameter language setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getLanguage()).to.be.undefined;
        textParameter.setLanguage('en_US');
        expect(textParameter.getLanguage()).not.to.be.undefined;
        expect(textParameter.getLanguage()).to.be.equal('en_US');
    });

    it('TextParameter input mode getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getInputMode()).to.be.undefined;
    });

    it('TextParameter input mode setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getInputMode()).to.be.undefined;
        textParameter.setInputMode('CURSIVE');
        expect(textParameter.getInputMode()).not.to.be.undefined;
        expect(textParameter.getInputMode()).to.be.equal('CURSIVE');
    });

    it('TextParameter content types getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getContentTypes()).to.be.undefined;
    });

    it('TextParameter content types setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getContentTypes()).to.be.undefined;
        textParameter.setContentTypes(['text']);
        expect(textParameter.getContentTypes()).not.to.be.undefined;
        expect(textParameter.getContentTypes()).to.be.eql(['text']);
    });

    it('TextParameter Subset Knowledges getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getSubsetKnowledges()).to.be.undefined;
    });

    it('TextParameter Subset Knowledges setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getSubsetKnowledges()).to.be.undefined;
        textParameter.setSubsetKnowledges(['digit']);
        expect(textParameter.getSubsetKnowledges()).not.to.be.undefined;
        expect(textParameter.getSubsetKnowledges()).to.be.eql(['digit']);
    });

    it('TextParameter user resources getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getUserResources()).to.be.empty;
    });

    it('TextParameter user resources setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getUserResources()).to.be.undefined;

        textParameter.setUserResources(['myresource1', 'myresource2']);
        expect(textParameter.getUserResources().length).to.equal(2);
        expect(textParameter.getUserResources()[0]).to.equal('myresource1');
        expect(textParameter.getUserResources()[1]).to.equal('myresource2');
    });

    it('TextParameter user LK words getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getUserLkWords()).to.be.empty;
    });

    it('TextParameter user LK words setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getUserLkWords()).to.be.undefined;

        textParameter.setUserLkWords(['city', 'country']);
        expect(textParameter.getUserLkWords().length).to.equal(2);
        expect(textParameter.getUserLkWords()[0]).to.equal('city');
        expect(textParameter.getUserLkWords()[1]).to.equal('country');
    });

    it('TextParameter result detail getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getResultDetail()).to.be.empty;
    });

    it('TextParameter result detail setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getResultDetail()).to.be.undefined;

        textParameter.setResultDetail('CHARACTER');
        expect(textParameter.getResultDetail()).not.to.be.undefined;
        expect(textParameter.getResultDetail()).to.equal('CHARACTER');
    });

    it('TextParameter text properties getter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getTextProperties()).to.be.empty;
    });

    it('TextParameter text properties setter', function () {
        var textParameter = new MyScript.TextParameter();
        expect(textParameter.getTextProperties()).to.be.undefined;
        textParameter.setTextProperties(new MyScript.TextProperties());
        expect(textParameter.getTextProperties()).not.to.be.undefined;
    });
});