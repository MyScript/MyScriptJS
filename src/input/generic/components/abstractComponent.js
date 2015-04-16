'use strict';

(function (scope) {
    /**
     * Represent an abstract input component
     *
     * @class AbstractComponent
     * @constructor
     */
    function AbstractComponent() {
    }

    /**
     * Get the type of the input component
     *
     * @method getType
     * @returns {String}
     */
    AbstractComponent.prototype.getType = function () {
        return this.type;
    };

    /**
     * Set the type of the input component
     *
     * @method setType
     * @param {String} type
     */
    AbstractComponent.prototype.setType = function (type) {
        if (typeof type !== 'string') {
            throw new Error('Invalid param type');
        }
        this.type = type;
    };

    // Export
    scope.AbstractComponent = AbstractComponent;
})(MyScript);