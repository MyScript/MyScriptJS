(function (scope) {

    /**
     * Represent an abstract input component
     * @constructor
     */
    function AbstractComponent () {
    }

    /**
     *
     * @type {string}
     */
    AbstractComponent.prototype.type = null;

    // Export
    scope.AbstractComponent = AbstractComponent;
})(MyScript);