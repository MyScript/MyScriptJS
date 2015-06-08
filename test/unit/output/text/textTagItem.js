'use strict';

describe('TextTagItem: output/text/textTagItem.js', function () {

    describe('Default construction', function () {

        var textTagItem;
        before(function (done) {
            textTagItem = new MyScript.TextTagItem();
            done();
        });

        it('Check initial state', function () {
            expect(textTagItem).to.be.an('object');
            expect(textTagItem).to.be.an.instanceof(MyScript.TextTagItem);
            expect(textTagItem).to.have.ownProperty('inkRanges');
        });

        it('Get tag type', function () {
            expect(textTagItem.getTagType()).to.be.undefined;
        });

        it('Get ink ranges', function () {
            expect(textTagItem.getInkRanges()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var textTagItem;
        before(function (done) {
            textTagItem = new MyScript.TextTagItem({
                tagType: 'test',
                inkRanges: '0-1-2:3-4-5'
            });
            done();
        });

        it('Check initial state', function () {
            expect(textTagItem).to.be.an('object');
            expect(textTagItem).to.be.an.instanceof(MyScript.TextTagItem);
            expect(textTagItem).to.have.ownProperty('inkRanges');
        });

        it('Get tag type', function () {
            expect(textTagItem.getTagType()).to.equal('test');
        });

        it('Get ink ranges', function () {
            expect(textTagItem.getInkRanges()).to.not.be.empty;
        });

    });

});