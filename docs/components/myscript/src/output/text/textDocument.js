'use strict';

(function (scope) {
    /**
     * Text document
     *
     * @class TextDocument
     * @param {Object} [obj]
     * @constructor
     */
    function TextDocument(obj) {
        this.tagItems = [];
        this.wordCandidates = [];
        this.charCandidates = [];
        if (obj) {
            if (obj.textSegmentResult) {
                this.textSegmentResult = new scope.TextSegment(obj.textSegmentResult);
            }
            for (var i in obj.tagItems) {
                this.tagItems.push(new scope.TextTagItem(obj.tagItems[i]));
            }
            for (var j in obj.wordCandidates) {
                this.wordCandidates.push(new scope.TextSegment(obj.wordCandidates[j]));
            }
            for (var k in obj.charCandidates) {
                this.charCandidates.push(new scope.TextSegment(obj.charCandidates[k]));
            }
        }
    }

    /**
     * Get tag items
     *
     * @method getTagItems
     * @returns {TextTagItem[]}
     */
    TextDocument.prototype.getTagItems = function () {
        return this.tagItems;
    };

    /**
     * Get word segments
     *
     * @method getWordSegments
     * @returns {TextSegment[]}
     */
    TextDocument.prototype.getWordSegments = function () {
        return this.wordCandidates;
    };

    /**
     * Get word segment
     *
     * @method getWordSegment
     * @param {TextInkRange[]} inkRanges
     * @returns {TextSegment}
     */
    TextDocument.prototype.getWordSegment = function (inkRanges) {
        for (var i = 0; i < this.getWordSegments().length; i++) {
            if (JSON.stringify(this.getWordSegments()[i].getInkRanges()) === JSON.stringify(inkRanges)) {
                return this.getWordSegments()[i];
            }
        }
        return undefined;
    };

    /**
     * Get char segments
     *
     * @method getCharSegments
     * @returns {TextSegment[]}
     */
    TextDocument.prototype.getCharSegments = function () {
        return this.charCandidates;
    };

    /**
     * Get char segment
     *
     * @method getCharSegment
     * @param {TextInkRange[]} inkRanges
     * @returns {TextSegment}
     */
    TextDocument.prototype.getCharSegment = function (inkRanges) {
        for (var i = 0; i < this.getCharSegments().length; i++) {
            if (JSON.stringify(this.getCharSegments()[i].getInkRanges()) === JSON.stringify(inkRanges)) {
                return this.getCharSegments()[i];
            }
        }
        return undefined;
    };

    /**
     * Get text segment
     *
     * @method getTextSegment
     * @returns {TextSegment}
     */
    TextDocument.prototype.getTextSegment = function () {
        return this.textSegmentResult;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    TextDocument.prototype.hasScratchOutResults = function () {
        return false;
    };

    // Export
    scope.TextDocument = TextDocument;
})(MyScript);