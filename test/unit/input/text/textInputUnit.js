'use strict';

describe('TextInputUnit: input/text/textInputUnit.js', function () {

    describe('Default construction', function () {

        var textInputUnit;
        before(function (done) {
            textInputUnit = new MyScript.TextInputUnit();
            done();
        });

        it('Check initial state', function () {
            expect(textInputUnit).to.be.an('object');
            expect(textInputUnit).to.be.an.instanceOf(MyScript.TextInputUnit);
            expect(textInputUnit).to.have.ownProperty('textInputType');
            expect(textInputUnit).to.have.ownProperty('components');
        });

        it('Get input type', function () {
            expect(textInputUnit.getInputType()).to.equal('MULTI_LINE_TEXT');
        });

        it('Set input type', function () {
            textInputUnit.setInputType('SINGLE_LINE_TEXT');
            expect(textInputUnit.getInputType()).to.not.be.undefined;
            expect(textInputUnit.getInputType()).to.equal('SINGLE_LINE_TEXT');
        });

        it('Get components', function () {
            expect(textInputUnit.getComponents()).to.be.empty;
        });

        it('Set components', function () {
            textInputUnit.setComponents(new MyScript.AbstractComponent());
            expect(textInputUnit.getComponents()).not.to.be.undefined;
        });

    });

});