/**
 * Polyfills
 */
(function () {
    /**
     * CustomEvent
     */
    function CustomEvent ( event, params ) {    // jshint ignore:line
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;

    /**
     * bind()
     */
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs   = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP    = function() {},
                fBound  = function() {
                    return fToBind.apply(this instanceof fNOP ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP(); // jshint ignore:line

            return fBound;
        };
    }
})();

/**
 * MyScript javascript library
 *
 * @module MyScript
 * @requires Q
 * @requires CryptoJS
 */
/*global MyScript:true */
MyScript = {
    RecognitionType: {
        TEXT: 'TEXT',
        MATH: 'MATH',
        SHAPE: 'SHAPE',
        MUSIC: 'MUSIC',
        ANALYZER: 'ANALYZER'
    },
    InputMode: {
        CURSIVE: 'CURSIVE',
        ISOLATED: 'ISOLATED',
        SUPERIMPOSED: 'SUPERIMPOSED',
        VERTICAL: 'VERTICAL'
    },
    InputType: {
        CHAR: 'CHAR',
        WORD: 'WORD',
        SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT',
        MULTI_LINE_TEXT: 'MULTI_LINE_TEXT'
    },
    ResultDetail: {
        TEXT: 'TEXT',
        WORD: 'WORD',
        CHARACTER: 'CHARACTER'
    },
    ResultType: {
        Math: {
            LATEX: 'LATEX',
            MATHML: 'MATHML',
            SYMBOLTREE: 'SYMBOLTREE',
            OFFICEOPENXMLMATH : 'OFFICEOPENXMLMATH'
        },
        Music: {
            MUSICXML: 'MUSICXML',
            SCORETREE: 'SCORETREE'
        }
    },
    Protocol: {
        WS: 'WebSocket',
        REST: 'REST'
    }
};
