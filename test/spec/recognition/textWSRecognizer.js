'use strict';

describe('MyScriptJS: recognition/textWSRecognizer.js', function () {

    var expect = require('chai').expect;

    it('TextWSRecognizer object exist', function () {
        expect(MyScript.TextWSRecognizer).to.exist;
        expect(MyScript.TextWSRecognizer).not.to.be.null;
        expect(MyScript.TextWSRecognizer).to.not.be.undefined;
    });

});