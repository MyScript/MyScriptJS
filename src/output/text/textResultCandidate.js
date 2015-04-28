'use strict';

(function (scope) {
    /**
     * Text segment
     *
     * @class TextResultCandidate
     * @extends TextCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function TextResultCandidate (obj) {
        scope.TextCandidate.call(this, obj);
        this.children = [];
        if (obj) {
            for (var i in obj.children) {
                this.children.push(new scope.TextWordSegment(obj.children[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    TextResultCandidate.prototype = new scope.TextCandidate();

    /**
     * Constructor property
     */
    TextResultCandidate.prototype.constructor = TextResultCandidate;

    /**
     * Get children
     *
     * @method getChildren
     * @returns {TextWordSegment[]}
     */
    TextResultCandidate.prototype.getChildren = function () {
        return this.children;
    };

    // Export
    scope.TextResultCandidate = TextResultCandidate;
})(MyScript);