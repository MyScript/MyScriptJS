'use strict';

(function (scope) {

    function InkPaper(element, option) {
        this.renderer = this.configureRenderer(option.type);
        this.recognizer = this.configureRecognizer(option.type);
        this.inkManager = new scope.InkManager();
        this.applicationKey = option.applicationKey;
        this.hmacKey = option.hmacKey;
        this.instanceId = undefined;

        var canvas = document.createElement('canvas');
        canvas.id = 'current';
        canvas.style.width = element.style.width;
        canvas.style.height = element.style.height;
        canvas.style.zIndex = '2';
        canvas.style.position = 'absolute';
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
        canvas.onmousedown = this.onMouseDown.bind(this);
        canvas.onmouseup = this.onMouseUp.bind(this);
        canvas.onmousemove = this.onMouseMove.bind(this);
        canvas.onmouseleave = this.onMouseLeave.bind(this);
        canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
        element.appendChild(canvas);

        canvas = document.createElement('canvas');
        canvas.id = 'final';
        canvas.style.width = element.style.width;
        canvas.style.height = element.style.height;
        canvas.style.zIndex = '1';
        canvas.style.position = 'absolute';
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
        element.appendChild(canvas);

        this.renderer.clearCurrentStroke(this.getCurrentStrokeContext());
        this.renderer.clearFinalStrokes(this.getFinalStrokesContext());
    }

    InkPaper.prototype.configureRenderer = function (type){
        var renderer;
        switch (type) {
            case 'Text':
                renderer = new scope.TextRenderer();
                break;
            case 'Math':
                renderer = new scope.MathRenderer();
                break;
            case 'Shape':
                renderer = new scope.ShapeRenderer();
                break;
            case 'Analyzer':
                renderer = new scope.AnalyzerRenderer();
                break;
            case 'Music':
                renderer = new scope.MusicRenderer();
                break;
            default:
                renderer = new scope.AbstractRenderer();
                break;
        }
        return renderer;
    };

    InkPaper.prototype.configureRecognizer = function (type){
        var recognizer;
        switch (type) {
            case 'Text':
                recognizer = new scope.TextRecognizer();
                break;
            case 'Math':
                recognizer = new scope.MathRecognizer();
                break;
            case 'Shape':
                recognizer = new scope.ShapeRecognizer();
                break;
            case 'Analyzer':
                recognizer = new scope.AnalyzerRecognizer();
                break;
            case 'Music':
                recognizer = new scope.MusicRecognizer();
                break;
            default:
                recognizer = new scope.AbstractRecognizer();
                break;
        }
        return recognizer;
    };

    InkPaper.event = {
        'addDomListener' : function(element, useCapture, myfunction){
            element.addEventListener(useCapture, myfunction);
        }
    };

    InkPaper.prototype.onMouseDown = function(e) {
        var rect = document.getElementById('current').getBoundingClientRect();
        var x = e.pageX - rect.left - window.pageXOffset;
        var y = e.pageY - rect.top - window.pageYOffset;
        var t = e.timeStamp;

        this.inkManager.startInkCapture(x, y, t);
        this.renderer.drawStart(x, y, t, this.getCurrentStrokeContext());
    };

    InkPaper.prototype.onMouseMove = function(e) {
        var rect = document.getElementById('current').getBoundingClientRect();
        var x = e.pageX - rect.left - window.pageXOffset;
        var y = e.pageY - rect.top - window.pageYOffset;
        var t = e.timeStamp;

        this.inkManager.continueInkCapture(x, y, t);
        this.renderer.drawContinue(x, y, t, this.getCurrentStrokeContext());
    };

    InkPaper.prototype.onMouseUp = function(e) {
        var rect = document.getElementById('current').getBoundingClientRect();
        var x = e.pageX - rect.left - window.pageXOffset;
        var y = e.pageY - rect.top - window.pageYOffset;
        var t = e.timeStamp;

        this.inkManager.endInkCapture(x, y, t);
        this.renderer.drawEnd(x, y, t, this.getCurrentStrokeContext(), this.getFinalStrokesContext());
        doRecognition();
    };

    InkPaper.prototype.onMouseLeave = function(e) {
        var rect = document.getElementById('current').getBoundingClientRect();
        var x = e.pageX - rect.left - window.pageXOffset;
        var y = e.pageY - rect.top - window.pageYOffset;
        var t = e.timeStamp;

        this.inkManager.endInkCapture(x, y, t);
        this.renderer.drawEnd(x, y, t, this.getCurrentStrokeContext(), this.getFinalStrokesContext());
        doRecognition();
    };

    InkPaper.prototype.getContext = function (canvasid) {
        return document.getElementById(canvasid).getContext('2d');
    };

    InkPaper.prototype.getCurrentStrokeContext = function () {
        return this.getContext('current');
    };

    InkPaper.prototype.getFinalStrokesContext = function () {
        return this.getContext('final');
    };

    function doRecognition() {
        //if (this.inkManager.isEmpty()) {
        //    result.innerHTML = '';
        //} else {
        //
        //    var inputUnit = new scope.TextInputUnit();
        //    inputUnit.setComponents(this.inkManager.getStrokes());
        //
        //    var units = [inputUnit];
        //
        //    this.recognizer.doSimpleRecognition(this.applicationKey, this.instanceId, units, this.hmacKey).then(
        //            function (data) {
        //                if (!this.instanceId) {
        //                    this.instanceId = data.getInstanceId();
        //                } else if (this.instanceId !== data.getInstanceId()) {
        //                    return;
        //                }
        //
        //                result.innerHTML = data.getTextDocument().getTextSegment().getSelectedCandidate().getLabel();
        //            }
        //    );
        //}
    }

    // Export
    scope.InkPaper = InkPaper;
})(MyScript);