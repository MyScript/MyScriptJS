'use strict';

describe('TextParameter: input/text/textParameter.js', function () {

    describe('Default construction', function () {

        var textParameter;
        before(function (done) {
            textParameter = new MyScript.TextParameter();
            done();
        });

        it('check initial state', function () {
            expect(textParameter).to.be.an('object');
            expect(textParameter).to.be.an.instanceof(MyScript.AbstractParameter);
            expect(textParameter).to.be.an.instanceof(MyScript.TextParameter);
        });

    });

    describe('Accessors', function () {

        var textParameter;
        beforeEach(function (done) {
            textParameter = new MyScript.TextParameter();
            done();
        });

        it('language getter', function () {
            expect(textParameter.getLanguage()).to.be.undefined;
        });

        it('language setter', function () {
            expect(textParameter.getLanguage()).to.be.undefined;
            textParameter.setLanguage('en_US');
            expect(textParameter.getLanguage()).not.to.be.undefined;
            expect(textParameter.getLanguage()).to.be.equal('en_US');
        });

        it('input mode getter', function () {
            expect(textParameter.getInputMode()).to.be.undefined;
        });

        it('input mode setter', function () {
            expect(textParameter.getInputMode()).to.be.undefined;
            textParameter.setInputMode('CURSIVE');
            expect(textParameter.getInputMode()).not.to.be.undefined;
            expect(textParameter.getInputMode()).to.be.equal('CURSIVE');
        });

        it('content types getter', function () {
            expect(textParameter.getContentTypes()).to.be.undefined;
        });

        it('content types setter', function () {
            expect(textParameter.getContentTypes()).to.be.undefined;
            textParameter.setContentTypes(['text']);
            expect(textParameter.getContentTypes()).not.to.be.undefined;
            expect(textParameter.getContentTypes()).to.be.eql(['text']);
        });

        it('Subset Knowledges getter', function () {
            expect(textParameter.getSubsetKnowledges()).to.be.undefined;
        });

        it('Subset Knowledges setter', function () {
            expect(textParameter.getSubsetKnowledges()).to.be.undefined;
            textParameter.setSubsetKnowledges(['digit']);
            expect(textParameter.getSubsetKnowledges()).not.to.be.undefined;
            expect(textParameter.getSubsetKnowledges()).to.be.eql(['digit']);
        });

        it('user resources getter', function () {
            expect(textParameter.getUserResources()).to.be.empty;
        });

        it('user resources setter', function () {
            expect(textParameter.getUserResources()).to.be.undefined;

            textParameter.setUserResources(['myresource1', 'myresource2']);
            expect(textParameter.getUserResources().length).to.equal(2);
            expect(textParameter.getUserResources()[0]).to.equal('myresource1');
            expect(textParameter.getUserResources()[1]).to.equal('myresource2');
        });

        it('user LK words getter', function () {
            expect(textParameter.getUserLkWords()).to.be.empty;
        });

        it('user LK words setter', function () {
            expect(textParameter.getUserLkWords()).to.be.undefined;

            textParameter.setUserLkWords(['city', 'country']);
            expect(textParameter.getUserLkWords().length).to.equal(2);
            expect(textParameter.getUserLkWords()[0]).to.equal('city');
            expect(textParameter.getUserLkWords()[1]).to.equal('country');
        });

        it('result detail getter', function () {
            expect(textParameter.getResultDetail()).to.be.empty;
        });

        it('result detail setter', function () {
            expect(textParameter.getResultDetail()).to.be.undefined;

            textParameter.setResultDetail('CHARACTER');
            expect(textParameter.getResultDetail()).not.to.be.undefined;
            expect(textParameter.getResultDetail()).to.equal('CHARACTER');
        });

        it('text properties getter', function () {
            expect(textParameter.getTextProperties()).to.be.empty;
        });

        it('text properties setter', function () {
            expect(textParameter.getTextProperties()).to.be.undefined;
            textParameter.setTextProperties(new MyScript.TextProperties());
            expect(textParameter.getTextProperties()).not.to.be.undefined;
        });

    });

});