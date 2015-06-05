'use strict';

describe('AbstractRecognizer: recognition/abstractRecognizer.js', function () {

    describe('Default construction', function () {

        var abstractRecognizer;
        before(function (done) {
            abstractRecognizer = new MyScript.AbstractRecognizer();
            done();
        });

        it('check initial state', function () {
            expect(abstractRecognizer).to.be.an('object');
            expect(abstractRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        });

    });

});