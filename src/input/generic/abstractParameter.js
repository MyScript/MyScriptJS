(function (scope) {

    /**
     * Abstract parameters used for recognition
     * @constructor
     */
    function AbstractParameter () {
        this.switchToChildren = true;
    }

    /**
     *
     */
    AbstractParameter.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    // Export
    scope.AbstractParameter = AbstractParameter;
})(MyScript);