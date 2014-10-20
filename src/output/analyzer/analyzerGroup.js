(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerGroup (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.elementReferences = [];
        this.type = null;
        this.uniqueID = null;
        if (obj) {
            this.type = obj.type;
            this.uniqueID = obj.uniqueID;
            for (var i in obj.elementReferences) {
                this.elementReferences.push(new scope.AnalyzerElementReference(obj.elementReferences[i]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerGroup.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerGroup}
     */
    AnalyzerGroup.prototype.constructor = AnalyzerGroup;

    /**
     * @returns {Array}
     */
    AnalyzerGroup.prototype.getElementReferences = function () {
        return this.elementReferences;
    };

    /**
     * @returns {string}
     */
    AnalyzerGroup.prototype.getType = function () {
        return this.type;
    };

    /**
     * @returns {string}
     */
    AnalyzerGroup.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    // Export
    scope.AnalyzerGroup = AnalyzerGroup;
})(MyScript);