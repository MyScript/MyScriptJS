(function (scope) {

    function MathComputedData (obj) {
        if (obj) {
            this.name = obj.name;
            this.label = obj.label;
            this.inkRanges = obj.inkRanges;
            this.strokes = obj.strokes;
            this.inkBoundingBox = obj.inkBoundingBox;
            this.globalInkBoundingBox =  obj.globalInkBoundingBox;
            this.computedFontBoundingBox = obj.computedFontBoundingBox;
            this.color = obj.color;
        }
    }

    MathComputedData.prototype.getName = function (){
        return this.name;
    };

    MathComputedData.prototype.getLabel = function (){
        return this.label;
    };

    MathComputedData.prototype.getInkRanges = function (){
        return this.inkRanges;
    };

    MathComputedData.prototype.getStrokes = function (){
        return this.strokes;
    };

    MathComputedData.prototype.getInkBoundingBox = function (){
        return this.inkBoundingBox;
    };

    MathComputedData.prototype.getGlobalInkBoundingBox = function (){
        return this.globalInkBoundingBox;
    };

    MathComputedData.prototype.getComputedFontBoundingBox = function (){
        return this.computedFontBoundingBox;
    };

    MathComputedData.prototype.getColor = function (){
        return this.color;
    };

    // Export
    scope.MathComputedData = MathComputedData;
})(MyScript);