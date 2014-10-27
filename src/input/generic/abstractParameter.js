(function (scope) {

    /**
     * Abstract parameters used for recognition
     * @constructor
     */
    function AbstractParameter () {
        this.switchToChildren = true;
    }

    /**
     * @returns {boolean}
     */
    AbstractParameter.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     * @param {boolean} switchToChildren
     */
    AbstractParameter.prototype.setSwitchToChildren = function (switchToChildren) {
        this.switchToChildren = switchToChildren;
    };

    // Export
    scope.AbstractParameter = AbstractParameter;
})(MyScript);