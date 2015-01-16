'use strict';

describe('MyScriptJS: output/text/textTagItem.js', function () {

    var expect = require('chai').expect;

    it('TextTagItem object exist', function () {
        expect(MyScript.TextTagItem).to.exist;
        expect(MyScript.TextTagItem).not.to.be.null;
        expect(MyScript.TextTagItem).to.not.be.undefined;
    });

    it('TextTagItem constructor', function () {
        var textTagItem = new MyScript.TextTagItem();
        expect(textTagItem).to.be.an('object');
        expect(textTagItem).to.be.an.instanceof(MyScript.TextTagItem);
    });

    it('TextTagItem Tag Type getter', function () {
        var textTagItem = new MyScript.TextTagItem();
        expect(textTagItem.getTagType()).to.be.undefined;
    });

    it('TextTagItem Ink Ranges getter', function () {
        var textTagItem = new MyScript.TextTagItem();
        expect(textTagItem.getInkRanges()).to.be.undefined;
    });
});