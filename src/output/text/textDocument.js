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
        this.wordSegments = [];
        this.charSegments = [];
        if (obj) {
            if (obj.textSegmentResult) {
                this.textSegmentResult = new scope.TextSegment(obj.textSegmentResult);
            }
            for (var i in obj.tagItems) {
                this.tagItems.push(new scope.TextTagItem(obj.tagItems[i]));
            }
            for (var j in obj.wordSegments) {
                this.wordSegments.push(new scope.TextSegment(obj.wordSegments[j]));
            }
            for (var k in obj.charSegments) {
                this.charSegments.push(new scope.TextSegment(obj.charSegments[k]));
            }
            /**
             * @deprecated
             */
            for (var l in obj.wordCandidates) {
                this.wordSegments.push(new scope.TextSegment(obj.wordCandidates[l]));
            }
            /**
             * @deprecated
             */
            for (var m in obj.charCandidates) {
                this.charSegments.push(new scope.TextSegment(obj.charCandidates[m]));
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
        return this.wordSegments;
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
        return this.charSegments;
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
