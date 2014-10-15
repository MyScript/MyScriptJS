/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function MusicRenderer () {
        this.clefs = {
            C: 'images/music/c_clef.svg',
            F: 'images/music/f_clef.svg',
            G: 'images/music/g_clef.svg'
        };
    }

    /**
     *
     * @type {TextRenderer}
     */
    MusicRenderer.prototype = Object.create(scope.TextRenderer.prototype);

    /**
     *
     * @param staff
     * @param parameters
     * @param context
     */
    MusicRenderer.prototype.staffDrawing = function (staff, parameters, context) {

        var staffHeight = staff.top + ((staff.count - 1) * staff.gap);
//            var staves = Math.floor(context.canvas.clientHeight / staff.height);
        var staves = 1;

        context.beginPath();

        // Drawing horizontal staff lines
        for (var i = 0; i < staves; i++) {
            var offset = staffHeight * i;
            for (var j = 0; j < staff.count; j++) {
                context.moveTo(0, (staff.top + offset) + j * staff.gap);
                context.lineTo(context.canvas.clientWidth, (staff.top + offset) + j * staff.gap);
            }
        }

        context.stroke();
    };

    /**
     *
     * @param components
     * @param parameters
     * @param context
     */
    MusicRenderer.prototype.componentsDrawing = function (components, parameters, context) {
        for (var i in components) {
            var component = components[i];
            if (component.type === 'clef') {
                this.clefDrawing(component, parameters, context);
            }
        }
    };

    /**
     *
     * @param clef
     * @param parameters
     * @param context
     */
    MusicRenderer.prototype.clefDrawing = function (clef, parameters, context) {

        var imageObj = new Image();
        imageObj.onload = function () {
            var ratio = clef.boundingBox.height / this.height;
            clef.boundingBox.width = this.width * ratio;
            context.drawImage(imageObj, clef.boundingBox.x, clef.boundingBox.y, clef.boundingBox.width, clef.boundingBox.height);
        };
        imageObj.src = this.clefs[clef.value.symbol];
    };

    /**
     *
     * @type {MusicRenderer}
     */
    scope.MusicRenderer = MusicRenderer;
})(MyScript);