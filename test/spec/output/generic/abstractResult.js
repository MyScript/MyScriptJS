'use strict';

describe('MyScriptJS: output/generic/abstractResult.js', function () {

    var expect = require('chai').expect;

    it('AbstractResult object exist', function () {
        expect(MyScript.AbstractResult).to.exist;
        expect(MyScript.AbstractResult).not.to.be.null;
        expect(MyScript.AbstractResult).to.not.be.undefined;
    });

    it('AbstractResult constructor', function () {
        var abstractResult = new MyScript.AbstractResult();
        expect(abstractResult).to.be.an('object');
        expect(abstractResult).to.be.an.instanceof(MyScript.AbstractResult);
    });

    it('AbstractResult Instance Id getter', function () {
        var abstractResult = new MyScript.AbstractResult();
        expect(abstractResult.getInstanceId()).to.be.undefined;
    });

});