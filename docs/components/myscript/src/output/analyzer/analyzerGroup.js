'use strict';

(function (scope) {
    /**
     * Analyzer group
     *
     * @class AnalyzerGroup
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerGroup(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.elementReferences = [];
        if (obj) {
            this.type = obj.type;
            this.uniqueID = obj.uniqueID;
            for (var i in obj.elementReferences) {
                this.elementReferences.push(new scope.AnalyzerElementReference(obj.elementReferences[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerGroup.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerGroup.prototype.constructor = AnalyzerGroup;

    /**
     * Get element references
     *
     * @method getElementReferences
     * @returns {AnalyzerElementReference[]}
     */
    AnalyzerGroup.prototype.getElementReferences = function () {
        return this.elementReferences;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerGroup.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get unique Id
     *
     * @method getUniqueId
     * @returns {String}
     */
    AnalyzerGroup.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    // Export
    scope.AnalyzerGroup = AnalyzerGroup;
})(MyScript);