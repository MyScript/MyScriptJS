(function (scope) {

    /**
     * Character input component alternate
     *
     * @class CharacterInputComponentAlternate
     * @constructor
     */
    function CharacterInputComponentAlternate (alternate, probability) {
        this.alternate = alternate;
        this.probability = probability;
    }

    /**
     * Get alternate
     *
     * @method getAlternate
     * @returns {String}
     */
    CharacterInputComponentAlternate.prototype.getAlternate = function () {
        return this.alternate;
    };

    /**
     * Set alternate
     *
     * @method setAlternate
     * @param {String} alternate
     */
    CharacterInputComponentAlternate.prototype.setAlternate = function (alternate) {
        this.alternate = alternate;
    };

    /**
     * Get probability
     *
     * @method getProbability
     * @returns {Number}
     */
    CharacterInputComponentAlternate.prototype.getProbability = function () {
        return this.probability;
    };

    /**
     * Set probability
     *
     * @method setProbability
     * @param {Number} probability
     */
    CharacterInputComponentAlternate.prototype.setProbability = function (probability) {
        this.probability = probability;
    };

    // Export
    scope.CharacterInputComponentAlternate = CharacterInputComponentAlternate;
})(MyScript);