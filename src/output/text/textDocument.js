'use strict';

(function (scope) {
    /**
     * Text document
     *
     * @class TextDocument
     * @param {Object} [obj]
     * @constructor
     */
    function TextDocument (obj) {
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
     * Get word candidates
     *
     * @method getWordCandidates
     * @returns {TextSegment[]}
     */
    TextDocument.prototype.getWordCandidates = function () {
        return this.wordCandidates;
    };

    /**
     * Get word candidate
     *
     * @method getWordCandidate
     * @param {TextInkRange} inkRanges
     * @param {Number} selectedCandidateIdx
     * @returns {TextCandidate}
     */
    TextDocument.prototype.getWordCandidate = function (inkRanges, selectedCandidateIdx) {
        for (var i = 0; i < this.getWordCandidates().length; i++) {
            if (this.getWordCandidates()[i].getInkRanges() === inkRanges) {
                return this.getWordCandidates()[i].getCandidates()[selectedCandidateIdx];
            }
        }
        return undefined;
    };

    /**
     * Get char candidates
     *
     * @method getCharCandidates
     * @returns {TextSegment[]}
     */
    TextDocument.prototype.getCharCandidates = function () {
        return this.charCandidates;
    };

    /**
     * Get char candidate
     *
     * @method getCharCandidate
     * @param {TextInkRange[]} inkRanges
     * @param {Number} selectedCandidateIdx
     * @returns {TextCandidate}
     */
    TextDocument.prototype.getCharCandidate = function (inkRanges, selectedCandidateIdx) {
        for (var i = 0; i < this.getCharCandidates().length; i++) {
            if (this.getCharCandidates()[i].getInkRanges() === inkRanges) {
                return this.getCharCandidates()[i].getCandidates()[selectedCandidateIdx];
            }
        }
        return undefined;
    };

    /**
     * Get text segment result
     *
     * @method getTextSegmentResult
     * @returns {TextSegment}
     */
    TextDocument.prototype.getTextSegmentResult = function () {
        return this.textSegmentResult;
    };

    // Export
    scope.TextDocument = TextDocument;
})(MyScript);