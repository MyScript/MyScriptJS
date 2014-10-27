(function (scope) {

    /**
     * Character input component alternate
     * @constructor
     */
    function CharacterInputComponentAlternate (alternate, probability) {
        this.alternate = alternate;
        this.probability = probability;
    }

    /**
     *
     * @returns {string}
     */
    CharacterInputComponentAlternate.prototype.getAlternate = function () {
        return this.alternate;
    };

    /**
     *
     * @param {string} alternate
     */
    CharacterInputComponentAlternate.prototype.setAlternate = function (alternate) {
        this.alternate = alternate;
    };

    /**
     *
     * @returns {number}
     */
    CharacterInputComponentAlternate.prototype.getProbability = function () {
        return this.probability;
    };

    /**
     *
     * @param {number} probability
     */
    CharacterInputComponentAlternate.prototype.setProbability = function (probability) {
        this.probability = probability;
    };

    // Export
    scope.CharacterInputComponentAlternate = CharacterInputComponentAlternate;
})(MyScript);