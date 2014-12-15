'use strict';

describe('MyScriptJS: output/text/textDocument.js', function () {

    it('TextDocument object exist', function () {
        expect(MyScript.TextDocument).to.exist;
        expect(MyScript.TextDocument).not.to.be.null;
        expect(MyScript.TextDocument).to.not.be.undefined;
    });

});