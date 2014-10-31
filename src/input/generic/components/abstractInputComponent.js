(function (scope) {

    /**
     * Represent an abstract input component
     * @constructor
     */
    function AbstractComponent () {
    }

    /**
     * Get the type of the input component
     * @returns {String}
     */
    AbstractComponent.prototype.getType = function () {
        return this.type;
    };

    /**
     * Set the type of the input component
     * @param {String} type
     */
    AbstractComponent.prototype.setType = function (type) {
        this.type = type;
    };

    // Export
    scope.AbstractComponent = AbstractComponent;
})(MyScript);