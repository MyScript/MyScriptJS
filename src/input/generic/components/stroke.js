/**
 *
 * @param scope
 */
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
     * @type {AbstractComponent}
     */
    Stroke.prototype = Object.create(scope.AbstractComponent.prototype);

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

    /**
     *
     * @type {Stroke}
     */
    scope.Stroke = Stroke;
})(MyScript);