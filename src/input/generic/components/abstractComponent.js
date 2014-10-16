(function (scope) {

    /**
     * Represent an abstract input component
     * @constructor
     */
    function AbstractComponent () {
    }

    /**
     *
     * @type {Object}
     */
    AbstractComponent.prototype.__proto__ = new Object();

    /**
     *
     * @type {string}
     */
    AbstractComponent.prototype.type = null;

    // Export
    scope.AbstractComponent = AbstractComponent;
})(MyScript);