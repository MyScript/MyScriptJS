'use strict';

describe('TextInputUnit: input/text/textInputUnit.js', function () {

    describe('Default construction', function () {

        var textInputUnit;
        before(function (done) {
            textInputUnit = new MyScript.TextInputUnit();
            done();
        });

        it('check initial state', function () {
            expect(textInputUnit).to.be.an('object');
            expect(textInputUnit).to.be.an.instanceof(MyScript.TextInputUnit);
            expect(textInputUnit).to.have.ownProperty('textInputType');
            expect(textInputUnit).to.have.ownProperty('components');
        });

    });

    describe('Accessors', function () {

        var textInputUnit;
        beforeEach(function (done) {
            textInputUnit = new MyScript.TextInputUnit();
            done();
        });

        it('input type getter', function () {
            expect(textInputUnit.getInputType()).to.be.equal('MULTI_LINE_TEXT');
        });

        it('input type setter', function () {
            expect(textInputUnit.getInputType()).to.be.equal('MULTI_LINE_TEXT');
            textInputUnit.setInputType('SINGLE_LINE_TEXT');
            expect(textInputUnit.getInputType()).to.not.be.undefined;
            expect(textInputUnit.getInputType()).to.be.equal('SINGLE_LINE_TEXT');
        });

        it('components getter', function () {
            expect(textInputUnit.getComponents()).to.be.empty;
        });

        it('components setter', function () {
            expect(textInputUnit.getComponents()).to.be.empty;
            textInputUnit.setComponents(new MyScript.AbstractComponent());
            expect(textInputUnit.getComponents()).not.to.be.undefined;
        });

    });

});