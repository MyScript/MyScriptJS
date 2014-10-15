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
     * @type {Object}
     */
    AbstractComponent.prototype = Object.create(Object.prototype);

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