'use strict';

describe('TextParameter: input/text/textParameter.js', function () {

    describe('Default construction', function () {

        var textParameter;
        before(function (done) {
            textParameter = new MyScript.TextParameter();
            done();
        });

        it('Check initial state', function () {
            expect(textParameter).to.be.an('object');
            expect(textParameter).to.be.an.instanceOf(MyScript.AbstractParameter);
            expect(textParameter).to.be.an.instanceOf(MyScript.TextParameter);
            expect(textParameter).to.have.ownProperty('textProperties');
        });

        it('Get language', function () {
            expect(textParameter.getLanguage()).to.be.undefined;
        });

        it('Set language', function () {
            textParameter.setLanguage('en_US');
            expect(textParameter.getLanguage()).to.equal('en_US');
        });

        it('Get input mode', function () {
            expect(textParameter.getInputMode()).to.be.undefined;
        });

        it('Set input mode', function () {
            textParameter.setInputMode('CURSIVE');
            expect(textParameter.getInputMode()).to.equal('CURSIVE');
        });

        it('Get content types', function () {
            expect(textParameter.getContentTypes()).to.be.undefined;
        });

        it('Set content types', function () {
            textParameter.setContentTypes(['text']);
            expect(textParameter.getContentTypes().length).to.equal(1);
            expect(textParameter.getContentTypes()[0]).to.equal('text');
        });

        it('Get SK', function () {
            expect(textParameter.getSubsetKnowledges()).to.be.undefined;
        });

        it('Set SK', function () {
            textParameter.setSubsetKnowledges(['digit']);
            expect(textParameter.getSubsetKnowledges().length).to.equal(1);
            expect(textParameter.getSubsetKnowledges()[0]).to.equal('digit');
        });

        it('Get user resources', function () {
            expect(textParameter.getUserResources()).to.be.empty;
        });

        it('Set user resources', function () {
            textParameter.setUserResources(['myResource1', 'myResource2']);
            expect(textParameter.getUserResources().length).to.equal(2);
            expect(textParameter.getUserResources()[0]).to.equal('myResource1');
            expect(textParameter.getUserResources()[1]).to.equal('myResource2');
        });

        it('Get user LK words', function () {
            expect(textParameter.getUserLkWords()).to.be.empty;
        });

        it('Set user LK words', function () {
            textParameter.setUserLkWords(['city', 'country']);
            expect(textParameter.getUserLkWords().length).to.equal(2);
            expect(textParameter.getUserLkWords()[0]).to.equal('city');
            expect(textParameter.getUserLkWords()[1]).to.equal('country');
        });

        it('Get result detail', function () {
            expect(textParameter.getResultDetail()).to.be.empty;
        });

        it('Set result detail', function () {
            textParameter.setResultDetail('CHARACTER');
            expect(textParameter.getResultDetail()).to.equal('CHARACTER');
        });

        it('Get properties', function () {
            expect(textParameter.getTextProperties()).to.be.an.instanceOf(MyScript.TextProperties);
        });

        it('Set properties', function () {
            textParameter.setTextProperties(new MyScript.TextProperties());
            expect(textParameter.getTextProperties()).not.to.be.undefined;
        });

    });

});