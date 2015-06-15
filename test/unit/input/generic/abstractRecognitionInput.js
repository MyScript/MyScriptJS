'use strict';

describe('AbstractRecognitionInput: input/generic/abstractRecognitionInput.js', function () {

    describe('Default construction', function () {

        var abstractRecognitionInput;
        before(function (done) {
            abstractRecognitionInput = new MyScript.AbstractRecognitionInput();
            done();
        });

        it('Check initial state', function () {
            expect(abstractRecognitionInput).to.be.an('object');
            expect(abstractRecognitionInput).to.be.an.instanceOf(MyScript.AbstractRecognitionInput);
        });

    });

});