(function (scope) {

    /**
     * Math websocket recognizer interface
     *
     * @class MathWSRecognizer
     * @extends AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function MathWSRecognizer(url) {
        scope.AbstractRecognizer.call(this, url);
        this.socket = new WebSocket(url + '/math');
    }

    /**
     * Inheritance property
     */
    MathWSRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    MathWSRecognizer.prototype.constructor = MathWSRecognizer;

    /**
     * Set websocket open callback
     *
     * @method setOpenCallback
     * @param callback
     */
    MathWSRecognizer.prototype.setOpenCallback = function (callback) {
        this.socket.onopen = callback;
    };

    /**
     * Set websocket close callback
     *
     * @method setCloseCallback
     * @param callback
     */
    MathWSRecognizer.prototype.setCloseCallback = function (callback) {
        this.socket.onclose = callback;
    };

    /**
     * Set websocket error callback
     *
     * @method setErrorCallback
     * @param callback
     */
    MathWSRecognizer.prototype.setErrorCallback = function (callback) {
        this.socket.onerror = callback;
    };

    /**
     * Set websocket data callback
     *
     * @method setDataCallback
     * @param callback
     */
    MathWSRecognizer.prototype.setDataCallback = function (callback) {
        this.socket.onmessage = callback;
    };

    /**
     * Initialize the websocket
     *
     * @method initWSRecognition
     * @param {String} applicationKey
     */
    MathWSRecognizer.prototype.initWSRecognition = function (applicationKey) {
        if (!this.socket) {
            return;
        }

        var initMessage = {
            type: 'applicationKey',
            applicationKey: applicationKey
        };
        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(initMessage)));
        return deferred.promise;
    };

    /**
     * Start the websocket session
     *
     * @method startWSRecognition
     * @param {MathParameter} parameters
     * @param {MathInputUnit[]} components
     */
    MathWSRecognizer.prototype.startWSRecognition = function (parameters, components) {
        if (!this.socket) {
            return;
        }
        var data = {
            type: 'start',
            components: components,
            parameters: parameters
        }
        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(data)));
        return deferred.promise;
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {MathInputUnit[]} components
     */
    MathWSRecognizer.prototype.continueWSRecognition = function (parameters, components, instanceId) {
        if (!this.socket) {
            return;
        }

        var continueMessage = {
            type: 'continue',
            components: components,
            resultTypes: parameters.getResultTypes(),
            instanceId: instanceId
        };
        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(continueMessage)));
        return deferred.promise;
    };

    /**
     * Reset the websocket recognition session
     *
     * @method resetWSRecognition
     */
    MathWSRecognizer.prototype.resetWSRecognition = function () {
        if (!this.socket) {
            return;
        }

        var resetMessage = {
            type: 'reset'
        };
        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(resetMessage)));
        return deferred.promise;
    };

    /**
     * Delete the websocket instance
     *
     * @method stopWSRecognition
     */
    MathWSRecognizer.prototype.stopWSRecognition = function () {
        this.socket = undefined;
    };

    /**
     * Check if the socket is closed
     *
     * @method isClosed
     * @returns {Boolean}
     */
    MathWSRecognizer.prototype.isClosed = function () {
        return (!this.socket) ? true : false;
    };

    /**
     * Create a new socket
     *
     * @method restartWSRecognition
     */
    MathWSRecognizer.prototype.restartWSRecognition = function () {
        var deferred = Q.defer();
        deferred.resolve(this.socket = new WebSocket(this.url + '/math'));
        return deferred.promise;
    };

    /**
     * @callback MathWSRecognizer~dataCallback
     * @callback MathWSRecognizer~errorCallback
     * @callback MathWSRecognizer~closeCallback
     * @callback MathWSRecognizer~openCallback
     */

        // Export
    scope.MathWSRecognizer = MathWSRecognizer;
})(MyScript);