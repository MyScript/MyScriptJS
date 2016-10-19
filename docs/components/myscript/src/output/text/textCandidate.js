'use strict';

(function (scope) {
    /**
     * Text candidate
     *
     * @class TextCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function TextCandidate(obj) {
        this.flags = [];
        this.children = [];
        if (obj) {
            this.label = obj.label;
            this.normalizedScore = obj.normalizedScore;
            this.spellingDistortionRatio = obj.spellingDistortionRatio;
            for (var i in obj.flags) {
                this.flags.push(obj.flags[i]);
            }
            for (var j in obj.children) {
                this.children.push(new scope.TextSegment(obj.children[j]));
            }
        }
    }

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    TextCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get normalized score
     *
     * @method getNormalizedScore
     * @returns {Number}
     */
    TextCandidate.prototype.getNormalizedScore = function () {
        return this.normalizedScore;
    };

    /**
     * Get resemblance score
     *
     * @method getResemblanceScore
     * @returns {Number}
     */
    TextCandidate.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    /**
     * Get spelling distortion ratio
     *
     * @method getSpellingDistortionRatio
     * @returns {Number}
     */
    TextCandidate.prototype.getSpellingDistortionRatio = function () {
        return this.spellingDistortionRatio;
    };

    /**
     * Get flags
     *
     * @method getFlags
     * @returns {Array}
     */
    TextCandidate.prototype.getFlags = function () {
        return this.flags;
    };

    /**
     * Get children
     *
     * @method getChildren
     * @returns {TextSegment[]}
     */
    TextCandidate.prototype.getChildren = function () {
        return this.children;
    };

    // Export
    scope.TextCandidate = TextCandidate;
})(MyScript);