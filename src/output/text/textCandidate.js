(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function TextCandidate (obj) {
        this.children = [];
        this.flags = [];
        if (obj) {
            this.label = obj.label;
            this.normalizedScore = obj.normalizedScore;
            this.spellingDistortionRatio = obj.spellingDistortionRatio;
            for (var i in obj.children) {
                this.children.push(new scope.TextCandidate(obj.children[i]));
            }
            for (var j in obj.flags) {
                this.flags.push(obj.flags[j]);
            }
        }
    }

    /**
     *
     * @returns {String}
     */
    TextCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     *
     * @returns {Number}
     */
    TextCandidate.prototype.getNormalizedScore = function () {
        return this.normalizedScore;
    };

    /**
     *
     * @returns {Number}
     */
    TextCandidate.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    /**
     *
     * @returns {Number}
     */
    TextCandidate.prototype.getSpellingDistortionRatio = function () {
        return this.spellingDistortionRatio;
    };

    /**
     *
     * @returns {Array}
     */
    TextCandidate.prototype.getChildren = function () {
        return this.children;
    };

    /**
     *
     * @returns {Array}
     */
    TextCandidate.prototype.getFlags = function () {
        return this.flags;
    };

    // Export
    scope.TextCandidate = TextCandidate;
})(MyScript);