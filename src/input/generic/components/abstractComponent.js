/**
 *
 * @param scope
 */
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

    /**
     *
     * @type {AbstractComponent}
     */
    scope.AbstractComponent = AbstractComponent;
})(MyScript);