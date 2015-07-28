'use strict';

describe('AbstractWSRecognizer: recognition/abstractWSRecognizer.js', function () {

    describe('Default construction', function () {

        var abstractWSRecognizer;
        before(function (done) {
            abstractWSRecognizer = new MyScript.AbstractWSRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(abstractWSRecognizer).to.be.an('object');
            expect(abstractWSRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(abstractWSRecognizer).to.be.an.instanceOf(MyScript.AbstractWSRecognizer);
        });

    });

    describe('Accessors', function () {

        var abstractWSRecognizer;
        before(function (done) {
            abstractWSRecognizer = new MyScript.AbstractWSRecognizer();
            done();
        });

    });

});