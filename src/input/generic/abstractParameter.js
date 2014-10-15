/**
 *
 * @param scope
 */
(function (scope) {

    /**
     * Abstract parameters used for recognition
     * @constructor
     */
    function AbstractParameter () {
    }

    /**
     *
     * @type {Object}
     */
    AbstractParameter.prototype = Object.create(Object.prototype);

    /**
     *
     * @type {boolean}
     */
    AbstractParameter.prototype.switchToChildren = true;

    /**
     *
     */
    AbstractParameter.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     *
     * @type {AbstractParameter}
     */
    scope.AbstractParameter = AbstractParameter;
})(MyScript);