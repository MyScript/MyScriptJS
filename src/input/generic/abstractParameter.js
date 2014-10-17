(function (scope) {

    /**
     * Abstract parameters used for recognition
     * @constructor
     */
    function AbstractParameter () {
    }

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

    // Export
    scope.AbstractParameter = AbstractParameter;
})(MyScript);