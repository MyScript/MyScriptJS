(function (scope) {

    /**
     *
     * @constructor
     */
    function TextRecognizer (url) {
        scope.AbstractRecognizer.call(this, url);
        this.socket = new WebSocket(url + '/hwr');
    }

    /**
     *
     * @type {AbstractRecognizer}
     */
    TextRecognizer.prototype.__proto__ = new scope.AbstractRecognizer();

    TextRecognizer.prototype.setOpenCallback = function (callback) {
        this.socket.onopen = callback;
    };

    TextRecognizer.prototype.setCloseCallback = function (callback) {
        this.socket.onclose = callback;
    };

    TextRecognizer.prototype.setErrorCallback = function (callback) {
        this.socket.onerror = callback;
    };

    TextRecognizer.prototype.setDataCallback = function (callback) {
        this.socket.onmessage = callback;
    };

    /**
     * Initialize the websocket
     * @param {string} applicationKey
     */
    TextRecognizer.prototype.initWSRecognition = function (applicationKey) {
        var initMessage = {
            type: 'applicationKey',
            applicationKey: applicationKey
        };
        this.socket.send(JSON.stringify(initMessage));
    };

    /**
     * Start the websocket session
     * @param {TextParameter} parameters
     * @param {Array} inputUnits
     */
    TextRecognizer.prototype.startWSRecognition = function (parameters, inputUnits) {

        var input = this.inputCorrector.getTextWSInput(parameters, inputUnits);
        input.type = 'start';
        input.doReco = true;

        this.socket.send(JSON.stringify(input));
    };

    TextRecognizer.prototype.continueWSRecognition = function (inputUnits) {

        var continueMessage = {
            type: 'continue',
            doReco: 'true',
            appendToPreviousInputUnit: true,
            inputUnits: inputUnits
        };

        this.socket.send(JSON.stringify(continueMessage));
    };

    TextRecognizer.prototype.resetWSRecognition = function () {
        var resetMessage = {
            type: 'reset'
        };

        this.socket.send(JSON.stringify(resetMessage));
    };

    /**
     * @callback TextRecognizer~dataCallback
     * @callback TextRecognizer~errorCallback
     * @callback TextRecognizer~closeCallback
     * @callback TextRecognizer~openCallback
     */

        // Export
    scope.TextRecognizer = TextRecognizer;
})(MyScript);