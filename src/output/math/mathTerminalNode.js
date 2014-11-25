(function (scope) {

    /**
     * Math terminal node
     *
     * @class MathTerminalNode
     * @extends MathNode
     * @param {Object} obj
     * @constructor
     */
    function MathTerminalNode (obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        this.inkRanges = [];
        if (obj) {
            this.selectedCandidate = obj.selectedCandidate;
            for (var i in obj.candidates) {
                this.candidates.push(new scope.MathTerminalNodeCandidate(obj.candidates[i]));
            }
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.MathInkRange(obj.inkRanges[j]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MathTerminalNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathTerminalNode.prototype.constructor = MathTerminalNode;

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MathTerminalNodeCandidate[]}
     */
    MathTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathTerminalNode.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MathNode}
     */
    MathTerminalNode.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidate];
    };

    /**
     * Get ink bounding box
     *
     * @method getInkBoundingBox
     * @param {AbstractComponent[]} [components] Input components
     * @returns {Rectangle}
     */
    MathTerminalNode.prototype.getInkBoundingBox = function (components) {
        if (!this.inkBoundingBox && components) {
            var boxes = [];
            for (var i in this.getInkRanges()) {
                var component = components[this.getInkRanges()[i].getComponent()];
                if (component instanceof scope.Stroke) {
                    boxes.push(component.getBoundingBox()); //Compute bounding box of recognized strokes
                }
            }
            this.inkBoundingBox = scope.MathUtils.getBoundingRect(boxes);
        }
        return this.inkBoundingBox;
    };

    // Export
    scope.MathTerminalNode = MathTerminalNode;
})(MyScript);