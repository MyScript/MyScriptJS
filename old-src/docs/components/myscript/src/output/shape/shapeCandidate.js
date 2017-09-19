'use strict';

(function (scope) {
    /**
     * Shape candidate
     *
     * @class ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeCandidate(obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    ShapeCandidate.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is erased
     *
     * @method isErased
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isErased = function () {
        return this.type === 'erased';
    };

    /**
     * Is scratch-out
     *
     * @method isScratchOut
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isScratchOut = function () {
        return this.type === 'scratchOut';
    };

    /**
     * Is not recognized
     *
     * @method isNotRecognized
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isNotRecognized = function () {
        return this.type === 'notRecognized';
    };

    /**
     * Is recognized
     *
     * @method isRecognized
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isRecognized = function () {
        return this.type === 'recognizedShape';
    };

    // Export
    scope.ShapeCandidate = ShapeCandidate;
})(MyScript);