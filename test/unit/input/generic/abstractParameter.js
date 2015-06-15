'use strict';

describe('AbstractContinueRequestWSMessage: input/generic/abstractParameter.js', function () {

    describe('Default construction', function () {

        var abstractParameter;
        before(function (done) {
            abstractParameter = new MyScript.AbstractParameter();
            done();
        });

        it('Check initial state', function () {
            expect(abstractParameter).to.be.an('object');
            expect(abstractParameter).to.be.an.instanceOf(MyScript.AbstractParameter);
        });

    });

});