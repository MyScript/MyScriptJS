'use strict';

describe('MyScriptJS: input/generic/abstractRecognitionInput.js', function () {

    var expect = require('chai').expect;

    it('AbstractRecognitionInput object exist', function () {
        expect(MyScript.AbstractRecognitionInput).to.exist;
        expect(MyScript.AbstractRecognitionInput).not.to.be.null;
        expect(MyScript.AbstractRecognitionInput).to.not.be.undefined;
    });

    it('AbstractRecognitionInput constructor', function () {
        var abstractRecognitionInput = new MyScript.AbstractRecognitionInput();
        expect(abstractRecognitionInput).to.be.an('object');
        expect(abstractRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
    });

});