'use strict';

describe('MathResponseWSMessage: input/generic/mathResponseWSMessage.js', function () {

    describe('Default construction', function () {

        var mathResponse;
        before(function (done) {
            mathResponse = new MyScript.MathResponseWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(mathResponse).to.be.an('object');
            expect(mathResponse).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(mathResponse).to.be.an.instanceOf(MyScript.AbstractRecoResponseWSMessage);
            expect(mathResponse).to.be.an.instanceOf(MyScript.MathResponseWSMessage);
        });

        it('result getter', function () {
            expect(mathResponse.getMathDocument()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var mathResponse;
        before(function (done) {
            mathResponse = new MyScript.MathResponseWSMessage({
                result: {
                    type: 'document'
                }
            });
            done();
        });

        it('Check initial state', function () {
            expect(mathResponse).to.be.an('object');
            expect(mathResponse).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(mathResponse).to.be.an.instanceOf(MyScript.AbstractRecoResponseWSMessage);
            expect(mathResponse).to.be.an.instanceOf(MyScript.MathResponseWSMessage);
        });

        it('Test MathResponseWSMessage object construction: MathDocument construction', function () {
            expect(mathResponse.getMathDocument()).to.be.an.instanceOf(MyScript.MathDocument);
        });

    });

});