(function (scope) {

    /**
     * Represent an abstract input component
     * @constructor
     */
    function AbstractComponent () {
    }

    /**
     *
     * @returns {string}
     */
    AbstractComponent.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @param {string} type
     */
    AbstractComponent.prototype.setType = function (type) {
        this.type = type;
    };

    // Export
    scope.AbstractComponent = AbstractComponent;
})(MyScript);