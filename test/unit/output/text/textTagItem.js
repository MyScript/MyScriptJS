'use strict';

describe('TextTagItem: output/text/textTagItem.js', function () {

    describe('Default construction', function () {

        var textTagItem;
        before(function (done) {
            textTagItem = new MyScript.TextTagItem();
            done();
        });

        it('check initial state', function () {
            expect(textTagItem).to.be.an('object');
            expect(textTagItem).to.be.an.instanceof(MyScript.TextTagItem);
            expect(textTagItem).to.have.ownProperty('inkRanges');
        });

        it('Tag Type getter', function () {
            expect(textTagItem.getTagType()).to.be.undefined;
        });

        it('Ink Ranges getter', function () {
            expect(textTagItem.getInkRanges()).to.be.empty;
        });

    });

});