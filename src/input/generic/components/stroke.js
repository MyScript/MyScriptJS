(function (scope) {

    /**
     * Represent a simple stroke input component
     * @constructor
     */
    function Stroke () {
        this.type = 'stroke';
        this.x = [];
        this.y = [];
    }

    /**
     *
     * @type {MyScript.AbstractComponent}
     */
    Stroke.prototype = new scope.AbstractComponent();

    /**
     *
     * @type {Stroke}
     */
    Stroke.prototype.constructor = Stroke;

    /**
     *
     * @returns {Array}
     */
    Stroke.prototype.getX = function () {
        return this.x;
    };

    /**
     *
     * @param {Array} x
     */
    Stroke.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     *
     * @param {number} x
     */
    Stroke.prototype.addX = function (x) {
        this.x.push(x);
    };

    /**
     *
     * @returns {Array}
     */
    Stroke.prototype.getY = function () {
        return this.y;
    };

    /**
     *
     * @param {Array} y
     */
    Stroke.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     *
     * @param {number} y
     */
    Stroke.prototype.addY = function (y) {
        this.y.push(y);
    };

    /**
     *
     * @returns {Number}
     */
    Stroke.prototype.getLength = function () {
        return this.x.length;
    };

    // Export
    scope.Stroke = Stroke;
})(MyScript);