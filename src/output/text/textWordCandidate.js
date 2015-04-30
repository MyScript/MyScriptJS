'use strict';

(function (scope) {
    /**
     * Text segment
     *
     * @class TextWordCandidate
     * @extends TextCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function TextWordCandidate(obj) {
        scope.TextCandidate.call(this, obj);
        this.children = [];
        if (obj) {
            for (var i in obj.children) {
                this.children.push(new scope.TextCharSegment(obj.children[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    TextWordCandidate.prototype = new scope.TextCandidate();

    /**
     * Constructor property
     */
    TextWordCandidate.prototype.constructor = TextWordCandidate;

    /**
     * Get children
     *
     * @method getChildren
     * @returns {TextCharSegment[]}
     */
    TextWordCandidate.prototype.getChildren = function () {
        return this.children;
    };

    // Export
    scope.TextWordCandidate = TextWordCandidate;
})(MyScript);