(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathDocument (obj) {
        this.results = [];
        if (obj) {
            for (var i in obj.results) {
                switch (obj.results[i].type) {
                    case 'SYMBOLTREE':
                        this.results.push(new scope.MathResultTreeElement(obj.results[i]));
                        break;
                    default:
                        this.results.push(new scope.MathResultElement(obj.results[i]));
                        break;
                }
            }
        }
    }

    /**
     *
     * @returns {Array}
     */
    MathDocument.prototype.getResultElements = function () {
        return this.results;
    };

    // Export
    scope.MathDocument = MathDocument;
})(MyScript);