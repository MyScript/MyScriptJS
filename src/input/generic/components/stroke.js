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
     * Get the list of x coordinates
     * @returns {Array}
     */
    Stroke.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set the list of x coordinates
     * @param {Array} x
     */
    Stroke.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Add a x to the list of x coordinates
     * @param {number} x
     */
    Stroke.prototype.addX = function (x) {
        this.x.push(x);
    };

    /**
     * Get the list of y coordinates
     * @returns {Array}
     */
    Stroke.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set the list of y coordinates
     * @param {Array} y
     */
    Stroke.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     * Add a y to the list of y coordinates
     * @param {number} y
     */
    Stroke.prototype.addY = function (y) {
        this.y.push(y);
    };

    /**
     * Get the number of points for this stroke
     * @returns {Number}
     */
    Stroke.prototype.getLength = function () {
        return this.x.length;
    };

    // Export
    scope.Stroke = Stroke;
})(MyScript);