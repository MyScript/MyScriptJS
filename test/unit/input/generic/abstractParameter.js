'use strict';

describe('MyScriptJS: input/generic/abstractParameter.js', function () {

    it('AbstractParameter object exist', function () {
        expect(MyScript.AbstractParameter).to.exist;
        expect(MyScript.AbstractParameter).not.to.be.null;
        expect(MyScript.AbstractParameter).to.not.be.undefined;
    });

    it('AbstractParameter constructor', function () {
        var abstractParameter = new MyScript.AbstractParameter();
        expect(abstractParameter).to.be.an('object');
        expect(abstractParameter).to.be.an.instanceof(MyScript.AbstractParameter);
    });

});