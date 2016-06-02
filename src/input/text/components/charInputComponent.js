'use strict';

(function (scope) {
    /**
     * Char input component
     *
     * @class CharInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function CharInputComponent(obj) {
        scope.AbstractTextInputComponent.call(this, obj);
        this.type = 'char';
        if (obj) {
            if (obj.character) {
                this.character = obj.character;
            }
        }
    }

    /**
     * Inheritance property
     */
    CharInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    CharInputComponent.prototype.constructor = CharInputComponent;

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    CharInputComponent.prototype.getLabel = function () {
        return this.character;
    };

    /**
     * Set label
     *
     * @method setLabel
     * @param {String} label
     */
    CharInputComponent.prototype.setLabel = function (label) {
        this.character = label;
    };

    // Export
    scope.CharInputComponent = CharInputComponent;
})(MyScript);
