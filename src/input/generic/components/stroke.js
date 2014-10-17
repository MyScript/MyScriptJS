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
     * @type {Array}
     */
    Stroke.prototype.x = null;

    /**
     *
     * @type {Array}
     */
    Stroke.prototype.y = null;

    /**
     *
     * @param x
     */
    Stroke.prototype.addX = function (x) {
        this.x.push(x);
    };

    /**
     *
     * @param y
     */
    Stroke.prototype.addY = function (y) {
        this.y.push(y);
    };

    // Export
    scope.Stroke = Stroke;
})(MyScript);