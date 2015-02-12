/**
 @module MyScript
 */
/*global MyScript:true */
MyScript = {};
(function (scope) {
    'use strict';
    /**
     * Point
     *
     * @class Point
     * @param {Object} obj
     * @constructor
     */
    function Point (obj) {
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
        }
    }

    /**
     * Get x
     *
     * @method getX
     * @returns {Number}
     */
    Point.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set x
     *
     * @method setX
     * @param {Number} x
     */
    Point.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Get y
     *
     * @method getY
     * @returns {Number}
     */
    Point.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set y
     *
     * @method setY
     * @param {Number} y
     */
    Point.prototype.setY = function (y) {
        this.y = y;
    };

    // Export
    scope.Point = Point;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Complex Point object used for quadratic calculation
     *
     * @class QuadraticPoint
     * @param {Object} obj
     * @constructor
     */
    function QuadraticPoint (obj) {
        scope.Point.call(this, obj);
        this.pressure = 0.5;
        this.distance = 0.0;
        this.length = 0.0;
        this.ux = 0.0;
        this.uy = 0.0;
        this.x1 = 0.0;
        this.x2 = 0.0;
        this.y1 = 0.0;
        this.y2 = 0.0;
    }

    /**
     * Inheritance property
     */
    QuadraticPoint.prototype = new scope.Point();

    /**
     * Constructor property
     */
    QuadraticPoint.prototype.constructor = QuadraticPoint;

    /**
     * Get pressure
     *
     * @method getPressure
     * @returns {Number}
     */
    QuadraticPoint.prototype.getPressure = function () {
        return this.pressure;
    };

    /**
     * Set pressure
     *
     * @method setPressure
     * @param {Number} pressure
     */
    QuadraticPoint.prototype.setPressure = function (pressure) {
        this.pressure = pressure;
    };

    /**
     * Get distance
     *
     * @method getDistance
     * @returns {Number}
     */
    QuadraticPoint.prototype.getDistance = function () {
        return this.distance;
    };

    /**
     * Set distance
     *
     * @method setDistance
     * @param {Number} distance
     */
    QuadraticPoint.prototype.setDistance = function (distance) {
        this.distance = distance;
    };

    /**
     * Get length
     *
     * @method getLength
     * @returns {Number}
     */
    QuadraticPoint.prototype.getLength = function () {
        return this.length;
    };

    /**
     * Set length
     *
     * @method setLength
     * @param {Number} length
     */
    QuadraticPoint.prototype.setLength = function (length) {
        this.length = length;
    };

    /**
     * Get ux
     *
     * @method getUx
     * @returns {Number}
     */
    QuadraticPoint.prototype.getUx = function () {
        return this.ux;
    };

    /**
     * Set ux
     *
     * @method setUx
     * @param {Number} ux
     */
    QuadraticPoint.prototype.setUx = function (ux) {
        this.ux = ux;
    };

    /**
     * Get uy
     *
     * @method getUy
     * @returns {Number}
     */
    QuadraticPoint.prototype.getUy = function () {
        return this.uy;
    };

    /**
     * Set uy
     *
     * @method setUy
     * @param {Number} uy
     */
    QuadraticPoint.prototype.setUy = function (uy) {
        this.uy = uy;
    };

    /**
     * Get x1
     *
     * @method getX1
     * @returns {Number}
     */
    QuadraticPoint.prototype.getX1 = function () {
        return this.x1;
    };

    /**
     * Set x1
     *
     * @method setX1
     * @param {Number} x1
     */
    QuadraticPoint.prototype.setX1 = function (x1) {
        this.x1 = x1;
    };

    /**
     * Get x2
     *
     * @method getX2
     * @returns {Number}
     */
    QuadraticPoint.prototype.getX2 = function () {
        return this.x2;
    };

    /**
     * Set x2
     *
     * @method setX2
     * @param {Number} x2
     */
    QuadraticPoint.prototype.setX2 = function (x2) {
        this.x2 = x2;
    };

    /**
     * Get y1
     *
     * @method getY1
     * @returns {Number}
     */
    QuadraticPoint.prototype.getY1 = function () {
        return this.y1;
    };

    /**
     * Set y2
     *
     * @method setY1
     * @param {Number} y1
     */
    QuadraticPoint.prototype.setY1 = function (y1) {
        this.y1 = y1;
    };

    /**
     * Get y2
     *
     * @method getY2
     * @returns {Number}
     */
    QuadraticPoint.prototype.getY2 = function () {
        return this.y2;
    };

    /**
     * Set y2
     *
     * @method setY2
     * @param {Number} y2
     */
    QuadraticPoint.prototype.setY2 = function (y2) {
        this.y2 = y2;
    };

    // Export
    scope.QuadraticPoint = QuadraticPoint;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Rectangle
     *
     * @class Rectangle
     * @param {Object} obj
     * @constructor
     */
    function Rectangle (obj) {
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.width = obj.width;
            this.height = obj.height;
        }
    }

    /**
     * Get top-left x
     *
     * @method getX
     * @returns {Number}
     */
    Rectangle.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set top-left x
     *
     * @method setX
     * @param {Number}
     */
    Rectangle.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Get top-left y
     *
     * @method getY
     * @returns {Number}
     */
    Rectangle.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set top-left y
     *
     * @method setY
     * @param {Number}
     */
    Rectangle.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     * Get top-left point
     *
     * @method getTopLeftPoint
     * @returns {MyScript.Point}
     */
    Rectangle.prototype.getTopLeftPoint = function () {
        var point = new scope.Point();
        point.setX(this.x);
        point.setY(this.y);
        return point;
    };

    /**
     * Set top-left point
     *
     * @method setTopLeftPoint
     * @param {Point} topLeftPoint
     */
    Rectangle.prototype.setTopLeftPoint = function (topLeftPoint) {
        this.x = topLeftPoint.getX();
        this.y = topLeftPoint.getY();
    };

    /**
     * Get width
     *
     * @method getWidth
     * @returns {Number}
     */
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Set width
     *
     * @method setWidth
     * @param {Number} width
     */
    Rectangle.prototype.setWidth = function (width) {
        this.width = width;
    };

    /**
     * Get height
     *
     * @method getHeight
     * @returns {Number}
     */
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * Set height
     *
     * @method setHeight
     * @returns {Number} height
     */
    Rectangle.prototype.setHeight = function (height) {
        this.height = height;
    };

    // Export
    scope.Rectangle = Rectangle;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * The Stroker class that can use to store writing strokes and manage the undo/redo/clear system
     *
     * @class Stroker
     * @constructor
     */
    function Stroker () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    }

    /**
     * Is Wrinting a stoke
     *
     * @method isWriting
     * @returns {Boolean}
     */
    Stroker.prototype.isWriting = function () {
        return this.writing;
    };

    /**
     * Get the last current Stroke write
     *
     * @method getCurrentStroke
     * @returns {Stroke}
     */
    Stroker.prototype.getCurrentStroke = function () {
        return this.currentStroke;
    };

    /**
     * Start to write a stroke
     *
     * @method startStrokeWriting
     * @param {Number} x abcisse coordinate
     * @param {Number} y ordinate coordinate
     */
    Stroker.prototype.startStrokeWriting = function (x, y) {
        this.currentStroke = new scope.Stroke();
        this.currentStroke.addX(x);
        this.currentStroke.addY(y);
        this.writing = true;
    };

    /**
     * Continue to write a stroke
     *
     * @method continueStrokeWriting
     * @param {Number} x abcisse coordinate
     * @param {Number} y ordinate coordinate
     */
    Stroker.prototype.continueStrokeWriting = function (x, y) {
        if (this.writing) {
            this.currentStroke.addX(x);
            this.currentStroke.addY(y);
        }
    };

    /**
     * End of writing a stroke
     *
     * @method endStrokeWriting
     */
    Stroker.prototype.endStrokeWriting = function () {
        this.strokes.push(this.currentStroke);
        this.writing = false;
    };

    /**
     * Clear the strokes list
     *
     * @method clear
     */
    Stroker.prototype.clear = function () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    };

    /**
     * Is The Strokes list is empty
     *
     * @method isEmpty
     * @returns {Boolean}
     */
    Stroker.prototype.isEmpty = function () {
        return this.strokes.length === 0;
    };

    /**
     * Is the Undo/Redo Stack empty
     *
     * @method isRedoEmpty
     * @returns {Boolean}
     */
    Stroker.prototype.isRedoEmpty = function () {
        return this.undoRedoStack.length === 0;
    };

    /**
     * Make an undo
     *
     * @method undo
     */
    Stroker.prototype.undo = function () {
        if (!this.isEmpty()) {
            this.undoRedoStack.push(this.strokes[this.strokes.length - 1]);
            this.strokes.pop();
        }
    };

    /**
     * Make a redo
     *
     * @method redo
     */
    Stroker.prototype.redo = function () {
        if (!this.isRedoEmpty()) {
            this.strokes.push(this.undoRedoStack[this.undoRedoStack.length - 1]);
            this.undoRedoStack.pop();
        }
    };

    /**
     * Get the strokes list
     *
     * @method getStokes
     * @returns {Stroke[]}
     */
    Stroker.prototype.getStrokes = function () {
        return this.strokes;
    };

    /**
     * Get the Undo/Redo Stack
     *
     * @method getUndoRedoStack
     * @returns {Stroke[]}
     */
    Stroker.prototype.getUndoRedoStack = function () {
        return this.undoRedoStack;
    };

    /**
     * Clear the Undo/Redo Stack
     *
     * @method clearUndoRedoStack
     */
    Stroker.prototype.clearUndoRedoStack = function () {
        this.undoRedoStack = [];
    };

    /**
     * Copy the strokes values from index on an other list of strokes
     *
     * @method copy
     * @param {Stroke[]} strokes List of strokes
     * @param {Number} index Position to start the copy
     */
    Stroker.prototype.copy = function (strokes, index) {
        for (index; index < this.strokes.length; index++) {
            strokes.push(this.strokes[index]);
        }
    };

    // Export
    scope.Stroker = Stroker;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * The mathUtil class is use to calculate lines
     *
     * @class MathUtil
     * @constructor
     */
    function MathUtils () {
    }

    /**
     * This method is use to calculate the size of the rectangle that contains an ellipse arc.
     *
     * @method getEllipseArcRect
     * @param {Point} center
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {Number} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @returns {MyScript.Rectangle}
     */
    MathUtils.getEllipseArcRect = function (center, maxRadius, minRadius, orientation, startAngle, sweepAngle) {

        var angleStep = 0.02, // angle delta between interpolated points on the arc, in radian
            angle, // angle
            alpha, // angle
            z1,
            z2,
            z3,
            z4,
            cosAlpha,
            sinAlpha,
            n,
            xList,
            yList,
            i,
            x,
            y,
            xMin,
            xMax,
            yMin,
            yMax,
            sortFloat = function (a, b) {
                return a - b;
            };

        z1 = z2 = Math.cos(orientation);
        z3 = z4 = Math.sin(orientation);
        z1 *= maxRadius;
        z2 *= minRadius;
        z3 *= maxRadius;
        z4 *= minRadius;

        n = Math.abs(sweepAngle) / angleStep;

        xList = [];
        yList = [];

        for (i = 0; i <= n; i++) {

            angle = startAngle + (i / n) * sweepAngle;
            alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

            cosAlpha = Math.cos(alpha);
            sinAlpha = Math.sin(alpha);

            // current point
            x = center.x + z1 * cosAlpha - z4 * sinAlpha;
            y = center.y + z2 * sinAlpha + z3 * cosAlpha;

            xList.push(x);
            yList.push(y);
        }

        xList.sort(sortFloat);
        yList.sort(sortFloat);

        xMin = xList[0];
        xMax = xList[xList.length - 1];
        yMin = yList[0];
        yMax = yList[yList.length - 1];

        return new scope.Rectangle({x:xMin, y:yMin, width: xMax - xMin, height: yMax - yMin});
    };

    /**
     * This method is use to calculate the size of the rectangle that contains a line.
     *
     * @method getLineRect
     * @param {Point} firstPoint
     * @param {Point} lastPoint
     * @returns {MyScript.Rectangle}
     */
    MathUtils.getLineRect = function (firstPoint, lastPoint) {

        var xFirst = firstPoint.x,
            xLast = lastPoint.x,
            xMin = Math.min(xFirst, xLast),
            xMax = Math.max(xFirst,xLast),

            yFirst = firstPoint.y,
            yLast = lastPoint.y,
            yMin = Math.min(yFirst, yLast),
            yMax = Math.max(yFirst, yLast);

        return new scope.Rectangle({x:xMin, y:yMin, width: xMax - xMin, height: yMax - yMin});
    };

    /**
     * This method is use to calculate the size of the rectangle that contains bounding boxes.
     *
     * @method getBoundingRect
     * @param {Rectangle[]} boundingBoxes List of bounding box
     * @returns {MyScript.Rectangle}
     */
    MathUtils.getBoundingRect = function (boundingBoxes) {

        var xList = [],
            yList = [];

        for (var i in boundingBoxes) {
            var rectangle = boundingBoxes[i];
            xList.push(rectangle.getX());
            xList.push(rectangle.getX() + rectangle.getWidth());
            yList.push(rectangle.getY());
            yList.push(rectangle.getY() + rectangle.getHeight());
        }

        var xMin = Math.min.apply(Math, xList);
        var xMax = Math.max.apply(Math, xList);
        var yMin = Math.min.apply(Math, yList);
        var yMax = Math.max.apply(Math, yList);

        return new scope.Rectangle({x:xMin, y:yMin, width: xMax - xMin, height: yMax - yMin});
    };

    // Export
    scope.MathUtils = MathUtils;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represent an abstract input component
     *
     * @class AbstractComponent
     * @constructor
     */
    function AbstractComponent () {
    }

    /**
     * Get the type of the input component
     *
     * @method getType
     * @returns {String}
     */
    AbstractComponent.prototype.getType = function () {
        return this.type;
    };

    /**
     * Set the type of the input component
     *
     * @method setType
     * @param {String} type
     */
    AbstractComponent.prototype.setType = function (type) {
        this.type = type;
    };

    // Export
    scope.AbstractComponent = AbstractComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represent a simple stroke input component
     *
     * @class Stroke
     * @extends AbstractComponent
     * @constructor
     */
    function Stroke () {
        this.type = 'stroke';
        this.x = [];
        this.y = [];
    }

    /**
     * Inheritance property
     */
    Stroke.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    Stroke.prototype.constructor = Stroke;

    /**
     * Get the list of x coordinates
     *
     * @method getX
     * @returns {Number[]}
     */
    Stroke.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set the list of x coordinates
     *
     * @method setX
     * @param {Number[]} x
     */
    Stroke.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Add a x to the list of x coordinates
     *
     * @method addX
     * @param {Number} x
     */
    Stroke.prototype.addX = function (x) {
        this.x.push(x);
    };

    /**
     * Get the list of y coordinates
     *
     * @method getY
     * @returns {Number[]}
     */
    Stroke.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set the list of y coordinates
     *
     * @method setY
     * @param {Number[]} y
     */
    Stroke.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     * Add a y to the list of y coordinates
     *
     * @method addY
     * @param {Number} y
     */
    Stroke.prototype.addY = function (y) {
        this.y.push(y);
    };

    /**
     * Get the number of points for this stroke
     *
     * @method getLength
     * @returns {Number}
     */
    Stroke.prototype.getLength = function () {
        return this.x.length;
    };


    /**
     * Get the boundingBox
     *
     * @method getBoundingBox
     * @returns {MyScript.Rectangle}
     */
    Stroke.prototype.getBoundingBox = function () {
        var boundingBox = new scope.Rectangle();
        boundingBox.setX(Math.min.apply(Math, this.getX()));
        boundingBox.setY(Math.min.apply(Math, this.getY()));
        boundingBox.setWidth(Math.max.apply(Math, this.getX()) - boundingBox.getX());
        boundingBox.setHeight(Math.max.apply(Math, this.getY()) - boundingBox.getY());
        return boundingBox;
    };

    // Export
    scope.Stroke = Stroke;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract parameters used for recognition
     *
     * @class AbstractParameter
     * @constructor
     */
    function AbstractParameter () {
    }

    // Export
    scope.AbstractParameter = AbstractParameter;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstraction of recognizer input
     *
     * @class AbstractRecognitionInput
     * @constructor
     */
    function AbstractRecognitionInput () {
    }

    // Export
    scope.AbstractRecognitionInput = AbstractRecognitionInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract input recognition data
     *
     * @class AbstractRecognitionData
     * @constructor
     */
    function AbstractRecognitionData () {
    }

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    AbstractRecognitionData.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    /**
     * Get the instanceId
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Set the instanceId
     *
     * @method setInstanceId
     * @param {String} instanceId
     */
    AbstractRecognitionData.prototype.setInstanceId = function (instanceId) {
        this.instanceId = instanceId;
    };

    /**
     * @returns {string}
     */
    AbstractRecognitionData.prototype.getHmac = function () {
        return this.hmac;
    };

    /**
     * @param {string} hmac
     */
    AbstractRecognitionData.prototype.setHmac = function (hmac) {
        this.hmac = hmac;
    };

    // Export
    scope.AbstractRecognitionData = AbstractRecognitionData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * List of languages recognition input
     *
     * @class RecognitionLanguagesData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function RecognitionLanguagesData () {
    }

    /**
     * Inheritance property
     */
    RecognitionLanguagesData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    RecognitionLanguagesData.prototype.constructor = RecognitionLanguagesData;

    /**
     * Get the recognition input mode
     *
     * @method getInputMode
     * @returns {String} inputMode
     */
    RecognitionLanguagesData.prototype.getInputMode = function () {
        return this.inputMode;
    };

    /**
     * Set the recognition input mode
     *
     * @method setInputMode
     * @param {String} inputMode
     */
    RecognitionLanguagesData.prototype.setInputMode = function (inputMode) {
        this.inputMode = inputMode;
    };

    // Export
    scope.RecognitionLanguagesData = RecognitionLanguagesData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract text input component
     *
     * @class AbstractTextInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function AbstractTextInputComponent () {
    }

    /**
     * Inheritance property
     */
    AbstractTextInputComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    AbstractTextInputComponent.prototype.constructor = AbstractTextInputComponent;

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AbstractTextInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    AbstractTextInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractTextInputComponent = AbstractTextInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Char input component
     *
     * @class CharacterInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function CharacterInputComponent () {
        this.type = 'inputCharacter';
        this.alternates = [];
    }

    /**
     * Inheritance property
     */
    CharacterInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    CharacterInputComponent.prototype.constructor = CharacterInputComponent;

    /**
     * Get character input alternates
     *
     * @method getAlternates
     * @returns {MyScript.CharacterInputComponentAlternate[]}
     */
    CharacterInputComponent.prototype.getAlternates = function () {
        return this.alternates;
    };

    /**
     * Set character input alternates
     *
     * @method setAlternates
     * @param {MyScript.CharacterInputComponentAlternate[]} alternates
     */
    CharacterInputComponent.prototype.setAlternates = function (alternates) {
        this.alternates = alternates;
    };

    /**
     * Add a character input alternate
     *
     * @method addAlternate
     * @param {MyScript.CharacterInputComponent} alternate
     */
    CharacterInputComponent.prototype.addAlternate = function (alternate) {
        this.alternates.push(alternate);
    };

    // Export
    scope.CharacterInputComponent = CharacterInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Character input component alternate
     *
     * @class CharacterInputComponentAlternate
     * @constructor
     */
    function CharacterInputComponentAlternate (alternate, probability) {
        this.alternate = alternate;
        this.probability = probability;
    }

    /**
     * Get alternate
     *
     * @method getAlternate
     * @returns {String}
     */
    CharacterInputComponentAlternate.prototype.getAlternate = function () {
        return this.alternate;
    };

    /**
     * Set alternate
     *
     * @method setAlternate
     * @param {String} alternate
     */
    CharacterInputComponentAlternate.prototype.setAlternate = function (alternate) {
        this.alternate = alternate;
    };

    /**
     * Get probability
     *
     * @method getProbability
     * @returns {Number}
     */
    CharacterInputComponentAlternate.prototype.getProbability = function () {
        return this.probability;
    };

    /**
     * Set probability
     *
     * @method setProbability
     * @param {Number} probability
     */
    CharacterInputComponentAlternate.prototype.setProbability = function (probability) {
        this.probability = probability;
    };

    // Export
    scope.CharacterInputComponentAlternate = CharacterInputComponentAlternate;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Char input component
     *
     * @class CharInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function CharInputComponent () {
        this.type = 'char';
    }

    /**
     * Inheritance property
     */
    CharInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    CharInputComponent.prototype.constructor = CharInputComponent;

    /**
     * Get character
     *
     * @method getCharacter
     * @returns {String}
     */
    CharInputComponent.prototype.getCharacter = function () {
        return this.character;
    };

    /**
     * Set character
     *
     * @method setCharacter
     * @param {String} character
     */
    CharInputComponent.prototype.setCharacter = function (character) {
        this.character = character;
    };

    // Export
    scope.CharInputComponent = CharInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * String input component
     *
     * @class StringInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function StringInputComponent () {
        this.type = 'string';
    }

    /**
     * Inheritance property
     */
    StringInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    StringInputComponent.prototype.constructor = StringInputComponent;

    /**
     * Get string
     *
     * @method getString
     * @returns {String}
     */
    StringInputComponent.prototype.getString = function () {
        return this.string;
    };

    /**
     * Set string
     *
     * @method setString
     * @param {String} string
     */
    StringInputComponent.prototype.setString = function (string) {
        this.string = string;
    };

    // Export
    scope.StringInputComponent = StringInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Input unit used for text recognition
     *
     * @class TextInputUnit
     * @constructor
     */
    function TextInputUnit () {
        this.textInputType = 'MULTI_LINE_TEXT';
        this.components = [];
    }

    /**
     * Get the input type
     *
     * @method getInputType
     * @returns {String}
     */
    TextInputUnit.prototype.getInputType = function () {
        return this.textInputType;
    };

    /**
     * Set the input type
     *
     * @method setInputType
     * @returns {String} inputType
     */
    TextInputUnit.prototype.setInputType = function (inputType) {
        this.textInputType = inputType;
    };

    /**
     * Get components for this input unit
     *
     * @method getComponents
     * @returns {MyScript.AbstractComponent[]}
     */
    TextInputUnit.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set components for this input unit
     *
     * @method setComponents
     * @param {MyScript.AbstractComponent[]} components
     */
    TextInputUnit.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.TextInputUnit = TextInputUnit;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Parameters used for text recognition
     *
     * @class TextParameter
     * @extends AbstractParameter
     * @constructor
     */
    function TextParameter (obj) {
        scope.AbstractParameter.call(this, obj);
    }

    /**
     * Inheritance property
     */
    TextParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    TextParameter.prototype.constructor = TextParameter;

    /**
     * Get recognition language
     *
     * @method getLanguage
     * @returns {String}
     */
    TextParameter.prototype.getLanguage = function () {
        return this.language;
    };

    /**
     * Set recognition language
     *
     * @method getLanguage
     * @param {String} language
     */
    TextParameter.prototype.setLanguage = function (language) {
        this.language = language;
    };

    /**
     * Get input mode
     *
     * @method getInputMode
     * @returns {String}
     */
    TextParameter.prototype.getInputMode = function () {
        return this.textInputMode;
    };

    /**
     * Set input mode
     *
     * @method setInputMode
     * @param {String} inputMode
     */
    TextParameter.prototype.setInputMode = function (inputMode) {
        this.textInputMode = inputMode;
    };

    /**
     * Get content types
     *
     * @method getContentTypes
     * @returns {Array}
     */
    TextParameter.prototype.getContentTypes = function () {
        return this.contentTypes;
    };

    /**
     * Set content types
     *
     * @method setContentTypes
     * @param {Array} contentTypes
     */
    TextParameter.prototype.setContentTypes = function (contentTypes) {
        this.contentTypes = contentTypes;
    };

    /**
     * Get SK
     *
     * @method getSubsetKnowledges
     * @returns {Array}
     */
    TextParameter.prototype.getSubsetKnowledges = function () {
        return this.subsetKnowledges;
    };

    /**
     * Set SK
     *
     * @method setSubsetKnowledges
     * @param {Array} subsetKnowledges
     */
    TextParameter.prototype.setSubsetKnowledges = function (subsetKnowledges) {
        this.subsetKnowledges = subsetKnowledges;
    };

    /**
     * Get user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    TextParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    TextParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get user LK words
     *
     * @method getUserLkWords
     * @returns {Array}
     */
    TextParameter.prototype.getUserLkWords = function () {
        return this.userLkWords;
    };

    /**
     * Set user LK words
     *
     * @method setUserLkWords
     * @param {Array} userLkWords
     */
    TextParameter.prototype.setUserLkWords = function (userLkWords) {
        this.userLkWords = userLkWords;
    };

    /**
     * Get result detail (e.g. TEXT, WORD ...)
     *
     * @method getResultDetail
     * @returns {String}
     */
    TextParameter.prototype.getResultDetail = function () {
        return this.resultDetail;
    };

    /**
     * Set result detail (e.g. TEXT, WORD ...)
     *
     * @method setResultDetail
     * @param {String} resultDetail
     */
    TextParameter.prototype.setResultDetail = function (resultDetail) {
        this.resultDetail = resultDetail;
    };

    /**
     * Get text properties
     *
     * @method getTextProperties
     * @returns {MyScript.TextProperties[]}
     */
    TextParameter.prototype.getTextProperties = function () {
        return this.textProperties;
    };

    /**
     * Set text properties
     *
     * @method setTextProperties
     * @param {MyScript.TextProperties[]} properties
     */
    TextParameter.prototype.setTextProperties = function (textProperties) {
        this.textProperties = textProperties;
    };

    // Export
    scope.TextParameter = TextParameter;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text recognition properties
     *
     * @class TextProperties
     * @constructor
     */
    function TextProperties () {
    }

    /**
     * Get the number of text candidates requested
     *
     * @method getTextCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getTextCandidateListSize = function () {
        return this.textCandidateListSize;
    };

    /**
     * Set the number of text candidates requested
     *
     * @method setTextCandidateListSize
     * @param {Number} textCandidateListSize
     */
    TextProperties.prototype.setTextCandidateListSize = function (textCandidateListSize) {
        this.textCandidateListSize = textCandidateListSize;
    };

    /**
     * Get the number of word candidates requested
     *
     * @method getWordCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordCandidateListSize = function () {
        return this.wordCandidateListSize;
    };

    /**
     * Set the number of word candidates requested
     *
     * @method setWordCandidateListSize
     * @param {Number} wordCandidateListSize
     */
    TextProperties.prototype.setWordCandidateListSize = function (wordCandidateListSize) {
        this.wordCandidateListSize = wordCandidateListSize;
    };

    /**
     * Get the number of word prediction candidates requested
     *
     * @method getWordPredictionListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordPredictionListSize = function () {
        return this.wordPredictionListSize;
    };

    /**
     * Set the number of word prediction candidates requested
     *
     * @method setWordPredictionListSize
     * @param {Number} wordPredictionListSize
     */
    TextProperties.prototype.setWordPredictionListSize = function (wordPredictionListSize) {
        this.wordPredictionListSize = wordPredictionListSize;
    };

    /**
     * Get the number of word completion candidates requested
     *
     * @method getWordCompletionListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordCompletionListSize = function () {
        return this.wordCompletionListSize;
    };

    /**
     * Set the number of word completion candidates requested
     *
     * @method setWordCompletionListSize
     * @param {Number} wordCompletionListSize
     */
    TextProperties.prototype.setWordCompletionListSize = function (wordCompletionListSize) {
        this.wordCompletionListSize = wordCompletionListSize;
    };

    /**
     * Get the number of character candidates requested
     *
     * @method getCharacterCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getCharacterCandidateListSize = function () {
        return this.characterCandidateListSize;
    };

    /**
     * Set the number of character candidates requested
     *
     * @method setCharacterCandidateListSize
     * @param {Number} characterCandidateListSize
     */
    TextProperties.prototype.setCharacterCandidateListSize = function (characterCandidateListSize) {
        this.characterCandidateListSize = characterCandidateListSize;
    };

    /**
     * Get the discard case variations
     *
     * @method getDiscardCaseVariations
     * @returns {boolean}
     */
    TextProperties.prototype.getDiscardCaseVariations = function () {
        return this.discardCaseVariations;
    };

    /**
     * Set the discard case variations
     *
     * @method setDiscardCaseVariations
     * @param {boolean} discardCaseVariations
     */
    TextProperties.prototype.setDiscardCaseVariations = function (discardCaseVariations) {
        this.discardCaseVariations = discardCaseVariations;
    };

    /**
     * Get the discard accentuation variations
     *
     * @method getDiscardAccentuationVariations
     * @returns {boolean}
     */
    TextProperties.prototype.getDiscardAccentuationVariations = function () {
        return this.discardAccentuationVariations;
    };

    /**
     * Set the discard accentuation variations
     *
     * @method setDiscardAccentuationVariations
     * @param {boolean} discardAccentuationVariations
     */
    TextProperties.prototype.setDiscardAccentuationVariations = function (discardAccentuationVariations) {
        this.discardAccentuationVariations = discardAccentuationVariations;
    };

    /**
     * Get disable spatial ordering
     *
     * @method getDisableSpatialOrdering
     * @returns {Boolean}
     */
    TextProperties.prototype.getDisableSpatialOrdering = function () {
        return this.disableSpatialOrdering;
    };

    /**
     * Set disable spatial ordering
     *
     * @method setDisableSpatialOrdering
     * @param {Boolean} disableSpatialOrdering
     */
    TextProperties.prototype.setDisableSpatialOrdering = function (disableSpatialOrdering) {
        this.disableSpatialOrdering = disableSpatialOrdering;
    };

    /**
     * Get glyph distortion
     *
     * @method getGlyphDistortion
     * @returns {Number}
     */
    TextProperties.prototype.getGlyphDistortion = function () {
        return this.glyphDistortion;
    };

    /**
     * Set glyph distortion
     *
     * @method setGlyphDistortion
     * @param {Number} glyphDistortion
     */
    TextProperties.prototype.setGlyphDistortion = function (glyphDistortion) {
        this.glyphDistortion = glyphDistortion;
    };

    /**
     * Get enable out of lexicon
     *
     * @method getEnableOutOfLexicon
     * @returns {Boolean}
     */
    TextProperties.prototype.getEnableOutOfLexicon = function () {
        return this.enableOutOfLexicon;
    };

    /**
     * Set enable out of lexicon
     *
     * @method setEnableOutOfLexicon
     * @param {Boolean} enableOutOfLexicon
     */
    TextProperties.prototype.setEnableOutOfLexicon = function (enableOutOfLexicon) {
        this.enableOutOfLexicon = enableOutOfLexicon;
    };

    /**
     * Get spelling distortion
     *
     * @method getSpellingDistortion
     * @returns {Number}
     */
    TextProperties.prototype.getSpellingDistortion = function () {
        return this.spellingDistortion;
    };

    /**
     * Set spelling distortion
     *
     * @method setSpellingDistortion
     * @param {Number} spellingDistortion
     */
    TextProperties.prototype.setSpellingDistortion = function (spellingDistortion) {
        this.spellingDistortion = spellingDistortion;
    };

    // Export
    scope.TextProperties = TextProperties;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition input object for text recognition
     *
     * @class TextRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function TextRecognitionInput () {
    }

    /**
     * Inheritance property
     */
    TextRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    TextRecognitionInput.prototype.constructor = TextRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MyScript.TextParameter}
     */
    TextRecognitionInput.prototype.getParameters = function () {
        return this.textParameter;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MyScript.TextParameter} parameters
     */
    TextRecognitionInput.prototype.setParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get input units
     *
     * @method getInputUnits
     * @returns {MyScript.TextInputUnit[]}
     */
    TextRecognitionInput.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {MyScript.TextInputUnit[]} inputUnits
     */
    TextRecognitionInput.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    // Export
    scope.TextRecognitionInput = TextRecognitionInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition data for text input
     *
     * @class TextRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function TextRecognitionData () {
    }

    /**
     * Inheritance property
     */
    TextRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    TextRecognitionData.prototype.constructor = TextRecognitionData;

    /**
     * Get text input
     *
     * @method getTextRecognitionInput
     * @returns {MyScript.TextRecognitionInput} inputMode
     */
    TextRecognitionData.prototype.getTextRecognitionInput = function () {
        return this.textInput;
    };

    /**
     * Set text input
     *
     * @method setTextRecognitionInput
     * @param {MyScript.TextRecognitionInput} input
     */
    TextRecognitionData.prototype.setTextRecognitionInput = function (input) {
        this.textInput = JSON.stringify(input);
    };

    // Export
    scope.TextRecognitionData = TextRecognitionData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Parameters used for shape recognition
     *
     * @class ShapeParameter
     * @extends AbstractParameter
     * @constructor
     */
    function ShapeParameter () {
    }

    /**
     * Inheritance property
     */
    ShapeParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    ShapeParameter.prototype.constructor = ShapeParameter;

    /**
     * Get the sensitivity of the reject detection
     *
     * @method getRejectDetectionSensitivity
     * @returns {Boolean}
     */
    ShapeParameter.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the reject detection
     *
     * @method setRejectDetectionSensitivity
     * @param {Boolean} rejectDetectionSensitivity
     */
    ShapeParameter.prototype.setRejectDetectionSensitivity = function (rejectDetectionSensitivity) {
        this.rejectDetectionSensitivity = rejectDetectionSensitivity;
    };

    /**
     * Get the beautification
     *
     * @method hasBeautification
     * @returns {Boolean}
     */
    ShapeParameter.prototype.hasBeautification = function () {
        return this.doBeautification;
    };

    /**
     * Set the beautification
     *
     * @method setBeautification
     * @param {Boolean} doBeautification
     */
    ShapeParameter.prototype.setBeautification = function (doBeautification) {
        this.doBeautification = doBeautification;
    };

    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    ShapeParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array}
     */
    ShapeParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    // Export
    scope.ShapeParameter = ShapeParameter;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition input object for shape recognition
     *
     * @class ShapeRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function ShapeRecognitionInput () {
    }

    /**
     * Inheritance property
     */
    ShapeRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    ShapeRecognitionInput.prototype.constructor = ShapeRecognitionInput;

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {MyScript.AbstractComponent[]}
     */
    ShapeRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {MyScript.AbstractComponent[]} components
     */
    ShapeRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get the beautification
     *
     * @method getDoBeautification
     * @returns {Boolean}
     */
    ShapeRecognitionInput.prototype.getDoBeautification = function () {
        return this.doBeautification;
    };

    /**
     * Set the beautification
     *
     * @method setDoBeautification
     * @param {Boolean} doBeautification
     */
    ShapeRecognitionInput.prototype.setDoBeautification = function (doBeautification) {
        this.doBeautification = doBeautification;
    };

    /**
     * Get the sensitivity of the reject detection
     *
     * @method getRejectDetectionSensitivity
     * @returns {Number}
     */
    ShapeRecognitionInput.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the reject detection
     *
     * @method setRejectDetectionSensitivity
     * @param {Number} rejectDetectionSensitivity
     */
    ShapeRecognitionInput.prototype.setRejectDetectionSensitivity = function (rejectDetectionSensitivity) {
        this.rejectDetectionSensitivity = rejectDetectionSensitivity;
    };

    // Export
    scope.ShapeRecognitionInput = ShapeRecognitionInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition data for shape input
     *
     * @class ShapeRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function ShapeRecognitionData () {
    }

    /**
     * Inheritance property
     */
    ShapeRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    ShapeRecognitionData.prototype.constructor = ShapeRecognitionData;

    /**
     * Get shape input
     *
     * @method getShapeRecognitionInput
     * @returns {MyScript.ShapeRecognitionInput}
     */
    ShapeRecognitionData.prototype.getShapeRecognitionInput = function () {
        return this.shapeInput;
    };

    /**
     * Set shape input
     *
     * @method setShapeRecognitionInput
     * @param {MyScript.ShapeRecognitionInput} input
     */
    ShapeRecognitionData.prototype.setShapeRecognitionInput = function (input) {
        this.shapeInput = JSON.stringify(input);
    };

    // Export
    scope.ShapeRecognitionData = ShapeRecognitionData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Parameters used for math recognition
     *
     * @class MathParameter
     * @extends AbstractParameter
     * @constructor
     */
    function MathParameter () {
        this.resultTypes = [];
        this.isColumnar = false;
        this.userResources = [];
    }

    /**
     * Inheritance property
     */
    MathParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    MathParameter.prototype.constructor = MathParameter;

    /**
     * Get the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method getResultTypes
     * @returns {Array}
     */
    MathParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method setResultTypes
     * @param {Array}
     */
    MathParameter.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };
    /**
     * Get the math result result orientation to columnar operations
     *
     * @method getIsColumnar
     * @returns boolean
     */
    MathParameter.prototype.getIsColumnar = function () {
        return this.isColumnar;
    };

    /**
     * Set the math result orientation to columnar operations
     *
     * @method setIsColumnar
     * @param  boolean
     */
    MathParameter.prototype.setIsColumnar = function (isColumnar) {
        this.resultTypes = isColumnar;
    };
    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MathParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array}
     */
    MathParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MathParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number}
     */
    MathParameter.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    // Export
    scope.MathParameter = MathParameter;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition input object for math recognition
     *
     * @class MathRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function MathRecognitionInput () {
    }

    /**
     * Inheritance property
     */
    MathRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    MathRecognitionInput.prototype.constructor = MathRecognitionInput;

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    MathRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    MathRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method getResultTypes
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method setResultTypes
     * @param {Array} resultTypes
     */
    MathRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };
    /**
     * Get the math result result orientation to columnar operations
     *
     * @method getIsColumnar
     * @returns boolean
     */
    MathRecognitionInput.prototype.getIsColumnar = function () {
        return this.isColumnar;
    };

    /**
     * Set the math result orientation to columnar operations
     *
     * @method setIsColumnar
     * @param  boolean
     */
    MathRecognitionInput.prototype.setIsColumnar = function (isColumnar) {
        this.isColumnar = isColumnar;
    };
    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    MathRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MathRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number} scratchOutDetectionSensitivity
     */
    MathRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };
    // Export
    scope.MathRecognitionInput = MathRecognitionInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition data for math input
     *
     * @class MathRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MathRecognitionData () {
    }

    /**
     * Inheritance property
     */
    MathRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    MathRecognitionData.prototype.constructor = MathRecognitionData;

    /**
     * Get math input
     *
     * @method getMathRecognitionInput
     * @returns {MyScript.MathRecognitionInput}
     */
    MathRecognitionData.prototype.getMathRecognitionInput = function () {
        return this.mathInput;
    };

    /**
     * Set math input
     *
     * @method setMathRecognitionInput
     * @param {MyScript.MathRecognitionInput} input
     */
    MathRecognitionData.prototype.setMathRecognitionInput = function (input) {
        this.mathInput = JSON.stringify(input);

    };

    // Export
    scope.MathRecognitionData = MathRecognitionData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract music input component
     *
     * @class AbstractMusicInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function AbstractMusicInputComponent () {
    }

    /**
     * Inheritance property
     */
    AbstractMusicInputComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    AbstractMusicInputComponent.prototype.constructor = AbstractMusicInputComponent;

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AbstractMusicInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    AbstractMusicInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractMusicInputComponent = AbstractMusicInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Accidental input component
     *
     * @class MusicAccidentalInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicAccidentalInputComponent () {
        this.type = 'accidental';
    }

    /**
     * Inheritance property
     */
    MusicAccidentalInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicAccidentalInputComponent.prototype.constructor = MusicAccidentalInputComponent;

    /**
     * Get accidental input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicAccidentalInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set accidental input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicAccidentalInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicAccidentalInputComponent = MusicAccidentalInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Arpeggiate input component
     *
     * @class MusicArpeggiateInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicArpeggiateInputComponent () {
        this.type = 'arpeggiate';
    }

    /**
     * Inheritance property
     */
    MusicArpeggiateInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicArpeggiateInputComponent.prototype.constructor = MusicArpeggiateInputComponent;

    /**
     * Get arpeggiate input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicArpeggiateInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set arpeggiate input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicArpeggiateInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicArpeggiateInputComponent = MusicArpeggiateInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music bar input
     *
     * @class MusicBarInput
     * @constructor
     */
    function MusicBarInput () {
    }

    /**
     * Get repeat direction
     *
     * @method getRepeatDirection
     * @returns {String}
     */
    MusicBarInput.prototype.getRepeatDirection = function () {
        return this.repeatDirection;
    };

    /**
     * Set repeat direction
     *
     * @method setRepeatDirection
     * @param {String} repeatDirection
     */
    MusicBarInput.prototype.setRepeatDirection = function (repeatDirection) {
        this.repeatDirection = repeatDirection;
    };

    /**
     * Get style
     *
     * @method getStyle
     * @returns {String}
     */
    MusicBarInput.prototype.getStyle = function () {
        return this.style;
    };

    /**
     * Set style
     *
     * @method setStyle
     * @param {String} style
     */
    MusicBarInput.prototype.setStyle = function (style) {
        this.style = style;
    };

    // Export
    scope.MusicBarInput = MusicBarInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Bar input component
     *
     * @class MusicBarInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicBarInputComponent () {
        this.type = 'bar';
    }

    /**
     * Inheritance property
     */
    MusicBarInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicBarInputComponent.prototype.constructor = MusicBarInputComponent;

    /**
     * Get bar input component value
     *
     * @method getValue
     * @returns {MyScript.MusicBarInput}
     */
    MusicBarInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set bar input component value
     *
     * @method setValue
     * @param {MyScript.MusicBarInput} value
     */
    MusicBarInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBarInputComponent = MusicBarInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music beam input
     *
     * @class MusicBeamInput
     * @constructor
     */
    function MusicBeamInput () {
    }

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicBeamInput.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     *
     * @method setPlacement
     * @param {String} placement
     */
    MusicBeamInput.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    /**
     * Get slope
     *
     * @method getSlope
     * @returns {String}
     */
    MusicBeamInput.prototype.getSlope = function () {
        return this.slope;
    };

    /**
     * Set slope
     *
     * @method setSlope
     * @param {String} slope
     */
    MusicBeamInput.prototype.setSlope = function (slope) {
        this.slope = slope;
    };

    /**
     * Get left count
     *
     * @method getLeftCount
     * @returns {Number}
     */
    MusicBeamInput.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     * Set left count
     *
     * @method setLeftCount
     * @param {Number} leftCount
     */
    MusicBeamInput.prototype.setLeftCount = function (leftCount) {
        this.leftCount = leftCount;
    };

    /**
     * Get right count
     *
     * @method getRightCount
     * @returns {Number}
     */
    MusicBeamInput.prototype.getRightCount = function () {
        return this.rightCount;
    };

    /**
     * Set right count
     *
     * @method setRightCount
     * @param {Number} rightCount
     */
    MusicBeamInput.prototype.setRightCount = function (rightCount) {
        this.rightCount = rightCount;
    };

    /**
     * Get gap
     *
     * @method getGap
     * @returns {Number}
     */
    MusicBeamInput.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set gap
     *
     * @method setGap
     * @param {Number} gap
     */
    MusicBeamInput.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicBeamInput = MusicBeamInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Beam input component
     *
     * @class MusicBeamInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicBeamInputComponent () {
        this.type = 'beam';
    }

    /**
     * Inheritance property
     */
    MusicBeamInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicBeamInputComponent.prototype.constructor = MusicBeamInputComponent;

    /**
     * Get beam input component value
     *
     * @method getValue
     * @returns {MusicBeamInput}
     */
    MusicBeamInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set beam input component value
     *
     * @method setValue
     * @param {MusicBeamInput} value
     */
    MusicBeamInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBeamInputComponent = MusicBeamInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music clef input
     *
     * @class MusicClefInput
     * @constructor
     */
    function MusicClefInput () {
    }

    /**
     * Get y anchor
     *
     * @method getYAnchor
     * @returns {Number}
     */
    MusicClefInput.prototype.getYAnchor = function () {
        return this.yAnchor;
    };

    /**
     * Set y anchor
     *
     * @method setYAnchor
     * @param {Number} yAnchor
     */
    MusicClefInput.prototype.setYAnchor = function (yAnchor) {
        this.yAnchor = yAnchor;
    };

    /**
     * Get octave
     *
     * @method getOctave
     * @returns {Number}
     */
    MusicClefInput.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     * Set octave
     *
     * @method setOctave
     * @param {Number} octave
     */
    MusicClefInput.prototype.setOctave = function (octave) {
        this.octave = octave;
    };

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicClefInput.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     *
     * @method setSymbol
     * @param {String} symbol
     */
    MusicClefInput.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    // Export
    scope.MusicClefInput = MusicClefInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Clef input component
     *
     * @class MusicClefInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicClefInputComponent () {
        this.type = 'clef';
    }

    /**
     * Inheritance property
     */
    MusicClefInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicClefInputComponent.prototype.constructor = MusicClefInputComponent;

    /**
     * Get clef input component value
     *
     * @method getValue
     * @returns {MyScript.MusicClefInput}
     */
    MusicClefInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set clef input component value
     *
     * @method setValue
     * @param {MyScript.MusicClefInput} value
     */
    MusicClefInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicClefInputComponent = MusicClefInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music decoration input
     *
     * @class MusicDecorationInput
     * @constructor
     */
    function MusicDecorationInput () {
    }

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicDecorationInput.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     *
     * @method setSymbol
     * @param {String} symbol
     */
    MusicDecorationInput.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicDecorationInput.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     *
     * @method setPlacement
     * @param {String} placement
     */
    MusicDecorationInput.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    // Export
    scope.MusicDecorationInput = MusicDecorationInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Decoration input component
     *
     * @class MusicDecorationInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicDecorationInputComponent () {
        this.type = 'decoration';
    }

    /**
     * Inheritance property
     */
    MusicDecorationInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicDecorationInputComponent.prototype.constructor = MusicDecorationInputComponent;

    /**
     * Get decoration input component value
     *
     * @method getValue
     * @returns {MusicDecorationInput}
     */
    MusicDecorationInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set decoration input component value
     *
     * @method setValue
     * @param {MusicDecorationInput} value
     */
    MusicDecorationInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDecorationInputComponent = MusicDecorationInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Dots input component
     *
     * @class MusicDotsInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicDotsInputComponent () {
        this.type = 'dots';
    }

    /**
     * Inheritance property
     */
    MusicDotsInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicDotsInputComponent.prototype.constructor = MusicDotsInputComponent;

    /**
     * Get dots input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicDotsInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set dots input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicDotsInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDotsInputComponent = MusicDotsInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Head input component
     *
     * @class MusicHeadInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicHeadInputComponent () {
        this.type = 'head';
    }

    /**
     * Inheritance property
     */
    MusicHeadInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicHeadInputComponent.prototype.constructor = MusicHeadInputComponent;

    /**
     * Get head input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicHeadInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set head input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicHeadInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicHeadInputComponent = MusicHeadInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Ledger line input component
     *
     * @class MusicLedgerLineInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicLedgerLineInputComponent () {
        this.type = 'ledgerLine';
    }

    /**
     * Inheritance property
     */
    MusicLedgerLineInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicLedgerLineInputComponent.prototype.constructor = MusicLedgerLineInputComponent;

    // Export
    scope.MusicLedgerLineInputComponent = MusicLedgerLineInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Rest input component
     *
     * @class MusicRestInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicRestInputComponent () {
        this.type = 'rest';
    }

    /**
     * Inheritance property
     */
    MusicRestInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicRestInputComponent.prototype.constructor = MusicRestInputComponent;

    /**
     * Get rest input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicRestInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set rest input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicRestInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicRestInputComponent = MusicRestInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Stem input component
     *
     * @class MusicStemInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicStemInputComponent () {
        this.type = 'stem';
    }

    /**
     * Inheritance property
     */
    MusicStemInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicStemInputComponent.prototype.constructor = MusicStemInputComponent;

    /**
     * Get stem input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicStemInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set stem input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicStemInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicStemInputComponent = MusicStemInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Tie ro slur input component
     *
     * @class MusicTieOrSlurInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicTieOrSlurInputComponent () {
        this.type = 'tieOrSlur';
    }

    /**
     * Inheritance property
     */
    MusicTieOrSlurInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicTieOrSlurInputComponent.prototype.constructor = MusicTieOrSlurInputComponent;

    /**
     * Get tie or slur input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicTieOrSlurInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set tie or slur input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicTieOrSlurInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTieOrSlurInputComponent = MusicTieOrSlurInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Time signature input component
     *
     * @class MusicTimeSignatureInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicTimeSignatureInputComponent () {
        this.type = 'timeSignature';
    }

    /**
     * Inheritance property
     */
    MusicTimeSignatureInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicTimeSignatureInputComponent.prototype.constructor = MusicTimeSignatureInputComponent;

    /**
     * Get time signature input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicTimeSignatureInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set time signature input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicTimeSignatureInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTimeSignatureInputComponent = MusicTimeSignatureInputComponent;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represents a staff used for music recognition
     *
     * @class MusicStaff
     * @constructor
     */
    function MusicStaff () {
    }

    /**
     * Get the count of lines
     *
     * @method getCount
     * @returns {Number}
     */
    MusicStaff.prototype.getCount = function () {
        return this.count;
    };

    /**
     * Set the count of lines
     *
     * @method setCount
     * @param {Number}
     */
    MusicStaff.prototype.setCount = function (count) {
        this.count = count;
    };

    /**
     * Get the spacing from the top
     *
     * @method getTop
     * @returns {Number}
     */
    MusicStaff.prototype.getTop = function () {
        return this.top;
    };

    /**
     * Set the spacing from the top
     *
     * @method setTop
     * @param {Number}
     */
    MusicStaff.prototype.setTop = function (top) {
        this.top = top;
    };

    /**
     * Get the gap between lines
     *
     * @method getGap
     * @returns {Number}
     */
    MusicStaff.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set the gap between lines
     *
     * @method setGap
     * @param {Number}
     */
    MusicStaff.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicStaff = MusicStaff;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Parameters used for music recognition
     *
     * @class MusicParameter
     * @extends AbstractParameter
     * @constructor
     */
    function MusicParameter () {
        this.resultTypes = [];
        this.userResources = [];
    }

    /**
     * Inheritance property
     */
    MusicParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    MusicParameter.prototype.constructor = MusicParameter;

    /**
     * Get the music result types (e.g. MusicXML, ScoreTree)
     *
     * @method getResultTypes
     * @returns {Array}
     */
    MusicParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the music result types (e.g. MusicXML, ScoreTree)
     *
     * @method setResultTypes
     * @param {Array}
     */
    MusicParameter.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MusicParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array}
     */
    MusicParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MusicParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number}
     */
    MusicParameter.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * Get the staff
     *
     * @method getStaff
     * @returns {MyScript.MusicStaff}
     */
    MusicParameter.prototype.getStaff = function () {
        return this.staff;
    };

    /**
     * Set the staff
     *
     * @method setStaff
     * @param {MyScript.MusicStaff}
     */
    MusicParameter.prototype.setStaff = function (staff) {
        this.staff = staff;
    };

    /**
     * Get the number of divisions
     *
     * @method getDivisions
     * @returns {Number}
     */
    MusicParameter.prototype.getDivisions = function () {
        return this.divisions;
    };

    /**
     * Set the number of divisions
     *
     * @method setDivisions
     * @param {Number}
     */
    MusicParameter.prototype.setDivisions = function (divisions) {
        this.divisions = divisions;
    };

    // Export
    scope.MusicParameter = MusicParameter;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition input object for music recognition
     *
     * @class MusicRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function MusicRecognitionInput () {
    }

    /**
     * Inheritance property
     */
    MusicRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    MusicRecognitionInput.prototype.constructor = MusicRecognitionInput;

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    MusicRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    MusicRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get the result types
     *
     * @method getResultTypes
     * @returns {Array}
     */
    MusicRecognitionInput.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the result types
     *
     * @method setResultTypes
     * @param {Array} resultTypes
     */
    MusicRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MusicRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    MusicRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MusicRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number} scratchOutDetectionSensitivity
     */
    MusicRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * Get the staff
     *
     * @method getStaff
     * @returns {MusicStaff}
     */
    MusicRecognitionInput.prototype.getStaff = function () {
        return this.staff;
    };

    /**
     * Set the staff
     *
     * @method setStaff
     * @param {MusicStaff} staff
     */
    MusicRecognitionInput.prototype.setStaff = function (staff) {
        this.staff = staff;
    };

    /**
     * Get the number of divisions
     *
     * @method getDivisions
     * @returns {Number}
     */
    MusicRecognitionInput.prototype.getDivisions = function () {
        return this.divisions;
    };

    /**
     * Set the number of divisions
     *
     * @method setDivisions
     * @param {Number} divisions
     */
    MusicRecognitionInput.prototype.setDivisions = function (divisions) {
        this.divisions = divisions;
    };

    // Export
    scope.MusicRecognitionInput = MusicRecognitionInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition data for music input
     *
     * @class MusicRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MusicRecognitionData () {
    }

    /**
     * Inheritance property
     */
    MusicRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    MusicRecognitionData.prototype.constructor = MusicRecognitionData;

    /**
     * Get music input
     *
     * @method getMusicRecognitionInput
     * @returns {MyScript.MusicRecognitionInput}
     */
    MusicRecognitionData.prototype.getMusicRecognitionInput = function () {
        return this.musicInput;
    };

    /**
     * Set music input
     *
     * @method setMusicRecognitionInput
     * @param {MyScript.MusicRecognitionInput} input
     */
    MusicRecognitionData.prototype.setMusicRecognitionInput = function (input) {
        this.musicInput = JSON.stringify(input);
    };

    // Export
    scope.MusicRecognitionData = MusicRecognitionData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Parameters used for analyzer recognition
     *
     * @class AnalyzerParameter
     * @extends AbstractParameter
     * @constructor
     */
    function AnalyzerParameter () {
    }

    /**
     * Inheritance property
     */
    AnalyzerParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    AnalyzerParameter.prototype.constructor = AnalyzerParameter;

    /**
     * Get text recognition parameters
     *
     * @method getTextParameters
     * @returns {TextParameter}
     */
    AnalyzerParameter.prototype.getTextParameters = function () {
        return this.textParameter;
    };

    /**
     * Set text recognition parameters
     *
     * @method setTextParameters
     * @param {TextParameter} parameters
     */
    AnalyzerParameter.prototype.setTextParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get analyzer coordinate resolution
     *
     * @method getCoordinateResolution
     * @returns {Number}
     */
    AnalyzerParameter.prototype.getCoordinateResolution = function () {
        return this.coordinateResolution;
    };

    /**
     * Set analyzer coordinate resolution
     *
     * @method setCoordinateResolution
     * @param {Number} coordinateResolution
     */
    AnalyzerParameter.prototype.setCoordinateResolution = function (coordinateResolution) {
        this.coordinateResolution = coordinateResolution;
    };

    // Export
    scope.AnalyzerParameter = AnalyzerParameter;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition input object for analyzer recognition
     *
     * @class AnalyzerRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function AnalyzerRecognitionInput () {

    }

    /**
     * Inheritance property
     */
    AnalyzerRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    AnalyzerRecognitionInput.prototype.constructor = AnalyzerRecognitionInput;

    /**
     * Get analyzer recognition parameters
     *
     * @method getParameters
     * @returns {AnalyzerParameter}
     */
    AnalyzerRecognitionInput.prototype.getParameters = function () {
        return this.parameter;
    };

    /**
     * Set analyzer recognition parameters
     *
     * @method setParameters
     * @param {AnalyzerParameter} parameters
     */
    AnalyzerRecognitionInput.prototype.setParameters = function (parameters) {
        this.parameter = parameters;
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    AnalyzerRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    AnalyzerRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.AnalyzerRecognitionInput = AnalyzerRecognitionInput;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Recognition data for analyzer input
     *
     * @class AnalyzerRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function AnalyzerRecognitionData () {
    }

    /**
     * Inheritance property
     */
    AnalyzerRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    AnalyzerRecognitionData.prototype.constructor = AnalyzerRecognitionData;

    /**
     * Get analyzer input
     *
     * @method getAnalyzerRecognitionInput
     * @returns {MyScript.AnalyzerRecognitionInput}
     */
    AnalyzerRecognitionData.prototype.getAnalyzerRecognitionInput = function () {
        return this.analyzerInput;
    };

    /**
     * Set analyzer input
     *
     * @method setAnalyzerRecognitionInput
     * @param {MyScript.AnalyzerRecognitionInput} input
     */
    AnalyzerRecognitionData.prototype.setAnalyzerRecognitionInput = function (input) {
        this.analyzerInput = JSON.stringify(input);
    };

    // Export
    scope.AnalyzerRecognitionData = AnalyzerRecognitionData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract result
     *
     * @class AbstractResult
     * @param {Object} obj
     * @constructor
     */
    function AbstractResult (obj) {
        if (obj) {
            this.instanceId = obj.instanceId;
        }
    }

    /**
     * Get instance id
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    // Export
    scope.AbstractResult = AbstractResult;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text candidate
     *
     * @class TextCandidate
     * @param {Object} obj
     * @constructor
     */
    function TextCandidate (obj) {
        this.children = [];
        this.flags = [];
        if (obj) {
            this.label = obj.label;
            this.normalizedScore = obj.normalizedScore;
            this.spellingDistortionRatio = obj.spellingDistortionRatio;
            for (var i in obj.children) {
                this.children.push(new scope.TextSegment(obj.children[i]));
            }
            for (var j in obj.flags) {
                this.flags.push(obj.flags[j]);
            }
        }
    }

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    TextCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get normalized score
     *
     * @method getNormalizedScore
     * @returns {Number}
     */
    TextCandidate.prototype.getNormalizedScore = function () {
        return this.normalizedScore;
    };

    /**
     * Get resemblance score
     *
     * @method getResemblanceScore
     * @returns {Number}
     */
    TextCandidate.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    /**
     * Get spelling distortion ratio
     *
     * @method getSpellingDistortionRatio
     * @returns {Number}
     */
    TextCandidate.prototype.getSpellingDistortionRatio = function () {
        return this.spellingDistortionRatio;
    };

    /**
     * Get children
     *
     * @method getChildren
     * @returns {Array}
     */
    TextCandidate.prototype.getChildren = function () {
        return this.children;
    };

    /**
     * Get flags
     *
     * @method getFlags
     * @returns {Array}
     */
    TextCandidate.prototype.getFlags = function () {
        return this.flags;
    };

    // Export
    scope.TextCandidate = TextCandidate;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text document
     *
     * @class TextDocument
     * @param {Object} obj
     * @constructor
     */
    function TextDocument (obj) {
        this.tagItems = [];
        this.wordCandidates = [];
        this.charCandidates = [];
        if (obj) {
            this.textSegmentResult = new scope.TextSegmentResult(obj.textSegmentResult);
            for (var i in obj.tagItems) {
                this.tagItems.push(new scope.TextTagItem(obj.tagItems[i]));
            }
            for (var j in obj.wordCandidates) {
                this.wordCandidates.push(new scope.TextSegment(obj.wordCandidates[j]));
            }
            for (var k in obj.charCandidates) {
                this.charCandidates.push(new scope.TextSegment(obj.charCandidates[k]));
            }
        }
    }

    /**
     * Get tag items
     *
     * @method getTagItems
     * @returns {MyScript.TextTagItem[]}
     */
    TextDocument.prototype.getTagItems = function () {
        return this.tagItems;
    };

    /**
     * Get word candidates
     *
     * @method getWordCandidates
     * @returns {Array}
     */
    TextDocument.prototype.getWordCandidates = function () {
        return this.wordCandidates;
    };

    /**
     * Get char candidates
     *
     * @method getCharCandidates
     * @returns {Array}
     */
    TextDocument.prototype.getCharCandidates = function () {
        return this.charCandidates;
    };

    /**
     * Get text segment result
     *
     * @method getTextSegmentResult
     * @returns {MyScript.TextSegmentResult}
     */
    TextDocument.prototype.getTextSegmentResult = function () {
        return this.textSegmentResult;
    };

    // Export
    scope.TextDocument = TextDocument;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text result
     *
     * @class TextResult
     * @extends AbstractResult
     * @param {Object} obj
     * @constructor
     */
    function TextResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.TextDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    TextResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    TextResult.prototype.constructor = TextResult;

    /**
     * Get text document
     *
     * @method getTextDocument
     * @returns {MyScript.TextDocument}
     */
    TextResult.prototype.getTextDocument = function () {
        return this.result;
    };

    // Export
    scope.TextResult = TextResult;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text segment
     *
     * @class TextSegment
     * @param {Object} obj
     * @constructor
     */
    function TextSegment (obj) {
        this.candidates = [];
        if (obj) {
            this.inkRanges = obj.inkRanges;
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextCandidate(obj.candidates[i]));
            }
        }
    }

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MyScript.TextCandidate[]}
     */
    TextSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {String}
     */
    TextSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextSegment = TextSegment;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text segment result
     *
     * @class TextSegmentResult
     * @extends TextSegment
     * @param {Object} obj
     * @constructor
     */
    function TextSegmentResult (obj) {
        scope.TextSegment.call(this, obj);
        if (obj) {
            this.selectedCandidateIdx = obj.selectedCandidateIdx;
        }
    }

    /**
     * Inheritance property
     */
    TextSegmentResult.prototype = new scope.TextSegment();

    /**
     * Constructor property
     */
    TextSegmentResult.prototype.constructor = TextSegmentResult;

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    TextSegmentResult.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidateIdx;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MyScript.TextCandidate}
     */
    TextSegmentResult.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidateIdx];
    };

    // Export
    scope.TextSegmentResult = TextSegmentResult;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text tag item
     *
     * @class TextTagItem
     * @param {Object} obj
     * @constructor
     */
    function TextTagItem (obj) {
        if (obj) {
            this.tagType = obj.tagType;
            this.inkRanges = obj.inkRanges;
        }
    }

    /**
     * Get tag type
     *
     * @method getTagType
     * @returns {String}
     */
    TextTagItem.prototype.getTagType = function () {
        return this.tagType;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {String}
     */
    TextTagItem.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextTagItem = TextTagItem;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract shape primitive
     *
     * @class AbstractShapePrimitive
     * @param {Object} obj
     * @constructor
     */
    function AbstractShapePrimitive (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AbstractShapePrimitive.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is line
     *
     * @method isLine
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.isLine = function () {
        return this.type === 'line';
    };

    /**
     * Is ellipse
     *
     * @method isEllipse
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.isEllipse = function () {
        return this.type === 'ellipse';
    };

    // Export
    scope.AbstractShapePrimitive = AbstractShapePrimitive;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract decorated shape
     *
     * @class AbstractDecoratedShape
     * @extends AbstractShapePrimitive
     * @param {Object} obj
     * @constructor
     */
    function AbstractDecoratedShape (obj) {
        scope.AbstractShapePrimitive.call(this, obj);
        if (obj) {
            this.beginDecoration = obj.beginDecoration;
            this.beginTangentAngle = obj.beginTangentAngle;
            this.endDecoration = obj.endDecoration;
            this.endTangentAngle = obj.endTangentAngle;
        }
    }

    /**
     * Inheritance property
     */
    AbstractDecoratedShape.prototype = new scope.AbstractShapePrimitive();

    /**
     * Constructor property
     */
    AbstractDecoratedShape.prototype.constructor = AbstractDecoratedShape;

    /**
     * Has begin decoration
     *
     * @method hasBeginDecoration
     * @returns {Boolean}
     */
    AbstractDecoratedShape.prototype.hasBeginDecoration = function () {
        return typeof this.beginDecoration !== 'undefined';
    };

    /**
     * Has end decoration
     *
     * @method hasEndDecoration
     * @returns {Boolean}
     */
    AbstractDecoratedShape.prototype.hasEndDecoration = function () {
        return typeof this.endDecoration !== 'undefined';
    };

    /**
     * Get begin decoration
     *
     * @method getBeginDecoration
     * @returns {String}
     */
    AbstractDecoratedShape.prototype.getBeginDecoration = function () {
        return this.beginDecoration;
    };

    /**
     * Get end decoration
     *
     * @method getEndDecoration
     * @returns {String}
     */
    AbstractDecoratedShape.prototype.getEndDecoration = function () {
        return this.endDecoration;
    };

    /**
     * Get begin tangent angle
     *
     * @method getBeginTangentAngle
     * @returns {Number}
     */
    AbstractDecoratedShape.prototype.getBeginTangentAngle = function () {
        return this.beginTangentAngle;
    };

    /**
     * Get end tangent angle
     *
     * @method getEndTangentAngle
     * @returns {Number}
     */
    AbstractDecoratedShape.prototype.getEndTangentAngle = function () {
        return this.endTangentAngle;
    };

    // Export
    scope.AbstractDecoratedShape = AbstractDecoratedShape;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape candidate
     *
     * @class ShapeCandidate
     * @param {Object} obj
     * @constructor
     */
    function ShapeCandidate (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    ShapeCandidate.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is erased
     *
     * @method isErased
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isErased = function () {
        return this.type === 'erased';
    };

    /**
     * Is scratch-out
     *
     * @method isScratchOut
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isScratchOut = function () {
        return this.type === 'scratchOut';
    };

    /**
     * Is not recognized
     *
     * @method isNotRecognized
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isNotRecognized = function () {
        return this.type === 'notRecognized';
    };

    /**
     * Is recognized
     *
     * @method isRecognized
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isRecognized = function () {
        return this.type === 'recognizedShape';
    };

    // Export
    scope.ShapeCandidate = ShapeCandidate;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape document
     *
     * @class ShapeDocument
     * @param {Object} obj
     * @constructor
     */
    function ShapeDocument (obj) {
        this.segments = [];
        if (obj) {
            for (var i in obj.segments) {
                this.segments.push(new scope.ShapeSegment(obj.segments[i]));
            }
        }
    }

    /**
     * Get segments
     *
     * @method getSegments
     * @returns {MyScript.ShapeSegment[]}
     */
    ShapeDocument.prototype.getSegments = function () {
        return this.segments;
    };

    // Export
    scope.ShapeDocument = ShapeDocument;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape ellipse
     *
     * @class ShapeEllipse
     * @extends AbstractDecoratedShape
     * @param {Object} obj
     * @constructor
     */
    function ShapeEllipse (obj) {
        scope.AbstractDecoratedShape.call(this, obj);
        if (obj) {
            this.center = new scope.ShapePoint(obj.center);
            this.minRadius = obj.minRadius;
            this.maxRadius = obj.maxRadius;
            this.orientation = obj.orientation;
            this.startAngle = obj.startAngle;
            this.sweepAngle = obj.sweepAngle;
        }
    }

    /**
     * Inheritance property
     */
    ShapeEllipse.prototype = new scope.AbstractDecoratedShape();

    /**
     * Constructor property
     */
    ShapeEllipse.prototype.constructor = ShapeEllipse;

    /**
     * Get center
     *
     * @method getCenter
     * @returns {MyScript.ShapePoint}
     */
    ShapeEllipse.prototype.getCenter = function () {
        return this.center;
    };

    /**
     * Get min radius
     *
     * @method getMinRadius
     * @returns {Number}
     */
    ShapeEllipse.prototype.getMinRadius = function () {
        return this.minRadius;
    };

    /**
     * Get max radius
     *
     * @method getMaxRadius
     * @returns {Number}
     */
    ShapeEllipse.prototype.getMaxRadius = function () {
        return this.maxRadius;
    };

    /**
     * Get orientation
     *
     * @method getOrientation
     * @returns {String}
     */
    ShapeEllipse.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * Get start angle
     *
     * @method getStartAngle
     * @returns {Number}
     */
    ShapeEllipse.prototype.getStartAngle = function () {
        return this.startAngle;
    };

    /**
     * Get sweep angle
     *
     * @method getSweepAngle
     * @returns {Number}
     */
    ShapeEllipse.prototype.getSweepAngle = function () {
        return this.sweepAngle;
    };

    // Export
    scope.ShapeEllipse = ShapeEllipse;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape erased
     *
     * @class ShapeErased
     * @extends ShapeCandidate
     * @param {Object} obj
     * @constructor
     */
    function ShapeErased (obj) {
        scope.ShapeCandidate.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ShapeErased.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeErased.prototype.constructor = ShapeErased;

    // Export
    scope.ShapeErased = ShapeErased;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape ink range
     *
     * @class ShapeInkRange
     * @param {Object} obj
     * @constructor
     */
    function ShapeInkRange (obj) {
        if (obj) {
            this.firstStroke = obj.firstStroke;
            this.lastStroke = obj.lastStroke;
            this.firstPoint = obj.firstPoint;
            this.lastPoint = obj.lastPoint;
        }
    }

    /**
     * Get first stroke
     *
     * @method getFirstStroke
     * @returns {Number}
     */
    ShapeInkRange.prototype.getFirstStroke = function () {
        return this.firstStroke;
    };

    /**
     * Get last stroke
     *
     * @method getLastStroke
     * @returns {Number}
     */
    ShapeInkRange.prototype.getLastStroke = function () {
        return this.lastStroke;
    };

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {MyScript.ShapePoint}
     */
    ShapeInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {MyScript.ShapePoint}
     */
    ShapeInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    // Export
    scope.ShapeInkRange = ShapeInkRange;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape line
     *
     * @class ShapeLine
     * @extends AbstractDecoratedShape
     * @param {Object} obj
     * @constructor
     */
    function ShapeLine (obj) {
        scope.AbstractDecoratedShape.call(this, obj);
        if (obj) {
            this.firstPoint = new scope.ShapePoint(obj.firstPoint);
            this.lastPoint = new scope.ShapePoint(obj.lastPoint);
        }
    }

    /**
     * Inheritance property
     */
    ShapeLine.prototype = new scope.AbstractDecoratedShape();

    /**
     * Constructor property
     */
    ShapeLine.prototype.constructor = ShapeLine;

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {ShapePoint}
     */
    ShapeLine.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {ShapePoint}
     */
    ShapeLine.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    // Export
    scope.ShapeLine = ShapeLine;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape not recognized
     *
     * @class ShapeNotRecognized
     * @extends ShapeCandidate
     * @param {Object} obj
     * @constructor
     */
    function ShapeNotRecognized (obj) {
        scope.ShapeCandidate.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ShapeNotRecognized.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeNotRecognized.prototype.constructor = ShapeNotRecognized;

    // Export
    scope.ShapeNotRecognized = ShapeNotRecognized;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape point
     *
     * @class ShapePoint
     * @extends Point
     * @param {Object} obj
     * @constructor
     */
    function ShapePoint (obj) {
        scope.Point.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ShapePoint.prototype = new scope.Point();

    /**
     * Constructor property
     */
    ShapePoint.prototype.constructor = ShapePoint;

    // Export
    scope.ShapePoint = ShapePoint;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape recognized
     *
     * @class ShapeRecognized
     * @extends ShapeCandidate
     * @param {Object} obj
     * @constructor
     */
    function ShapeRecognized (obj) {
        scope.ShapeCandidate.call(this, obj);
        this.primitives = [];
        if (obj) {
            this.label = obj.label;
            this.normalizedRecognitionScore = obj.normalizedRecognitionScore;
            this.resemblanceScore = obj.resemblanceScore;
            for (var i in obj.primitives) {
                var primitive;
                switch (obj.primitives[i].type) {
                    case 'line':
                        primitive = new scope.ShapeLine(obj.primitives[i]);
                        break;
                    case 'ellipse':
                        primitive = new scope.ShapeEllipse(obj.primitives[i]);
                        break;
                }
                this.primitives.push(primitive);
            }
        }
    }

    /**
     * Inheritance property
     */
    ShapeRecognized.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeRecognized.prototype.constructor = ShapeRecognized;

    /**
     * Get primitives
     *
     * @method getPrimitives
     * @returns {MyScript.AbstractDecoratedShape[]}
     */
    ShapeRecognized.prototype.getPrimitives = function () {
        return this.primitives;
    };

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    ShapeRecognized.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get normalized score
     *
     * @method getNormalizedRecognitionScore
     * @returns {Number}
     */
    ShapeRecognized.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    /**
     * Get resemblance score
     *
     * @method getResemblanceScore
     * @returns {Number}
     */
    ShapeRecognized.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    // Export
    scope.ShapeRecognized = ShapeRecognized;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape result
     *
     * @class ShapeResult
     * @extends AbstractResult
     * @param {Object} obj
     * @constructor
     */
    function ShapeResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.ShapeDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    ShapeResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    ShapeResult.prototype.constructor = ShapeResult;

    /**
     * Get shape document
     *
     * @method getShapeDocument
     * @returns {MyScript.ShapeDocument}
     */
    ShapeResult.prototype.getShapeDocument = function () {
        return this.result;
    };

    // Export
    scope.ShapeResult = ShapeResult;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape scratch-out
     *
     * @class ShapeScratchOut
     * @extends ShapeCandidate
     * @param {Object} obj
     * @constructor
     */
    function ShapeScratchOut (obj) {
        scope.ShapeCandidate.call(this, obj);
        this.inkRanges = [];
        if (obj) {
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.ShapeInkRange(obj.inkRanges[j]));
            }
        }
    }

    /**
     * Inheritance property
     */
    ShapeScratchOut.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeScratchOut.prototype.constructor = ShapeScratchOut;

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MyScript.ShapeInkRange[]}
     */
    ShapeScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.ShapeScratchOut = ShapeScratchOut;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape segment
     *
     * @class ShapeSegment
     * @param {Object} obj
     * @constructor
     */
    function ShapeSegment (obj) {
        this.inkRanges = [];
        this.candidates = [];
        if (obj) {
            this.elementType = obj.elementType;
            this.uniqueID = obj.uniqueID;
            this.selectedCandidateIndex = obj.selectedCandidateIndex;
            for (var i in obj.candidates) {
                var candidate;
                switch (obj.candidates[i].type) {
                    case 'erased':
                        candidate = new scope.ShapeErased(obj.candidates[i]);
                        break;
                    case 'scratchOut':
                        candidate = new scope.ShapeScratchOut(obj.candidates[i]);
                        break;
                    case 'recognizedShape':
                        candidate = new scope.ShapeRecognized(obj.candidates[i]);
                        break;
                    default:
                        candidate = new scope.ShapeNotRecognized(obj.candidates[i]);
                        break;
                }
                this.candidates.push(candidate);
            }
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.ShapeInkRange(obj.inkRanges[j]));
            }
        }
    }

    /**
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    ShapeSegment.prototype.getElementType = function () {
        return this.elementType;
    };

    /**
     * Get unique id
     *
     * @method getUniqueId
     * @returns {String}
     */
    ShapeSegment.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MyScript.ShapeInkRange[]}
     */
    ShapeSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIndex
     * @returns {Number}
     */
    ShapeSegment.prototype.getSelectedCandidateIndex = function () {
        return this.selectedCandidateIndex;
    };

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MyScript.ShapeCandidate[]}
     */
    ShapeSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MyScript.ShapeCandidate}
     */
    ShapeSegment.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidateIndex];
    };

    // Export
    scope.ShapeSegment = ShapeSegment;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math node
     *
     * @class MathNode
     * @param {Object} obj
     * @constructor
     */
    function MathNode (obj) {
        if (obj) {
            this.name = obj.name;
            this.type = obj.type;
        }
    }

    /**
     * Get name
     *
     * @method getName
     * @returns {String}
     */
    MathNode.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MathNode.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MathNode = MathNode;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math non-terminal node
     *
     * @class MathNonTerminalNode
     * @extends MathNode
     * @param {Object} obj
     * @constructor
     */
    function MathNonTerminalNode (obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        if (obj) {
            this.selectedCandidate = obj.selectedCandidate;
            for (var i in obj.candidates) {
                switch (obj.candidates[i].type) {
                    case 'nonTerminalNode':
                        switch (obj.candidates[i].name) {
                            case 'term':
                                this.candidates.push(new scope.MathTermNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'sqrtTerm':
                                this.candidates.push(new scope.MathSqrtNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'vectorTerm':
                                this.candidates.push(new scope.MathVectorNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'system':
                                this.candidates.push(new scope.MathSystemNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'exponentiable':
                                this.candidates.push(new scope.MathExponentiableNonTerminalNode(obj.candidates[i]));
                                break;
                            case 'expression':
                                this.candidates.push(new scope.MathExpressionNonTerminalNode(obj.candidates[i]));
                                break;
                        }
                        this.candidates.push(new scope.MathNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'terminalNode':
                        this.candidates.push(new scope.MathTerminalNode(obj.candidates[i]));
                        break;
                    case 'rule':
                        switch (obj.candidates[i].name) {
                            case 'identity':
                                this.candidates.push(new scope.MathIdentityRuleNode(obj.candidates[i]));
                                break;
                            case 'horizontal pair':
                                this.candidates.push(new scope.MathHorizontalPairRuleNode(obj.candidates[i]));
                                break;
                            case 'fence':
                                this.candidates.push(new scope.MathFenceRuleNode(obj.candidates[i]));
                                break;
                            case 'fraction':
                                this.candidates.push(new scope.MathFractionRuleNode(obj.candidates[i]));
                                break;
                            case 'sqrt':
                                this.candidates.push(new scope.MathSqrtRuleNode(obj.candidates[i]));
                                break;
                            case 'subscript':
                                this.candidates.push(new scope.MathSubscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'superscript':
                                this.candidates.push(new scope.MathSuperscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'subsuperscript':
                                this.candidates.push(new scope.MathSubSuperscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'underscript':
                                this.candidates.push(new scope.MathUnderscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'overscript':
                                this.candidates.push(new scope.MathOverscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'underoverscript':
                                this.candidates.push(new scope.MathUnderOverscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'presuperscript':
                                this.candidates.push(new scope.MathPreSuperscriptRuleNode(obj.candidates[i]));
                                break;
                            case 'vertical pair':
                                this.candidates.push(new scope.MathVerticalPairRuleNode(obj.candidates[i]));
                                break;
                            case 'left fence':
                                this.candidates.push(new scope.MathLeftFenceRuleNode(obj.candidates[i]));
                                break;
                        }
                        break;
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    MathNonTerminalNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathNonTerminalNode.prototype.constructor = MathNonTerminalNode;

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MyScript.MathNode[]}
     */
    MathNonTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    MathNonTerminalNode.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidate;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MyScript.MathNode}
     */
    MathNonTerminalNode.prototype.getSelectedCandidate = function () {
        return this.candidates[this.selectedCandidate];
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {MyScript.Rectangle}
     */
    MathNonTerminalNode.prototype.getBoundingBox = function () {
        return this.getSelectedCandidate() ? this.getSelectedCandidate().getBoundingBox() : undefined;
    };

    // Export
    scope.MathNonTerminalNode = MathNonTerminalNode;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract math result
     *
     * @class MathResultElement
     * @param {Object} obj
     * @constructor
     */
    function MathResultElement (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MathResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is LaTeX result
     *
     * @method isLatex
     * @returns {Boolean}
     */
    MathResultElement.prototype.isLaTex = function () {
        return this.type === 'LATEX';
    };

    /**
     * Is MathML result
     *
     * @method isMathMl
     * @returns {Boolean}
     */
    MathResultElement.prototype.isMathMl = function () {
        return this.type === 'MATHML';
    };

    /**
     * Is SymbolTree result
     *
     * @method isSymbolTree
     * @returns {Boolean}
     */
    MathResultElement.prototype.isSymbolTree = function () {
        return this.type === 'SYMBOLTREE';
    };

    // Export
    scope.MathResultElement = MathResultElement;
})(MyScript);
(function (scope) {
	'use strict';
	/**
	 * Math rule node
	 *
	 * @class MathRuleNode
	 * @extends MathNode
	 * @param {Object} obj
	 * @constructor
	 */
	function MathRuleNode (obj) {
		scope.MathNode.call(this, obj);
		this.children = [];
		if (obj) {
			this.name = obj.name;
			for (var i in obj.children) {
				switch (obj.children[i].type) {
					case 'nonTerminalNode':
						switch (obj.children[i].name) {
							case 'term':
								this.children.push(new scope.MathTermNonTerminalNode(obj.children[i]));
								break;
							case 'sqrtTerm':
								this.children.push(new scope.MathSqrtNonTerminalNode(obj.children[i]));
								break;
							case 'vectorTerm':
								this.children.push(new scope.MathVectorNonTerminalNode(obj.children[i]));
								break;
							case 'system':
								this.children.push(new scope.MathSystemNonTerminalNode(obj.children[i]));
								break;
							case 'exponentiable':
								this.children.push(new scope.MathExponentiableNonTerminalNode(obj.children[i]));
								break;
							case 'expression':
								this.children.push(new scope.MathExpressionNonTerminalNode(obj.children[i]));
								break;
						}
						break;
					case 'terminalNode':
						this.children.push(new scope.MathTerminalNode(obj.children[i]));
						break;
					case 'rule':
						switch (obj.children[i].name) {
							case 'identity':
								this.children.push(new scope.MathIdentityRuleNode(obj.children[i]));
								break;
							case 'horizontal pair':
								this.children.push(new scope.MathHorizontalPairRuleNode(obj.children[i]));
								break;
							case 'fence':
								this.children.push(new scope.MathFenceRuleNode(obj.children[i]));
								break;
							case 'fraction':
								this.children.push(new scope.MathFractionRuleNode(obj.children[i]));
								break;
							case 'sqrt':
								this.children.push(new scope.MathSqrtRuleNode(obj.children[i]));
								break;
							case 'subscript':
								this.children.push(new scope.MathSubscriptRuleNode(obj.children[i]));
								break;
							case 'superscript':
								this.children.push(new scope.MathSuperscriptRuleNode(obj.children[i]));
								break;
							case 'subsuperscript':
								this.children.push(new scope.MathSubSuperscriptRuleNode(obj.children[i]));
								break;
							case 'underscript':
								this.children.push(new scope.MathUnderscriptRuleNode(obj.children[i]));
								break;
							case 'overscript':
								this.children.push(new scope.MathOverscriptRuleNode(obj.children[i]));
								break;
							case 'underoverscript':
								this.children.push(new scope.MathUnderOverscriptRuleNode(obj.children[i]));
								break;
							case 'presuperscript':
								this.children.push(new scope.MathPreSuperscriptRuleNode(obj.children[i]));
								break;
							case 'vertical pair':
								this.children.push(new scope.MathVerticalPairRuleNode(obj.children[i]));
								break;
							case 'left fence':
								this.children.push(new scope.MathLeftFenceRuleNode(obj.children[i]));
								break;
						}
						break;
				}
			}
		}
	}

	/**
	 * Inheritance property
	 */
	MathRuleNode.prototype = new scope.MathNode();

	/**
	 * Constructor property
	 */
	MathRuleNode.prototype.constructor = MathRuleNode;

	/**
	 * Get name
	 *
	 * @method getName
	 * @returns {String}
	 */
	MathRuleNode.prototype.getName = function () {
		return this.name;
	};

	/**
	 * Get children
	 *
	 * @method getChildren
	 * @returns {MyScript.MathNode[]}
	 */
	MathRuleNode.prototype.getChildren = function () {
		return this.children;
	};

	// Export
	scope.MathRuleNode = MathRuleNode;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math document
     *
     * @class MathDocument
     * @param {Object} obj
     * @constructor
     */
    function MathDocument (obj) {
        this.results = [];
        this.scratchOutResults = [];
        if (obj) {
            for (var i in obj.results) {
                switch (obj.results[i].type) {
                    case 'MATHML':
                        this.results.push(new scope.MathMathMLResultElement(obj.results[i]));
                        break;
                    case 'LATEX':
                        this.results.push(new scope.MathLaTexResultElement(obj.results[i]));
                        break;
                    default:
                        this.results.push(new scope.MathSymbolTreeResultElement(obj.results[i]));
                        break;
                }
            }
            for (var j in obj.scratchOutResults) {
                this.scratchOutResults.push(new scope.MathScratchOut(obj.scratchOutResults[j]));
            }
        }
    }

    /**
     * Get result elements
     *
     * @method getResultElements
     * @returns {MyScript.MathResultElement[]}
     */
    MathDocument.prototype.getResultElements = function () {
        return this.results;
    };

    /**
     * Get scratch-out results
     *
     * @method getScratchOutResults
     * @returns {MathScratchOut[]}
     */
    MathDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    // Export
    scope.MathDocument = MathDocument;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math ink range
     *
     * @class MathInkRange
     * @param {Object} obj
     * @constructor
     */
    function MathInkRange (obj) {
        if (obj) {
            this.component = obj.component;
            this.firstItem = obj.firstItem;
            this.lastItem = obj.lastItem;
        }
    }

    /**
     * Get component
     *
     * @method getComponent
     * @returns {Number}
     */
    MathInkRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     * Get first item
     *
     * @method getFirstItem
     * @returns {Number}
     */
    MathInkRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     * Get last item
     *
     * @method getLastItem
     * @returns {Number}
     */
    MathInkRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MathInkRange = MathInkRange;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * LaTex result element
     *
     * @class MathLaTexResultElement
     * @extends MathResultElement
     * @param {Object} obj
     * @constructor
     */
    function MathLaTexResultElement (obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MathLaTexResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathLaTexResultElement.prototype.constructor = MathLaTexResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MathLaTexResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathLaTexResultElement = MathLaTexResultElement;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * MathML result element
     *
     * @class MathMathMLResultElement
     * @extends MathResultElement
     * @param {Object} obj
     * @constructor
     */
    function MathMathMLResultElement (obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MathMathMLResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathMathMLResultElement.prototype.constructor = MathMathMLResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MathMathMLResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathMathMLResultElement = MathMathMLResultElement;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math result
     *
     * @class MathResult
     * @extends AbstractResult
     * @param {Object} obj
     * @constructor
     */
    function MathResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.MathDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    MathResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    MathResult.prototype.constructor = MathResult;

    /**
     * Get math document
     *
     * @method getMathDocument
     * @returns {MyScript.MathDocument}
     */
    MathResult.prototype.getMathDocument = function () {
        return this.result;
    };

    // Export
    scope.MathResult = MathResult;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math scratch-out
     *
     * @class MathScratchOut
     * @param {Object} obj
     * @constructor
     */
    function MathScratchOut (obj) {
        this.inkRanges = [];
        this.erasedInkRanges = [];
        if (obj) {
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.MathInkRange(obj.inkRanges[i]));
            }
            for (var j in obj.erasedInkRanges) {
                this.erasedInkRanges.push(new scope.MathInkRange(obj.erasedInkRanges[j]));
            }
        }
    }

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MyScript.MathInkRange[]}
     */
    MathScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get erased ink ranges
     *
     * @method getErasedInkRanges
     * @returns {MyScript.MathInkRange[]}
     */
    MathScratchOut.prototype.getErasedInkRanges = function () {
        return this.erasedInkRanges;
    };

    // Export
    scope.MathScratchOut = MathScratchOut;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math symbol tree
     *
     * @class MathSymbolTreeResultElement
     * @extends MathResultElement
     * @param {Object} obj
     * @constructor
     */
    function MathSymbolTreeResultElement (obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            switch (obj.root.type) {
                case 'nonTerminalNode':
                    switch (obj.root.name) {
                        case 'term':
                            this.root = new scope.MathTermNonTerminalNode(obj.root);
                            break;
                        case 'sqrtTerm':
                            this.root = new scope.MathSqrtNonTerminalNode(obj.root);
                            break;
                        case 'vectorTerm':
                            this.root = new scope.MathVectorNonTerminalNode(obj.root);
                            break;
                        case 'system':
                            this.root = new scope.MathSystemNonTerminalNode(obj.root);
                            break;
                        case 'exponentiable':
                            this.root = new scope.MathExponentiableNonTerminalNode(obj.root);
                            break;
                        case 'expression':
                            this.root = new scope.MathExpressionNonTerminalNode(obj.root);
                            break;
                    }
                    break;
                case 'terminalNode':
                    this.root = new scope.MathTerminalNode(obj.root);
                    break;
                case 'rule':
                    switch (obj.root.name) {
                        case 'identity':
                            this.root = new scope.MathIdentityRuleNode(obj.root);
                            break;
                        case 'horizontal pair':
                            this.root = new scope.MathHorizontalPairRuleNode(obj.root);
                            break;
                        case 'fence':
                            this.root = new scope.MathFenceRuleNode(obj.root);
                            break;
                        case 'fraction':
                            this.root = new scope.MathFractionRuleNode(obj.root);
                            break;
                        case 'sqrt':
                            this.root = new scope.MathSqrtRuleNode(obj.root);
                            break;
                        case 'subscript':
                            this.root = new scope.MathSubscriptRuleNode(obj.root);
                            break;
                        case 'superscript':
                            this.root = new scope.MathSuperscriptRuleNode(obj.root);
                            break;
                        case 'subsuperscript':
                            this.root = new scope.MathSubSuperscriptRuleNode(obj.root);
                            break;
                        case 'underscript':
                            this.root = new scope.MathUnderscriptRuleNode(obj.root);
                            break;
                        case 'overscript':
                            this.root = new scope.MathOverscriptRuleNode(obj.root);
                            break;
                        case 'underoverscript':
                            this.root = new scope.MathUnderOverscriptRuleNode(obj.root);
                            break;
                        case 'presuperscript':
                            this.root = new scope.MathPreSuperscriptRuleNode(obj.root);
                            break;
                        case 'vertical pair':
                            this.root = new scope.MathVerticalPairRuleNode(obj.root);
                            break;
                        case 'left fence':
                            this.root = new scope.MathLeftFenceRuleNode(obj.root);
                            break;
                    }
                    break;
            }
            this.value = JSON.stringify(obj.root, null, '  ');
        }
    }

    /**
     * Inheritance property
     */
    MathSymbolTreeResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathSymbolTreeResultElement.prototype.constructor = MathSymbolTreeResultElement;

    /**
     * Get tree root
     *
     * @method getRoot
     * @returns {MyScript.MathNode}
     */
    MathSymbolTreeResultElement.prototype.getRoot = function () {
        return this.root;
    };

    // Export
    scope.MathSymbolTreeResultElement = MathSymbolTreeResultElement;
})(MyScript);
(function (scope) {
    'use strict';
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
     * @returns {MyScript.MathTerminalNodeCandidate[]}
     */
    MathTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MyScript.MathInkRange[]}
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

    // Export
    scope.MathTerminalNode = MathTerminalNode;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math terminal node candidate
     *
     * @class MathTerminalNodeCandidate
     * @param {Object} obj
     * @constructor
     */
    function MathTerminalNodeCandidate (obj) {
        if (obj) {
            this.label = obj.label;
            this.normalizedRecognitionScore = obj.normalizedRecognitionScore;
        }
    }

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    MathTerminalNodeCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get score
     *
     * @method getNormalizedRecognitionScore
     * @returns {Number}
     */
    MathTerminalNodeCandidate.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    // Export
    scope.MathTerminalNodeCandidate = MathTerminalNodeCandidate;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math fence rule node
     *
     * @class MathFenceRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathFenceRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathFenceRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathFenceRuleNode.prototype.constructor = MathFenceRuleNode;

    // Export
    scope.MathFenceRuleNode = MathFenceRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math fraction rule node
     *
     * @class MathFractionRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathFractionRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathFractionRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathFractionRuleNode.prototype.constructor = MathFractionRuleNode;

    // Export
    scope.MathFractionRuleNode = MathFractionRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math horizontal pair rule node
     *
     * @class MathHorizontalPairRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathHorizontalPairRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathHorizontalPairRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathHorizontalPairRuleNode.prototype.constructor = MathHorizontalPairRuleNode;

    // Export
    scope.MathHorizontalPairRuleNode = MathHorizontalPairRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math identity rule node
     *
     * @class MathIdentityRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathIdentityRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathIdentityRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathIdentityRuleNode.prototype.constructor = MathIdentityRuleNode;

    // Export
    scope.MathIdentityRuleNode = MathIdentityRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math rule node
     *
     * @class MathLeftFenceRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathLeftFenceRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathLeftFenceRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathLeftFenceRuleNode.prototype.constructor = MathLeftFenceRuleNode;

    // Export
    scope.MathLeftFenceRuleNode = MathLeftFenceRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math overscript rule node
     *
     * @class MathOverscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathOverscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathOverscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathOverscriptRuleNode.prototype.constructor = MathOverscriptRuleNode;

    // Export
    scope.MathOverscriptRuleNode = MathOverscriptRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math pre-superscript rule node
     *
     * @class MathPreSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathPreSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathPreSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathPreSuperscriptRuleNode.prototype.constructor = MathPreSuperscriptRuleNode;

    // Export
    scope.MathPreSuperscriptRuleNode = MathPreSuperscriptRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math sqrt rule node
     *
     * @class MathSqrtRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSqrtRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSqrtRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSqrtRuleNode.prototype.constructor = MathSqrtRuleNode;

    // Export
    scope.MathSqrtRuleNode = MathSqrtRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math subscript rule node
     *
     * @class MathSubscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSubscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSubscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSubscriptRuleNode.prototype.constructor = MathSubscriptRuleNode;

    // Export
    scope.MathSubscriptRuleNode = MathSubscriptRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math sub-superscript rule node
     *
     * @class MathSubSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSubSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSubSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSubSuperscriptRuleNode.prototype.constructor = MathSubSuperscriptRuleNode;

    // Export
    scope.MathSubSuperscriptRuleNode = MathSubSuperscriptRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math superscript rule node
     *
     * @class MathSuperscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathSuperscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSuperscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathSuperscriptRuleNode.prototype.constructor = MathSuperscriptRuleNode;

    // Export
    scope.MathSuperscriptRuleNode = MathSuperscriptRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math under-overscript rule node
     *
     * @class MathUnderOverscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathUnderOverscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathUnderOverscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathUnderOverscriptRuleNode.prototype.constructor = MathUnderOverscriptRuleNode;

    // Export
    scope.MathUnderOverscriptRuleNode = MathUnderOverscriptRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math underscript rule node
     *
     * @class MathUnderscriptRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathUnderscriptRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathUnderscriptRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathUnderscriptRuleNode.prototype.constructor = MathUnderscriptRuleNode;

    // Export
    scope.MathUnderscriptRuleNode = MathUnderscriptRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math vertical pair rule node
     *
     * @class MathVerticalPairRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathVerticalPairRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathVerticalPairRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathVerticalPairRuleNode.prototype.constructor = MathVerticalPairRuleNode;

    // Export
    scope.MathVerticalPairRuleNode = MathVerticalPairRuleNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math exponentiable non-terminal node
     *
     * @class MathExponentiableNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathExponentiableNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathExponentiableNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathExponentiableNonTerminalNode.prototype.constructor = MathExponentiableNonTerminalNode;

    // Export
    scope.MathExponentiableNonTerminalNode = MathExponentiableNonTerminalNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math expression non-terminal node
     *
     * @class MathExpressionNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathExpressionNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathExpressionNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathExpressionNonTerminalNode.prototype.constructor = MathExpressionNonTerminalNode;

    // Export
    scope.MathExpressionNonTerminalNode = MathExpressionNonTerminalNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math term non-terminal node
     *
     * @class MathSqrtNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathSqrtNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSqrtNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathSqrtNonTerminalNode.prototype.constructor = MathSqrtNonTerminalNode;

    // Export
    scope.MathSqrtNonTerminalNode = MathSqrtNonTerminalNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math term non-terminal node
     *
     * @class MathVectorNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathVectorNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathVectorNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathVectorNonTerminalNode.prototype.constructor = MathVectorNonTerminalNode;

    // Export
    scope.MathVectorNonTerminalNode = MathVectorNonTerminalNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math term non-terminal node
     *
     * @class MathSystemNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathSystemNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSystemNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathSystemNonTerminalNode.prototype.constructor = MathSystemNonTerminalNode;

    // Export
    scope.MathSystemNonTerminalNode = MathSystemNonTerminalNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Math term non-terminal node
     *
     * @class MathTermNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathTermNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathTermNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathTermNonTerminalNode.prototype.constructor = MathTermNonTerminalNode;

    // Export
    scope.MathTermNonTerminalNode = MathTermNonTerminalNode;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Abstract music element
     *
     * @class MusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicElement (obj) {
        this.inputRanges = [];
        if (obj) {
            this.elementType = obj.elementType;
            this.inputRanges = obj.inputRanges;
        }
    }

    /**
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    MusicElement.prototype.getElementType = function () {
        return this.elementType;
    };

    /**
     * Get input ranges
     *
     * @method getInputRanges
     * @returns {MyScript.MusicInputRange[]}
     */
    MusicElement.prototype.getInputRanges = function () {
        return this.inputRanges;
    };

    // Export
    scope.MusicElement = MusicElement;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Abstract music result element
     *
     * @class MusicResultElement
     * @param {Object} obj
     * @constructor
     */
    function MusicResultElement (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is MusicXML
     *
     * @method isMusicXML
     * @returns {Boolean}
     */
    MusicResultElement.prototype.isMusicXML = function () {
        return this.type === 'MUSICXML';
    };

    /**
     * Is ScoreTree
     *
     * @method isScoreTree
     * @returns {Boolean}
     */
    MusicResultElement.prototype.isScoreTree = function () {
        return this.type === 'SCORETREE';
    };

    // Export
    scope.MusicResultElement = MusicResultElement;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music accidental
     *
     * @class MusicAccidental
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicAccidental (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicAccidental.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicAccidental.prototype.constructor = MusicAccidental;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicAccidental.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicAccidental = MusicAccidental;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music annotation
     *
     * @class MusicAnnotation
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicAnnotation (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.label = obj.label;
        }
    }

    /**
     * Inheritance property
     */
    MusicAnnotation.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicAnnotation.prototype.constructor = MusicAnnotation;

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    MusicAnnotation.prototype.getLabel = function () {
        return this.label;
    };

    // Export
    scope.MusicAnnotation = MusicAnnotation;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music arpeggiate
     *
     * @class MusicArpeggiate
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicArpeggiate (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicArpeggiate.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicArpeggiate.prototype.constructor = MusicArpeggiate;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicArpeggiate.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicArpeggiate = MusicArpeggiate;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music bar
     *
     * @class MusicBar
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicBar (obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        if (obj) {
            this.repeatDirection = obj.repeatDirection;
            this.style = obj.style;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicBar.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicBar.prototype.constructor = MusicBar;

    /**
     * Get repeat direction
     *
     * @method getRepeatDirection
     * @returns {String}
     */
    MusicBar.prototype.getRepeatDirection = function () {
        return this.repeatDirection;
    };

    /**
     * Get style
     *
     * @method getStyle
     * @returns {String}
     */
    MusicBar.prototype.getStyle = function () {
        return this.style;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MyScript.MusicDecoration[]}
     */
    MusicBar.prototype.getDecorations = function () {
        return this.decorations;
    };

    // Export
    scope.MusicBar = MusicBar;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music beam
     *
     * @class MusicBeam
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicBeam (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
            this.leftCount = obj.leftCount;
            this.rightCount = obj.rightCount;
        }
    }

    /**
     * Inheritance property
     */
    MusicBeam.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicBeam.prototype.constructor = MusicBeam;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicBeam.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Get left count
     *
     * @method getLeftCount
     * @returns {Number}
     */
    MusicBeam.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     * Get right count
     *
     * @method getRightCount
     * @returns {Number}
     */
    MusicBeam.prototype.getRightCount = function () {
        return this.rightCount;
    };

    // Export
    scope.MusicBeam = MusicBeam;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music chord
     *
     * @class MusicChord
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicChord (obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        this.notes = [];
        this.beamTypes = [];
        this.ledgerLines = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.duration = obj.duration;
            this.arpeggiate = new scope.MusicArpeggiate(obj.arpeggiate);
            this.startBeam = new scope.MusicBeam(obj.startBeam);
            this.stopBeam = new scope.MusicBeam(obj.stopBeam);
            this.stem = new scope.MusicStem(obj.stem);
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var j in obj.notes) {
                this.notes.push(new scope.MusicNote(obj.notes[j]));
            }
            for (var k in obj.beamTypes) {
                this.beamTypes.push(obj.beamTypes[k]);
            }
            for (var l in obj.ledgerLines) {
                this.ledgerLines.push(new scope.MusicLedgerLine(obj.ledgerLines[l]));
            }
            for (var m in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[m]));
            }
            for (var n in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[n]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicChord.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicChord.prototype.constructor = MusicChord;

    /**
     * Get duration
     *
     * @method getDuration
     * @returns {Number}
     */
    MusicChord.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     * Get arpeggiate
     *
     * @method getArpeggiate
     * @returns {MyScript.MusicArpeggiate}
     */
    MusicChord.prototype.getArpeggiate = function () {
        return this.arpeggiate;
    };

    /**
     * Get start beam
     *
     * @method getStartBeam
     * @returns {MyScript.MusicBeam}
     */
    MusicChord.prototype.getStartBeam = function () {
        return this.startBeam;
    };

    /**
     * Get stop beam
     *
     * @method getStopBeam
     * @returns {MyScript.MusicBeam}
     */
    MusicChord.prototype.getStopBeam = function () {
        return this.stopBeam;
    };

    /**
     * Get stem
     *
     * @method getStem
     * @returns {MyScript.MusicStem}
     */
    MusicChord.prototype.getStem = function () {
        return this.stem;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MyScript.MusicDecoration[]}
     */
    MusicChord.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Get notes
     *
     * @method getNotes
     * @returns {MyScript.MusicNote[]}
     */
    MusicChord.prototype.getNotes = function () {
        return this.notes;
    };

    /**
     * Get beam types
     *
     * @method getBeamTypes
     * @returns {Array}
     */
    MusicChord.prototype.getBeamTypes = function () {
        return this.beamTypes;
    };

    /**
     * Get ledger lines
     *
     * @method getLedgerLines
     * @returns {MyScript.MusicLedgerLine[]}
     */
    MusicChord.prototype.getLedgerLines = function () {
        return this.ledgerLines;
    };

    /**
     * Get start slurs
     *
     * @method getStartSlurs
     * @returns {MyScript.MusicSlur[]}
     */
    MusicChord.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     * Get stop slurs
     *
     * @method getStopSlurs
     * @returns {MyScript.MusicSlur[]}
     */
    MusicChord.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicChord = MusicChord;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music clef
     *
     * @class MusicClef
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicClef (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.line = obj.line;
            this.octave = obj.octave;
            this.symbol = obj.symbol;
        }
    }

    /**
     * Inheritance property
     */
    MusicClef.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicClef.prototype.constructor = MusicClef;

    /**
     * Get line
     *
     * @method getLine
     * @returns {Number}
     */
    MusicClef.prototype.getLine = function () {
        return this.line;
    };

    /**
     * Get octave
     *
     * @method getOctave
     * @returns {Number}
     */
    MusicClef.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicClef.prototype.getSymbol = function () {
        return this.symbol;
    };

    // Export
    scope.MusicClef = MusicClef;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music decoration
     *
     * @class MusicDecoration
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicDecoration (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.symbol = obj.symbol;
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicDecoration.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicDecoration.prototype.constructor = MusicDecoration;

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicDecoration.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicDecoration.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicDecoration = MusicDecoration;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music document
     *
     * @class MusicDocument
     * @param {Object} obj
     * @constructor
     */
    function MusicDocument (obj) {
        this.results = [];
        this.scratchOutResults = [];
        if (obj) {
            for (var i in obj.results) {
                switch (obj.results[i].type) {
                    case 'MUSICXML':
                        this.results.push(new scope.MusicXMLResultElement(obj.results[i]));
                        break;
                    default:
                        this.results.push(new scope.MusicScoreTreeResultElement(obj.results[i]));
                        break;
                }
            }
            for (var j in obj.scratchOutResults) {
                this.scratchOutResults.push(new scope.MusicScratchOut(obj.scratchOutResults[j]));
            }
        }
    }

    /**
     * Get result elements
     *
     * @method getResultElements
     * @returns {MyScript.MusicResultElement[]}
     */
    MusicDocument.prototype.getResultElements = function () {
        return this.results;
    };

    /**
     * Get scratch-out results
     *
     * @method getScratchOutResults
     * @returns {MyScript.MusicScratchOut[]}
     */
    MusicDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    // Export
    scope.MusicDocument = MusicDocument;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music dots
     *
     * @class MusicDots
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicDots (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.count = obj.count;
        }
    }

    /**
     * Inheritance property
     */
    MusicDots.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicDots.prototype.constructor = MusicDots;

    /**
     * Get dots counts
     *
     * @method getCount
     * @returns {Number}
     */
    MusicDots.prototype.getCount = function () {
        return this.count;
    };

    // Export
    scope.MusicDots = MusicDots;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music head
     *
     * @class MusicHead
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicHead (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicHead.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicHead.prototype.constructor = MusicHead;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicHead.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicHead = MusicHead;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music input range
     *
     * @class MusicInputRange
     * @param {Object} obj
     * @constructor
     */
    function MusicInputRange (obj) {
        if (obj) {
            this.component = obj.component;
            this.firstItem = obj.firstItem;
            this.lastItem = obj.lastItem;
        }
    }

    /**
     * Get component
     *
     * @method getComponent
     * @returns {Number}
     */
    MusicInputRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     * Get first item
     *
     * @method getFirstItem
     * @returns {Number}
     */
    MusicInputRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     * Get last item
     *
     * @method getLastItem
     * @returns {Number}
     */
    MusicInputRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MusicInputRange = MusicInputRange;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music key signature
     *
     * @class MusicKeySignature
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicKeySignature (obj) {
        scope.MusicElement.call(this, obj);
        this.accidentals = [];
        if (obj) {
            this.signature = new scope.MusicKeySignatureData(obj.signature);
            for (var i in obj.accidentals) {
                this.accidentals.push(new scope.MusicAccidental(obj.accidentals[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicKeySignature.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicKeySignature.prototype.constructor = MusicKeySignature;

    /**
     * Get signature
     *
     * @method getSignature
     * @returns {MyScript.MusicKeySignatureData}
     */
    MusicKeySignature.prototype.getSignature = function () {
        return this.signature;
    };

    /**
     * Get accidentals
     *
     * @method getAccidentals
     * @returns {MyScript.MusicAccidental[]}
     */
    MusicKeySignature.prototype.getAccidentals = function () {
        return this.accidentals;
    };

    // Export
    scope.MusicKeySignature = MusicKeySignature;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music key signature data
     *
     * @class MusicKeySignatureData
     * @param {Object} obj
     * @constructor
     */
    function MusicKeySignatureData (obj) {
        if (obj) {
            this.fifths = obj.fifths;
            this.cancel = obj.cancel;
        }
    }

    /**
     * Get fifths
     *
     * @mathod getFifths
     * @returns {Number}
     */
    MusicKeySignatureData.prototype.getFifths = function () {
        return this.fifths;
    };

    /**
     * Get cancel
     *
     * @method getCancel
     * @returns {Number}
     */
    MusicKeySignatureData.prototype.getCancel = function () {
        return this.cancel;
    };

    // Export
    scope.MusicKeySignatureData = MusicKeySignatureData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music ledger line
     *
     * @class MusicLedgerLine
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicLedgerLine (obj) {
        scope.MusicElement.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MusicLedgerLine.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicLedgerLine.prototype.constructor = MusicLedgerLine;

    // Export
    scope.MusicLedgerLine = MusicLedgerLine;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music note
     *
     * @class MusicNote
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicNote (obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        this.beamTypes = [];
        this.ledgerLines = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.accidental = new scope.MusicAccidental(obj.accidental);
            this.dots = new scope.MusicDots(obj.dots);
            this.duration = obj.duration;
            this.head = new scope.MusicHead(obj.head);
            this.line = obj.line;
            this.pitch = new scope.MusicPitchData(obj.pitch);
            this.startBeam = new scope.MusicBeam(obj.startBeam);
            this.stopBeam = new scope.MusicBeam(obj.stopBeam);
            this.stem = new scope.MusicStem(obj.stem);
            this.startTie = new scope.MusicTie(obj.startTie);
            this.stopTie = new scope.MusicTie(obj.stopTie);
            this.type = obj.type;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var j in obj.beamTypes) {
                this.beamTypes.push(obj.beamTypes[j]);
            }
            for (var k in obj.ledgerLines) {
                this.ledgerLines.push(new scope.MusicLedgerLine(obj.ledgerLines[k]));
            }
            for (var l in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[l]));
            }
            for (var m in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[m]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicNote.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicNote.prototype.constructor = MusicNote;

    /**
     * Get accidental
     *
     * @method getAccidental
     * @returns {MyScript.MusicAccidental}
     */
    MusicNote.prototype.getAccidental = function () {
        return this.accidental;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {MyScript.MusicDots}
     */
    MusicNote.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get duration
     *
     * @method getDuration
     * @returns {Number}
     */
    MusicNote.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     * Get head
     *
     * @method getHead
     * @returns {MyScript.MusicHead}
     */
    MusicNote.prototype.getHead = function () {
        return this.head;
    };

    /**
     * Get line
     *
     * @method getLine
     * @returns {Number}
     */
    MusicNote.prototype.getLine = function () {
        return this.line;
    };

    /**
     * Get pitch
     *
     * @method getPitch
     * @returns {MyScript.MusicPitchData}
     */
    MusicNote.prototype.getPitch = function () {
        return this.pitch;
    };

    /**
     * Get start beam
     *
     * @method getStartBeam
     * @returns {MyScript.MusicBeam}
     */
    MusicNote.prototype.getStartBeam = function () {
        return this.startBeam;
    };

    /**
     * Get stop beam
     *
     * @method getStopBeam
     * @returns {MyScript.MusicBeam}
     */
    MusicNote.prototype.getStopBeam = function () {
        return this.stopBeam;
    };

    /**
     * Get stem
     *
     * @method getStem
     * @returns {MyScript.MusicStem}
     */
    MusicNote.prototype.getStem = function () {
        return this.stem;
    };

    /**
     * Get start tie
     *
     * @method getStartTie
     * @returns {MyScript.MusicTie}
     */
    MusicNote.prototype.getStartTie = function () {
        return this.startTie;
    };

    /**
     * Get stop tie
     *
     * @method getTopTie
     * @returns {MyScript.MusicTie}
     */
    MusicNote.prototype.getStopTie = function () {
        return this.stopTie;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicNote.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MyScript.MusicDecoration[]}
     */
    MusicNote.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Get beam types
     *
     * @method getBeamTypes
     * @returns {Array}
     */
    MusicNote.prototype.getBeamTypes = function () {
        return this.beamTypes;
    };

    /**
     * Get ledger lines
     *
     * @method getLedgerLines
     * @returns {MyScript.MusicLedgerLine[]}
     */
    MusicNote.prototype.getLedgerLines = function () {
        return this.ledgerLines;
    };

    /**
     * Get start slurs
     *
     * @method getStartSlurs
     * @returns {MyScript.MusicSlur[]}
     */
    MusicNote.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     * Get stop slurs
     *
     * @method getStopSlurs
     * @returns {MyScript.MusicSlur[]}
     */
    MusicNote.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicNote = MusicNote;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music part
     *
     * @class MusicPart
     * @param {Object} obj
     * @constructor
     */
    function MusicPart (obj) {
        this.elements = [];
        if (obj) {
            for (var i in obj.elements) {
                switch (obj.elements[i].elementType) {
                    case 'accidental':
                        this.elements.push(new scope.MusicAccidental(obj.elements[i]));
                        break;
                    case 'annotation':
                        this.elements.push(new scope.MusicAnnotation(obj.elements[i]));
                        break;
                    case 'arpeggiate':
                        this.elements.push(new scope.MusicArpeggiate(obj.elements[i]));
                        break;
                    case 'bar':
                        this.elements.push(new scope.MusicBar(obj.elements[i]));
                        break;
                    case 'beam':
                        this.elements.push(new scope.MusicBeam(obj.elements[i]));
                        break;
                    case 'chord':
                        this.elements.push(new scope.MusicChord(obj.elements[i]));
                        break;
                    case 'clef':
                        this.elements.push(new scope.MusicClef(obj.elements[i]));
                        break;
                    case 'decoration':
                        this.elements.push(new scope.MusicDecoration(obj.elements[i]));
                        break;
                    case 'dots':
                        this.elements.push(new scope.MusicDots(obj.elements[i]));
                        break;
                    case 'head':
                        this.elements.push(new scope.MusicHead(obj.elements[i]));
                        break;
                    case 'keySignature':
                        this.elements.push(new scope.MusicKeySignature(obj.elements[i]));
                        break;
                    case 'ledgerLine':
                        this.elements.push(new scope.MusicLedgerLine(obj.elements[i]));
                        break;
                    case 'note':
                        this.elements.push(new scope.MusicNote(obj.elements[i]));
                        break;
                    case 'rest':
                        this.elements.push(new scope.MusicRest(obj.elements[i]));
                        break;
                    case 'slur':
                        this.elements.push(new scope.MusicSlur(obj.elements[i]));
                        break;
                    case 'stem':
                        this.elements.push(new scope.MusicStem(obj.elements[i]));
                        break;
                    case 'tie':
                        this.elements.push(new scope.MusicTie(obj.elements[i]));
                        break;
                    case 'timeSignature':
                        this.elements.push(new scope.MusicTimeSignature(obj.elements[i]));
                        break;
                }
                this.elements.push(obj.elements[i]);
            }
        }
    }

    /**
     * Get elements
     *
     * @method getElements
     * @returns {MyScript.AbstractMusicElement[]}
     */
    MusicPart.prototype.getElements = function () {
        return this.elements;
    };

    // Export
    scope.MusicPart = MusicPart;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music pitch data
     *
     * @class MusicPitchData
     * @param {Object} obj
     * @constructor
     */
    function MusicPitchData (obj) {
        if (obj) {
            this.alteration = obj.alteration;
            this.octave = obj.octave;
            this.step = obj.step;
        }
    }

    /**
     * Get alteration
     *
     * @method getAlteration
     * @returns {Number}
     */
    MusicPitchData.prototype.getAlteration = function () {
        return this.alteration;
    };

    /**
     * Get octave
     *
     * @method getOctave
     * @returns {Number}
     */
    MusicPitchData.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     * Get step
     *
     * @method getStep
     * @returns {String}
     */
    MusicPitchData.prototype.getStep = function () {
        return this.step;
    };

    // Export
    scope.MusicPitchData = MusicPitchData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music rest
     *
     * @class MusicRest
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicRest (obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.type = obj.type;
            this.dots = new scope.MusicDots(obj.dots);
            this.duration = obj.duration;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var l in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[l]));
            }
            for (var m in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[m]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicRest.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicRest.prototype.constructor = MusicRest;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicRest.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {MyScript.MusicDots}
     */
    MusicRest.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get duration
     *
     * @method getDuration
     * @returns {Number}
     */
    MusicRest.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MyScript.MusicDecoration[]}
     */
    MusicRest.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Get start slurs
     *
     * @method getStartSlurs
     * @returns {MyScript.MusicSlur[]}
     */
    MusicRest.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     * Get stop slurs
     *
     * @method getStopSlurs
     * @returns {MyScript.MusicSlur[]}
     */
    MusicRest.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicRest = MusicRest;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music result
     *
     * @class MusicResult
     * @extends AbstractResult
     * @param {Object} obj
     * @constructor
     */
    function MusicResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.MusicDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    MusicResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    MusicResult.prototype.constructor = MusicResult;

    /**
     * Get music document
     *
     * @method getMusicDocument
     * @returns {MyScript.MusicDocument}
     */
    MusicResult.prototype.getMusicDocument = function () {
        return this.result;
    };

    // Export
    scope.MusicResult = MusicResult;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music score
     *
     * @class MusicScore
     * @param {Object} obj
     * @constructor
     */
    function MusicScore (obj) {
        this.parts = [];
        if (obj) {
            for (var i in obj.parts) {
                this.parts.push(new scope.MusicPart(obj.parts[i]));
            }
        }
    }

    /**
     * Get parts
     *
     * @method getParts
     * @returns {MyScript.MusicPart[]}
     */
    MusicScore.prototype.getParts = function () {
        return this.parts;
    };

    // Export
    scope.MusicScore = MusicScore;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music score tree
     *
     * @class MusicScoreTreeResultElement
     * @extends MusicResultElement
     * @param {Object} obj
     * @constructor
     */
    function MusicScoreTreeResultElement (obj) {
        scope.MusicResultElement.call(this, obj);
        if (obj) {
            this.score = new scope.MusicScore(obj.score);
        }
    }

    /**
     * Inheritance property
     */
    MusicScoreTreeResultElement.prototype = new scope.MusicResultElement();

    /**
     * Constructor property
     */
    MusicScoreTreeResultElement.prototype.constructor = MusicScoreTreeResultElement;

    /**
     * Get score
     *
     * @method getScore
     * @returns {MyScript.MusicScore}
     */
    MusicScoreTreeResultElement.prototype.getScore = function () {
        return this.score;
    };

    // Export
    scope.MusicScoreTreeResultElement = MusicScoreTreeResultElement;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music scratch-out
     *
     * @class MusicScratchOut
     * @param {Object} obj
     * @constructor
     */
    function MusicScratchOut (obj) {
        this.inputRanges = [];
        this.erasedInputRanges = [];
        if (obj) {
            for (var i in obj.inputRanges) {
                this.inputRanges.push(new scope.MusicInputRange(obj.inputRanges[i]));
            }
            for (var j in obj.erasedInputRanges) {
                this.erasedInputRanges.push(new scope.MusicInputRange(obj.erasedInputRanges[j]));
            }
        }
    }

    /**
     * Get input ranges
     *
     * @method getInputRanges
     * @returns {MyScript.MusicInputRange[]}
     */
    MusicScratchOut.prototype.getInputRanges = function () {
        return this.inputRanges;
    };

    /**
     * Get erased input ranges
     *
     * @method getErasedInputRanges
     * @returns {MyScript.MusicInputRange[]}
     */
    MusicScratchOut.prototype.getErasedInputRanges = function () {
        return this.erasedInputRanges;
    };

    // Export
    scope.MusicScratchOut = MusicScratchOut;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music slur
     *
     * @class MusicSlur
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicSlur (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicSlur.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicSlur.prototype.constructor = MusicSlur;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicSlur.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicSlur = MusicSlur;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music stem
     *
     * @class MusicStem
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicStem (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicStem.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicStem.prototype.constructor = MusicStem;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicStem.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicStem = MusicStem;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music tie
     *
     * @class MusicTie
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicTie (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicTie.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTie.prototype.constructor = MusicTie;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicTie.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicTie = MusicTie;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music time signature
     *
     * @class MusicTimeSignature
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicTimeSignature (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.top = new scope.MusicAnnotation(obj.top);
            this.bottom = new scope.MusicAnnotation(obj.bottom);
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicTimeSignature.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTimeSignature.prototype.constructor = MusicTimeSignature;

    /**
     * Get top
     *
     * @method getTop
     * @returns {MyScript.MusicAnnotation}
     */
    MusicTimeSignature.prototype.getTop = function () {
        return this.top;
    };

    /**
     * Get bottom
     *
     * @method getBottom
     * @returns {MyScript.MusicAnnotation}
     */
    MusicTimeSignature.prototype.getBottom = function () {
        return this.bottom;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTimeSignature.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTimeSignature = MusicTimeSignature;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * MusicXML result
     *
     * @class MusicXMLResultElement
     * @extends MusicResultElement
     * @param {Object} obj
     * @constructor
     */
    function MusicXMLResultElement (obj) {
        scope.MusicResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MusicXMLResultElement.prototype = new scope.MusicResultElement();

    /**
     * Constructor property
     */
    MusicXMLResultElement.prototype.constructor = MusicXMLResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MusicXMLResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MusicXMLResultElement = MusicXMLResultElement;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer element
     *
     * @class AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerElement (obj) {
        if (obj) {
            this.elementType = obj.elementType;
        }
    }

    /**
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    AnalyzerElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AnalyzerElement = AnalyzerElement;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer table cell
     *
     * @class AnalyzerCell
     * @extends AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerCell (obj) {
        scope.AnalyzerElement.call(this, obj);
        if (obj) {
            this.data = new scope.AnalyzerCellData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerCell.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerCell.prototype.constructor = AnalyzerCell;

    /**
     * Get analyzer cell data
     *
     * @method getData
     * @returns {AnalyzerCellData}
     */
    AnalyzerCell.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.AnalyzerCell = AnalyzerCell;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer cell data
     *
     * @class AnalyzerCellData
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerCellData (obj) {
        if (obj) {
            this.firstColumn = obj.firstColumn;
            this.lastColumn = obj.lastColumn;
            this.firstRow = obj.firstRow;
            this.lastRow = obj.lastRow;
            this.height = obj.height;
            this.width = obj.width;
            this.orientation = obj.orientation;
            this.topLeftPoint = new scope.AnalyzerPointData(obj.topLeftPoint);
            this.topBorder = obj.topBorder;
            this.bottomBorder = obj.bottomBorder;
            this.leftBorder = obj.leftBorder;
            this.rightBorder = obj.rightBorder;
        }
    }

    /**
     * Get first column
     *
     * @method getFirstColumn
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstColumn = function () {
        return this.firstColumn;
    };

    /**
     * Get last column
     *
     * @method getLastColumn
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastColumn = function () {
        return this.lastColumn;
    };

    /**
     * Get first row
     *
     * @method getFirstRow
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstRow = function () {
        return this.firstRow;
    };

    /**
     * Get last row
     *
     * @method getLastRow
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastRow = function () {
        return this.lastRow;
    };

    /**
     * Get height
     *
     * @method getHeight
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * Get width
     *
     * @method getWidth
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Get orientation
     *
     * @method getOrientation
     * @returns {String}
     */
    AnalyzerCellData.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * Get top-left point
     *
     * @method getTopLeftPoint
     * @returns {AnalyzerPointData}
     */
    AnalyzerCellData.prototype.getTopLeftPoint = function () {
        return this.topLeftPoint;
    };

    /**
     * Has top border
     *
     * @method hasTopBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasTopBorder = function () {
        return this.topBorder;
    };

    /**
     * Has bottom border
     *
     * @method hasBottomBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasBottomBorder = function () {
        return this.bottomBorder;
    };

    /**
     * Has left border
     *
     * @method hasLeftBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasLeftBorder = function () {
        return this.leftBorder;
    };

    /**
     * Has right border
     *
     * @method hasRightBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasRightBorder = function () {
        return this.rightBorder;
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {MyScript.Rectangle}
     */
    AnalyzerCellData.prototype.getBoundingBox = function () {
        var rectangle = new scope.Rectangle();
        rectangle.setTopLeftPoint(this.getTopLeftPoint());
        rectangle.setWidth(this.getWidth());
        rectangle.setHeight(this.getHeight());
        return rectangle;
    };

    // Export
    scope.AnalyzerCellData = AnalyzerCellData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer document
     *
     * @class AnalyzerDocument
     * @extends AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerDocument (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.textLines = [];
        this.shapes = [];
        this.tables = [];
        this.groups = [];
        if (obj) {
            for (var i in obj.textLines) {
                this.textLines.push(new scope.AnalyzerTextLine(obj.textLines[i]));
            }
            for (var j in obj.shapes) {
                this.shapes.push(new scope.ShapeSegment(obj.shapes[j]));
            }
            for (var k in obj.tables) {
                this.tables.push(new scope.AnalyzerTable(obj.tables[k]));
            }
            for (var l in obj.groups) {
                this.groups.push(new scope.AnalyzerGroup(obj.groups[l]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerDocument.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerDocument.prototype.constructor = AnalyzerDocument;

    /**
     * Get text lines
     *
     * @method getTextLines
     * @returns {MyScript.AnalyzerTextLine[]}
     */
    AnalyzerDocument.prototype.getTextLines = function () {
        return this.textLines;
    };

    /**
     * Get shapes
     *
     * @method getShapes
     * @returns {MyScript.ShapeSegment[]}
     */
    AnalyzerDocument.prototype.getShapes = function () {
        return this.shapes;
    };

    /**
     * Get tables
     *
     * @method getTables
     * @returns {MyScript.AnalyzerTable[]}
     */
    AnalyzerDocument.prototype.getTables = function () {
        return this.tables;
    };

    /**
     * Get groups
     *
     * @method getGroups
     * @returns {MyScript.AnalyzerGroup[]}
     */
    AnalyzerDocument.prototype.getGroups = function () {
        return this.groups;
    };

    // Export
    scope.AnalyzerDocument = AnalyzerDocument;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer element reference
     *
     * @class AnalyzerElementReference
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerElementReference (obj) {
        if (obj) {
            this.uniqueID = obj.uniqueID;
            this.type = obj.type;
        }
    }

    /**
     * Get unique id
     *
     * @method getUniqueId
     * @returns {String}
     */
    AnalyzerElementReference.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerElementReference.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AnalyzerElementReference = AnalyzerElementReference;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer group
     *
     * @class AnalyzerGroup
     * @extends AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerGroup (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.elementReferences = [];
        if (obj) {
            this.type = obj.type;
            this.uniqueID = obj.uniqueID;
            for (var i in obj.elementReferences) {
                this.elementReferences.push(new scope.AnalyzerElementReference(obj.elementReferences[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerGroup.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerGroup.prototype.constructor = AnalyzerGroup;

    /**
     * Get element references
     *
     * @method getElementReferences
     * @returns {MyScript.AnalyzerElementReference[]}
     */
    AnalyzerGroup.prototype.getElementReferences = function () {
        return this.elementReferences;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerGroup.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get unique Id
     *
     * @method getUniqueId
     * @returns {String}
     */
    AnalyzerGroup.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    // Export
    scope.AnalyzerGroup = AnalyzerGroup;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer ink range
     *
     * @class AnalyzerInkRange
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerInkRange (obj) {
        if (obj) {
            this.firstPoint = new scope.AnalyzerPointData(obj.firstPoint);
            this.lastPoint = new scope.AnalyzerPointData(obj.lastPoint);
            this.stroke = new scope.AnalyzerRecognizedStroke(obj.stroke);
        }
    }

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {MyScript.AnalyzerPointData}
     */
    AnalyzerInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {MyScript.AnalyzerPointData}
     */
    AnalyzerInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    /**
     * Get stroke
     *
     * @method getStroke
     * @returns {null|*}
     */
    AnalyzerInkRange.prototype.getStroke = function () {
        return this.stroke;
    };

    // Export
    scope.AnalyzerInkRange = AnalyzerInkRange;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer line
     *
     * @class AnalyzerLine
     * @extends AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerLine (obj) {
        scope.AnalyzerElement.call(this, obj);
        if (obj) {
            this.data = new scope.AnalyzerLineData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerLine.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerLine.prototype.constructor = AnalyzerLine;

    /**
     * Get data
     *
     * @method getData
     * @returns {MyScript.AnalyzerLineData}
     */
    AnalyzerLine.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.AnalyzerLine = AnalyzerLine;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer line data
     *
     * @class AnalyzerLineData
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerLineData (obj) {
        if (obj) {
            this.p1 = new scope.AnalyzerPointData(obj.p1);
            this.p2 = new scope.AnalyzerPointData(obj.p2);
        }
    }

    /**
     * Get p1
     *
     * @method getP1
     * @returns {MyScript.AnalyzerPointData}
     */
    AnalyzerLineData.prototype.getP1 = function () {
        return this.p1;
    };

    /**
     * Get p2
     *
     * @method getP2
     * @returns {MyScript.AnalyzerPointData}
     */
    AnalyzerLineData.prototype.getP2 = function () {
        return this.p2;
    };

    // Export
    scope.AnalyzerLineData = AnalyzerLineData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer point data
     *
     * @class AnalyzerPointData
     * @extends MyScript.Point
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerPointData (obj) {
        scope.Point.call(this, obj);
    }

    /**
     * Inheritance property
     */
    AnalyzerPointData.prototype = new scope.Point();

    /**
     * Constructor property
     */
    AnalyzerPointData.prototype.constructor = AnalyzerPointData;

    // Export
    scope.AnalyzerPointData = AnalyzerPointData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * AnalyzerRecognizedStroke
     *
     * @class AnalyzerRecognizedStroke
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerRecognizedStroke (obj) {
        if (obj) {
            this.type = obj.type;
            this.x = obj.x;
            this.y = obj.y;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerRecognizedStroke.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get x
     *
     * @method getX
     * @returns {Number[]}
     */
    AnalyzerRecognizedStroke.prototype.getX = function () {
        return this.x;
    };

    /**
     * Get y
     *
     * @method getY
     * @returns {Number[]}
     */
    AnalyzerRecognizedStroke.prototype.getY = function () {
        return this.y;
    };

    // Export
    scope.AnalyzerRecognizedStroke = AnalyzerRecognizedStroke;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer result
     *
     * @class AnalyzerResult
     * @extends AbstractResult
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.AnalyzerDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    AnalyzerResult.prototype.constructor = AnalyzerResult;

    /**
     * Get analyzer document
     *
     * @method getAnalyzerDocument
     * @returns {MyScript.AnalyzerDocument}
     */
    AnalyzerResult.prototype.getAnalyzerDocument = function () {
        return this.result;
    };

    // Export
    scope.AnalyzerResult = AnalyzerResult;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer stroke type
     *
     * @class AnalyzerStrokeType
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerStrokeType (obj) {
        if (obj) {
            this.inkRange = new scope.AnalyzerInkRange(obj.inkRange);
            this.type = obj.type;
        }
    }

    /**
     * Get ink range
     *
     * @method getInkRange
     * @returns {MyScript.AnalyzerInkRange}
     */
    AnalyzerStrokeType.prototype.getInkRange = function () {
        return this.inkRange;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerStrokeType.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AnalyzerStrokeType = AnalyzerStrokeType;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer table
     *
     * @class AnalyzerTable
     * @extends AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTable (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.lines = [];
        this.cells = [];
        this.inkRanges = [];
        if (obj) {
            this.data = new scope.AnalyzerTableData(obj.data);
            for (var i in obj.lines) {
                this.lines.push(new scope.AnalyzerLine(obj.lines[i]));
            }
            for (var j in obj.cells) {
                this.cells.push(new scope.AnalyzerCell(obj.cells[j]));
            }
            for (var k in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[k]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerTable.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerTable.prototype.constructor = AnalyzerTable;

    /**
     * Get data
     *
     * @method getData
     * @returns {MyScript.AnalyzerTableData}
     */
    AnalyzerTable.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get lines
     *
     * @method getLines
     * @returns {MyScript.AnalyzerLine[]}
     */
    AnalyzerTable.prototype.getLines = function () {
        return this.lines;
    };

    /**
     * Get cells
     *
     * @method getCells
     * @returns {MyScript.AnalyzerCell[]}
     */
    AnalyzerTable.prototype.getCells = function () {
        return this.cells;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MyScript.AnalyzerInkRange[]}
     */
    AnalyzerTable.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.AnalyzerTable = AnalyzerTable;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer table data
     *
     * @class AnalyzerTableData
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTableData (obj) {
        if (obj) {
            this.columnCount = obj.columnCount;
            this.rowCount = obj.rowCount;
        }
    }

    /**
     * Get column count
     *
     * @method getColumnCount
     * @returns {Number}
     */
    AnalyzerTableData.prototype.getColumnCount = function () {
        return this.columnCount;
    };

    /**
     * Get row count
     *
     * @method getRowCount
     * @returns {Number}
     */
    AnalyzerTableData.prototype.getRowCount = function () {
        return this.rowCount;
    };

    // Export
    scope.AnalyzerTableData = AnalyzerTableData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer text line
     *
     * @class AnalyzerTextLine
     * @extends AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTextLine (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.inkRanges = [];
        this.underlineList = [];
        if (obj) {
            this.data = new scope.AnalyzerTextLineData(obj.data);
            this.result = new scope.TextDocument(obj.result);
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
            for (var j in obj.underlineList) {
                this.underlineList.push(new scope.AnalyzerUnderline(obj.underlineList[j]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerTextLine.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerTextLine.prototype.constructor = AnalyzerTextLine;

    /**
     * Get data
     *
     * @method getData
     * @returns {MyScript.AnalyzerTextLineData}
     */
    AnalyzerTextLine.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get text document
     *
     * @method getTextDocument
     * @returns {MyScript.TextDocument}
     */
    AnalyzerTextLine.prototype.getTextDocument = function () {
        return this.result;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MyScript.AnalyzerInkRange[]}
     */
    AnalyzerTextLine.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get underline list
     *
     * @method getUnderlineList
     * @returns {MyScript.AnalyzerUnderline[]}
     */
    AnalyzerTextLine.prototype.getUnderlineList = function () {
        return this.underlineList;
    };

    // Export
    scope.AnalyzerTextLine = AnalyzerTextLine;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer text line data
     *
     * @class AnalyzerTextLineData
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTextLineData (obj) {
        if (obj) {
            this.baselinePos = obj.baselinePos;
            this.toMidline = obj.toMidline;
            this.orientation = obj.orientation;
            this.topLeftPoint = new scope.AnalyzerPointData(obj.topLeftPoint);
            this.textHeight = obj.textHeight;
            this.justificationType = obj.justificationType;
            this.height = obj.height;
            this.width = obj.width;
        }
    }

    /**
     * Get baseline position
     *
     * @method getBaselinePos
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getBaselinePos = function () {
        return this.baselinePos;
    };

    /**
     * Get to midline
     *
     * @method getToMidline
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getToMidline = function () {
        return this.toMidline;
    };

    /**
     * Get orientation
     *
     * @method getOrientation
     * @returns {String}
     */
    AnalyzerTextLineData.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * Get top-left point
     *
     * @method getTopLeftPoint
     * @returns {MyScript.AnalyzerPointData}
     */
    AnalyzerTextLineData.prototype.getTopLeftPoint = function () {
        return this.topLeftPoint;
    };

    /**
     * Get text height
     *
     * @method getTextHeight
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getTextHeight = function () {
        return this.textHeight;
    };

    /**
     * Get justification type
     *
     * @method getJustificationType
     * @returns {String}
     */
    AnalyzerTextLineData.prototype.getJustificationType = function () {
        return this.justificationType;
    };

    /**
     * Get height
     *
     * @method getHeight
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * Get width
     *
     * @method getWidth
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {MyScript.Rectangle}
     */
    AnalyzerTextLineData.prototype.getBoundingBox = function () {
        var rectangle = new scope.Rectangle();
        if(this.getTopLeftPoint() || this.getWidth() || this.getHeight()) {
            rectangle.setTopLeftPoint(this.getTopLeftPoint());
            rectangle.setWidth(this.getWidth());
            rectangle.setHeight(this.getHeight());
        }
        return rectangle;
    };

    // Export
    scope.AnalyzerTextLineData = AnalyzerTextLineData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer underline
     *
     * @class AnalyzerUnderline
     * @extends AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerUnderline (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.inkRanges = [];
        if (obj) {
            this.data = new scope.AnalyzerUnderlineData(obj.data);
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerUnderline.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerUnderline.prototype.constructor = AnalyzerUnderline;

    /**
     * Get data
     *
     * @method getData
     * @returns {AnalyzerUnderlineData}
     */
    AnalyzerUnderline.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {AnalyzerInkRange[]}
     */
    AnalyzerUnderline.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.AnalyzerUnderline = AnalyzerUnderline;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer underline data
     *
     * @class AnalyzerUnderlineData
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerUnderlineData (obj) {
        if (obj) {
            this.firstCharacter = obj.firstCharacter;
            this.lastCharacter = obj.lastCharacter;
        }
    }

    /**
     * Get first character
     *
     * @method getFirstCharacter
     * @returns {Number}
     */
    AnalyzerUnderlineData.prototype.getFirstCharacter = function () {
        return this.firstCharacter;
    };

    /**
     * Get last character
     *
     * @method getLastCharacter
     * @returns {Number}
     */
    AnalyzerUnderlineData.prototype.getLastCharacter = function () {
        return this.lastCharacter;
    };

    // Export
    scope.AnalyzerUnderlineData = AnalyzerUnderlineData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Network interface
     *
     * @class NetworkInterface
     * @constructor
     */
    function NetworkInterface () {
    }

    /**
     * Parse JSON String to Object
     *
     * @method parse
     * @param {Object} req
     * @returns {Object}
     */
    NetworkInterface.parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return result;
    };

    /**
     * Transform object data request to a list of parameters
     *
     * @method transformRequest
     * @param {Object} obj
     * @returns {String}
     */
    NetworkInterface.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
            if ((typeof obj[p] !== 'undefined') &&
                (typeof obj[p] !== 'function')) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    };

    /**
     * Send request to the network and return a promise
     *
     * @method xhr
     * @param {String} type
     * @param {String} url
     * @param {Object} data
     * @returns {QReturnValue}
     */
    NetworkInterface.prototype.xhr = function (type, url, data) {

        var deferred = Q.defer();

        function onStateChange () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    deferred.resolve(NetworkInterface.parse(request));
                } else {
                    deferred.reject(NetworkInterface.parse(request));
                }
            }
        }

        function onLoad () {
            if (request.status >= 200 && request.status < 300) {
                deferred.resolve(NetworkInterface.parse(request));
            } else {
                deferred.reject(new Error('Status code was ' + request.status));
            }
        }

        function onError () {
            deferred.reject(new Error('Can\'t XHR ' + JSON.stringify(url)));
        }

        function onProgress (event) {
            deferred.notify(event.loaded / event.total);
        }

        var request = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
        request.open(type, url, true);
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        request.onload = onLoad;
        request.onerror = onError;
        request.onprogress = onProgress;
        request.onreadystatechange = onStateChange;
        request.send(NetworkInterface.transformRequest(data));

        return deferred.promise;
    };

    /**
     * Get request
     *
     * @method get
     * @param {String} src
     * @param {Object} params
     * @returns {QReturnValue}
     */
    NetworkInterface.prototype.get = function (src, params) {
        if (params) {
            src += '?' + NetworkInterface.transformRequest(params);
        }
        return this.xhr('GET', src);
    };

    ///**
    // * Put request
    // *
    // * @method put
    // * @param {String} src
    // * @param {Object} data
    // * @returns {QReturnValue}
    // */
    //NetworkInterface.prototype.put = function (url, data) {
    //    return this.xhr('PUT', url, data);
    //};

    /**
     * Post request
     *
     * @method post
     * @param {String} src
     * @param {Object} data
     * @returns {QReturnValue}
     */
    NetworkInterface.prototype.post = function (url, data) {
        return this.xhr('POST', url, data);
    };

    ///**
    // * Delete request
    // *
    // * @method delete
    // * @param {String} src
    // * @param {Object} data
    // * @returns {QReturnValue}
    // */
    //NetworkInterface.prototype.delete = function (url, data) {
    //    return this.xhr('DELETE', url, data);
    //};

    // Export
    scope.NetworkInterface = NetworkInterface;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Abstract recognizer interface
     *
     * @class AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AbstractRecognizer (host) {
        this.host = 'cloud.myscript.com';
        if (host) {
            this.host = host;
        }
        this.http = new scope.NetworkInterface();
    }

    /**
     * Get the recognition languages available for an application and a specific inputMode
     *
     * @method getAvailableLanguageList
     * @param {String} applicationKey
     * @param {String} inputMode
     * @returns {QReturnValue}
     */
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, inputMode) {
        var data = new scope.RecognitionLanguagesData();
        data.setApplicationKey(applicationKey);
        data.setInputMode(inputMode);

        return this.http.get('http://' + this.host + '/api/v3.0/recognition/rest/text/languages.json', data).then(
            function success (response) {
                return response.result;
            },
            function error (response) {
                return response;
            }
        );
    };

    /**
     * Compute HMAC signature for server authentication
     *
     * @method computeHmac
     * @param {String} applicationKey
     * @param {String} data
     * @param {String} hmacKey
     */

    AbstractRecognizer.prototype.computeHmac = function (applicationKey, data, hmacKey) {
        var jsonInput = (typeof data === 'object') ? JSON.stringify(data) : data;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    /**
     * Authenticate the websocket client end with a handshake of HMAC signature
     *
     * @method takeUpHmacChallenge
     * @param {String} applicationKey
     * @param {String} challenge
     * @param {String} hmacKey
     */
    AbstractRecognizer.prototype.takeUpHmacChallenge = function (applicationKey, challenge, hmacKey) {
        if (!this.socket) {
            return;
        }

        var hmacMessage = {
            type: 'hmac',
            applicationKey: applicationKey,
            hmac: this.computeHmac(applicationKey, challenge, hmacKey),
            challenge: challenge
        };
        this.socket.send(JSON.stringify(hmacMessage));
    };
    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text recognizer interface
     *
     * @class TextRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.TextParameter();
        this.parameters.setLanguage('en_US');
        this.parameters.setInputMode('CURSIVE');
    }

    /**
     * Inheritance property
     */
    TextRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    TextRecognizer.prototype.constructor = TextRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {TextParameter}
     */
    TextRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {TextParameter} parameters
     */
    TextRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do text recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {TextParameter} parameters
     * @param {String} instanceId
     * @param {TextInputUnit[]} inputUnits
     * @param {String} hmacKey
     * @returns {QReturnValue}
     */
    TextRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, inputUnits, hmacKey, parameters) {

        var input = new scope.TextRecognitionInput();
        if (parameters) {
            input.setParameters(parameters);
        } else {
            input.setParameters(this.parameters);
        }
        input.setInputUnits(inputUnits);

        var data = new scope.TextRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setTextRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.TextResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.TextRecognizer = TextRecognizer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Text websocket recognizer interface
     *
     * @class TextWSRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextWSRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/text');
    }

    /**
     * Inheritance property
     */
    TextWSRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    TextWSRecognizer.prototype.constructor = TextWSRecognizer;

    /**
     * Set websocket open callback
     *
     * @method setOpenCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setOpenCallback = function (callback) {
        this.socket.onopen = callback;
    };

    /**
     * Set websocket close callback
     *
     * @method setCloseCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setCloseCallback = function (callback) {
        this.socket.onclose = callback;
    };

    /**
     * Set websocket error callback
     *
     * @method setErrorCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setErrorCallback = function (callback) {
        this.socket.onerror = callback;
    };

    /**
     * Set websocket data callback
     *
     * @method setDataCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setDataCallback = function (callback) {
        this.socket.onmessage = callback;
    };

    /**
     * Initialize the websocket
     *
     * @method initWSRecognition
     * @param {String} applicationKey
     */
    TextWSRecognizer.prototype.initWSRecognition = function (applicationKey) {
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
     * @param {TextParameter} parameters
     * @param {TextInputUnit[]} inputUnits
     */
    TextWSRecognizer.prototype.startWSRecognition = function (parameters, inputUnits) {
        if (!this.socket) {
            return;
        }

        var input = new scope.TextRecognitionInput();
        input.setParameters(parameters);
        input.setInputUnits(inputUnits);

        input.type = 'start';

        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(input)));
        return deferred.promise;
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {TextInputUnit[]} inputUnits
     */
    TextWSRecognizer.prototype.continueWSRecognition = function (inputUnits, instanceId) {
        if (!this.socket) {
            return;
        }

        var continueMessage = {
            type: 'continue',
            inputUnits: inputUnits,
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
    TextWSRecognizer.prototype.resetWSRecognition = function () {
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
    TextWSRecognizer.prototype.stopWSRecognition = function () {
        this.socket = undefined;
    };

    /**
     * Check if the socket is closed
     *
     * @method isClosed
     * @returns {Boolean}
     */
    TextWSRecognizer.prototype.isClosed = function () {
        return (!this.socket)? true: false;
    };

    /**
     * Create a new socket
     *
     * @method restartWSRecognition
     */
    TextWSRecognizer.prototype.restartWSRecognition = function () {
        var deferred = Q.defer();
        deferred.resolve(this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/text'));
        return deferred.promise;
    };

    /**
     * @callback TextWSRecognizer~dataCallback
     * @callback TextWSRecognizer~errorCallback
     * @callback TextWSRecognizer~closeCallback
     * @callback TextWSRecognizer~openCallback
     */

        // Export
    scope.TextWSRecognizer = TextWSRecognizer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Shape recognizer interface
     *
     * @class ShapeRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function ShapeRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.ShapeParameter();
    }

    /**
     * Inheritance property
     */
    ShapeRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    ShapeRecognizer.prototype.constructor = ShapeRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {ShapeParameter}
     */
    ShapeRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {ShapeParameter} parameters
     */
    ShapeRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do shape recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {ShapeParameter} [parameters]
     * @returns {QReturnValue}
     */
    ShapeRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {

        var input = new scope.ShapeRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setDoBeautification(parameters.hasBeautification());
            input.setRejectDetectionSensitivity(parameters.getRejectDetectionSensitivity());
        } else {
            input.setDoBeautification(this.getParameters().hasBeautification());
            input.setRejectDetectionSensitivity(this.getParameters().getRejectDetectionSensitivity());
        }

        var data = new scope.ShapeRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setShapeRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.ShapeResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    /**
     * Clear shape recognition session
     *
     * @method clearShapeRecognitionSession
     * @param {String} applicationKey
     * @param {String} instanceId
     * @returns {QReturnValue}
     */
    ShapeRecognizer.prototype.clearShapeRecognitionSession = function (applicationKey, instanceId) {

        var data = {
            instanceSessionId: instanceId
        };

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/shape/clearSessionId.json', data).then(
            function success (response) {
                return response;
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.ShapeRecognizer = ShapeRecognizer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math recognizer interface
     *
     * @class MathRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MathRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.MathParameter();
    }

    /**
     * Inheritance property
     */
    MathRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    MathRecognizer.prototype.constructor = MathRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do math recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {MathParameter} [parameters]
     * @returns {QReturnValue}
     */
    MathRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var input = new scope.MathRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setResultTypes(parameters.getResultTypes());
            input.setIsColumnar(parameters.getIsColumnar());
            input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
            input.setUserResources(parameters.getUserResources());
        } else {
            input.setResultTypes(this.getParameters().getResultTypes());
            input.setIsColumnar(this.getParameters().getIsColumnar());
            input.setScratchOutDetectionSensitivity(this.getParameters().getScratchOutDetectionSensitivity());
            input.setUserResources(this.getParameters().getUserResources());
        }

        var data = new scope.MathRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setMathRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.MathResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.MathRecognizer = MathRecognizer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Math websocket recognizer interface
     *
     * @class MathWSRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MathWSRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/math');
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
        };
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
        deferred.resolve(this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/math'));
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
(function (scope) {
    'use strict';
    /**
     * Music recognizer interface
     *
     * @class MusicRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MusicRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.MusicParameter();
    }

    /**
     * Inheritance property
     */
    MusicRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    MusicRecognizer.prototype.constructor = MusicRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MusicParameter}
     */
    MusicRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MusicParameter} parameters
     */
    MusicRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do music recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {MusicParameter} [parameters]
     * @returns {QReturnValue}
     */
    MusicRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {

        var input = new scope.MusicRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setStaff(parameters.getStaff());
            input.setDivisions(parameters.getDivisions());
            input.setResultTypes(parameters.getResultTypes());
            input.setScratchOutDetectionSensitivity(parameters.getScratchOutDetectionSensitivity());
            input.setUserResources(parameters.getUserResources());
        } else {
            input.setStaff(this.getParameters().getStaff());
            input.setDivisions(this.getParameters().getDivisions());
            input.setResultTypes(this.getParameters().getResultTypes());
            input.setScratchOutDetectionSensitivity(this.getParameters().getScratchOutDetectionSensitivity());
            input.setUserResources(this.getParameters().getUserResources());
        }

        var data = new scope.MusicRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setMusicRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.MusicResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.MusicRecognizer = MusicRecognizer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Analyzer recognizer interface
     *
     * @class AnalyzerRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AnalyzerRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.AnalyzerParameter();
        var textParameters = new scope.TextParameter();
        textParameters.setLanguage('en_US');
        textParameters.setInputMode('CURSIVE');
        this.parameters.setTextParameters(textParameters);
    }

    /**
     * Inheritance property
     */
    AnalyzerRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    AnalyzerRecognizer.prototype.constructor = AnalyzerRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {AnalyzerParameter}
     */
    AnalyzerRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {AnalyzerParameter} parameters
     */
    AnalyzerRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Do analyzer recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {AnalyzerParameter} [parameters]
     * @returns {QReturnValue}
     */
    AnalyzerRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {

        var input = new scope.AnalyzerRecognitionInput();
        input.setComponents(components);
        if (parameters) {
            input.setParameters(parameters);
        } else {
            input.setParameters(this.getParameters());
        }

        var data = new scope.AnalyzerRecognitionData();
        data.setApplicationKey(applicationKey);
        data.setAnalyzerRecognitionInput(input);
        data.setInstanceId(instanceId);
        data.setHmac(this.computeHmac(applicationKey, input, hmacKey));

        return this.http.post('http://' + this.host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
            function success (response) {
                return new scope.AnalyzerResult(response);
            },
            function error (response) {
                return response;
            }
        );
    };

    // Export
    scope.AnalyzerRecognizer = AnalyzerRecognizer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Parameters used for both input and output canvas draw. Default values:
     * color: 'black';
     * rectColor: 'rgba(0, 0, 0, 0.2)';
     * font: 'Times New Roman';
     * decoration: '';
     * width: 4;
     * pressureType: 'SIMULATED';
     * alpha: '1.0';
     * doFadeOutLoop: false;
     * showBoundingBoxes: false;
     *
     * @class RenderingParameters
     * @constructor
     */
    function RenderingParameters () {
        this.color = 'black';
        this.rectColor = 'rgba(0, 0, 0, 0.2)';
        this.font = 'Times New Roman';
        this.decoration = '';
        this.width = 4;
        this.pressureType = 'SIMULATED';
        this.alpha = '1.0';
        this.doFadeOutLoop = false;
        this.showBoundingBoxes = false;
    }

    /**
     * Get the color renderer parameter
     *
     * @method getColor
     * @returns {String} The color of the ink
     */
    RenderingParameters.prototype.getColor = function () {
        return this.color;
    };

    /**
     * Set the color renderer parameter
     *
     * @method setColor
     * @param {String} color
     */
    RenderingParameters.prototype.setColor = function (color) {
        this.color = color;
    };

    /**
     * Get the rect renderer parameter
     *
     * @method getRectColor
     * @returns {String} the rectangle color
     */
    RenderingParameters.prototype.getRectColor = function () {
        return this.rectColor;
    };

    /**
     * Set the rect renderer parameter
     *
     * @method setRectColor
     * @param {String} rectColor
     */
    RenderingParameters.prototype.setRectColor = function (rectColor) {
        this.rectColor = rectColor;
    };

    /**
     * Get the font renderer parameter
     *
     * @method getFont
     * @returns {String} The font
     */
    RenderingParameters.prototype.getFont = function () {
        return this.font;
    };

    /**
     * Set the font renderer parameter
     *
     * @method setFont
     * @param {String} font
     */
    RenderingParameters.prototype.setFont = function (font) {
        this.font = font;
    };

    /**
     * Get the decoration renderer parameter
     *
     * @method getDecoration
     * @returns {String} The decoration
     */
    RenderingParameters.prototype.getDecoration = function () {
        return this.decoration;
    };

    /**
     * Set the decoration renderer parameter
     *
     * @method setDecoration
     * @param {String} decoration
     */
    RenderingParameters.prototype.setDecoration = function (decoration) {
        this.decoration = decoration;
    };

    /**
     * Get the width renderer parameter
     *
     * @method getWidth
     * @returns {Number} The ink width
     */
    RenderingParameters.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Set the width renderer parameter
     *
     * @method setWidth
     * @param {Number} width
     */
    RenderingParameters.prototype.setWidth = function (width) {
        this.width = width;
    };

    /**
     * Get the pressure renderer parameter
     *
     * @method getPressureType
     * @returns {String} The pressure type
     */
    RenderingParameters.prototype.getPressureType = function () {
        return this.pressureType;
    };

    /**
     * Set the pressure renderer parameter
     *
     * @method setPressureType
     * @param {String} pressureType
     */
    RenderingParameters.prototype.setPressureType = function (pressureType) {
        this.pressureType = pressureType;
    };

    /**
     * Get the alpha renderer parameter
     *
     * @method getAlpha
     * @returns {String} The alpha
     */
    RenderingParameters.prototype.getAlpha = function () {
        return this.alpha;
    };

    /**
     * Set the alpha renderer parameter
     *
     * @method setAlpha
     * @param {String} alpha
     */
    RenderingParameters.prototype.setAlpha = function (alpha) {
        this.alpha = alpha;
    };

    /**
     * Get fade out ink fore HTML5 canvas
     *
     * @method getDoFadeOutLoop
     * @returns {Boolean}
     */
    RenderingParameters.prototype.getDoFadeOutLoop = function () {
        return this.doFadeOutLoop;
    };

    /**
     * Set fade out ink fore HTML5 canvas
     *
     * @method setDoFadeOutLoop
     * @param {Boolean} doFadeOutLoop
     */
    RenderingParameters.prototype.setDoFadeOutLoop = function (doFadeOutLoop) {
        this.doFadeOutLoop = doFadeOutLoop;
    };

    /**
     * This property is use to show or not show the bounding box
     *
     * @method getShowBoundingBoxes
     * @returns {Boolean}
     */
    RenderingParameters.prototype.getShowBoundingBoxes = function () {
        return this.showBoundingBoxes;
    };

    /**
     * Set the show state of bounding box
     *
     * @method setShowBoundingBoxes
     * @param {Boolean} showBoundingBoxes
     */
    RenderingParameters.prototype.setShowBoundingBoxes = function (showBoundingBoxes) {
        this.showBoundingBoxes = showBoundingBoxes;
    };

    // Export
    scope.RenderingParameters = RenderingParameters;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represent the Abstract Renderer. It's used to calculate the ink rendering in HTML5 canvas
     *
     * @class AbstractRenderer
     * @constructor
     */
    function AbstractRenderer () {
        this.points = [];
        this.drawing = false;
        this.parameters = new scope.RenderingParameters();
    }

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {RenderingParameters}
     */
    AbstractRenderer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {RenderingParameters} parameters
     */
    AbstractRenderer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Draw ink strokes on HTML5 canvas.
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {Object} recognitionResult
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw input components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawComponents = function (components, context, parameters) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.Stroke) {
                this.drawStroke(component, context, parameters);
            }
        }
    };

    /**
     * Record the beginning of drawing
     *
     * @method drawStart
     * @param {Object} event
     * @param {Number} x
     * @param {Number} y
     */
    AbstractRenderer.prototype.drawStart = function (event, x, y) {
        this.points.length = 0;
        this.drawing = true;
        this.points.push({
            x: x,
            y: y,
            pressure: 0.5,
            distance: 0.0,
            length: 0.0,
            ux: 0.0,
            uy: 0.0,
            x1: 0.0,
            x2: 0.0,
            y1: 0.0,
            y2: 0.0
        });
        event.preventDefault();
    };

    /**
     * Record the drawing
     *
     * @method drawContinue
     * @param {Object} event
     * @param {Number} x
     * @param {Number} y
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawContinue = function (event, x, y, context, parameters) {
        if (this.drawing) {
            var point = {
                x: x,
                y: y,
                pressure: 0.5,
                distance: 0.0,
                length: 0.0,
                ux: 0.0,
                uy: 0.0,
                x1: 0.0,
                x2: 0.0,
                y1: 0.0,
                y2: 0.0
            };
            this.points.push(point);

            if (this.points.length > 1) {
                var previous = this.points[this.points.length - 2];

                if (this.points.length === 2) {
                    this.drawQuadratricStart(previous, point, context, parameters);
                } else {
                    var third = this.points[this.points.length - 3];
                    this.drawQuadratricContinue(third, previous, point, context, parameters);
                }

            }
        }
    };

    /**
     * Stop record of drawing
     *
     * @method drawEnd
     * @param {Object} event
     * @param {Number} x
     * @param {Number} y
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawEnd = function (event, x, y, context, parameters) {
        if (this.drawing) {
            if (this.points.length === 1) {
                this.drawPoint({
                    x: x,
                    y: y,
                    pressure: 0.5,
                    distance: 0.0,
                    length: 0.0,
                    ux: 0.0,
                    uy: 0.0,
                    x1: 0.0,
                    x2: 0.0,
                    y1: 0.0,
                    y2: 0.0
                }, parameters, context);
            } else if (this.points.length > 1) {
                var lastPoint = this.points[this.points.length - 1];
                var point = this.points[this.points.length - 2];
                this.drawQuadratricEnd(point, lastPoint, context, parameters);
            }
            this.drawing = false;
            event.preventDefault();
        }
    };

    /**
     * Clear the context's canvas content to erase drawing strokes
     *
     * @method clear
     * @param {Object} context
     */
    AbstractRenderer.prototype.clear = function (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    /**
     * Draw guidelines on the HTML5 canvas
     *
     * @method drawGuidelines
     * @param {Number} horizontalSpacing
     * @param {Number} verticalSpacing
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawGuidelines = function (horizontalSpacing, verticalSpacing, context, parameters) {

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

            if (verticalSpacing) {
                for (var y = verticalSpacing; y < context.canvas.clientHeight - verticalSpacing; y += verticalSpacing) {
                    context.beginPath();
                    context.moveTo(horizontalSpacing, y);
                    context.lineTo(context.canvas.clientWidth - horizontalSpacing, y);
                    context.stroke();
                }
            }
            if (horizontalSpacing) {
                for (var x = horizontalSpacing; x < context.canvas.clientWidth - horizontalSpacing; x += horizontalSpacing) {
                    context.beginPath();
                    context.moveTo(x, verticalSpacing);
                    context.lineTo(x, context.canvas.clientHeight - verticalSpacing);
                    context.stroke();
                }
            }
        } finally {
            context.restore();
        }
    };

    /**
     * Trace line on context
     *
     * @method drawLineByCoordinates
     * @param {Number} lX
     * @param {Number} lY
     * @param {Number} cX
     * @param {Number} cY
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawLineByCoordinates = function (lX, lY, cX, cY, context, parameters) {
        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.beginPath();
            // line from
            context.moveTo(lX, lY);
            // to
            context.lineTo(cX, cY);
            // draw it
            context.stroke();
        } finally {
            context.restore();
        }
    };

    /**
     * Draw a line on context
     *
     * @method drawLineByPoints
     * @param {QuadraticPoint} firstPoint
     * @param {QuadraticPoint} lastPoint
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawLineByPoints = function (firstPoint, lastPoint, context, parameters) {
        this.drawLineByCoordinates(firstPoint.x, firstPoint.y, lastPoint.x, lastPoint.y, context, parameters);
    };

    /**
     * Draw a rectangle on context
     *
     * @method drawRectangle
     * @param {MyScript.Rectangle} rectangle
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawRectangle = function (rectangle, context, parameters) {

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getRectColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getRectColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());

        } finally {
            context.restore();
        }
    };

    /**
     * Draw strokes on context
     *
     * @method drawStrokes
     * @param {Stroke[]} strokes
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawStrokes = function (strokes, context, parameters) {
        for (var i in strokes) {
            this.drawStroke(strokes[i], context, parameters);
        }
    };

    /**
     * Draw a stroke on context
     *
     * @method drawStroke
     * @param {Object} stroke
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawStroke = function (stroke, context, parameters) {
        var strokePoints = [];
        for (var j = 0; j < stroke.getLength(); j++) {
            strokePoints.push(new scope.QuadraticPoint({
                x: stroke.getX()[j],
                y: stroke.getY()[j]
            }));
        }
        if (stroke.getLength() === 1) {
            this.drawPoint(strokePoints[0], context, parameters);
            return;
        }

        for (var k = 0; k < stroke.getLength(); k++) {
            if (k === 0) {
                var p1 = strokePoints[0];
                var p2 = strokePoints[1];
                this.drawQuadratricStart(p1, p2, context, parameters);
            } else if (k < stroke.getLength() - 1) {
                var p3 = strokePoints[k - 1];
                var p4 = strokePoints[k];
                var p5 = strokePoints[k + 1];
                this.drawQuadratricContinue(p3, p4, p5, context, parameters);
            } else if (k > 1) {
                var p6 = strokePoints[k - 1];
                var p7 = strokePoints[k];
                this.drawQuadratricEnd(p6, p7, context, parameters);
            }
        }
    };
    /**
     * Draw point on context
     *
     * @method drawPoint
     * @param {QuadraticPoint} point
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawPoint = function (point, context, parameters) {

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.beginPath();
            context.arc(point.x, point.y, 0.5 * parameters.getWidth(), 0, 2 * Math.PI);
            context.fill();
        } finally {
            context.restore();
        }

    };

    /**
     * Draw an arrow head on context
     *
     * @method drawArrowHead
     * @param {QuadraticPoint} headPoint
     * @param {Number} angle
     * @param {Number} length
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawArrowHead = function (headPoint, angle, length, context, parameters) {

        var alpha = phi(angle + Math.PI - (Math.PI / 8)),
            beta = phi(angle - Math.PI + (Math.PI / 8));

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.moveTo(headPoint.x, headPoint.y);
            context.beginPath();
            context.lineTo(headPoint.x + (length * Math.cos(alpha)), headPoint.y + (length * Math.sin(alpha)));
            context.lineTo(headPoint.x + (length * Math.cos(beta)), headPoint.y + (length * Math.sin(beta)));
            context.lineTo(headPoint.x, headPoint.y);
            context.fill();

        } finally {
            context.restore();
        }

    };

    /**
     * Get Strokes from inkRange
     *
     * @method extractStroke
     * @param {Stroke[]} strokes
     * @param {Object} inkRange
     * @result {Stroke[]} List of strokes from inkRange
     */
    AbstractRenderer.prototype.extractStroke = function (strokes, inkRange) {
        var result = [],
            firstPointIndex = Math.floor(inkRange.getFirstPoint()),
            lastPointIndex = Math.ceil(inkRange.getLastPoint());

        for (var strokeIndex = inkRange.getFirstStroke(); strokeIndex <= inkRange.getLastStroke(); strokeIndex++) {
            var currentStroke = strokes[strokeIndex];
            var currentStrokePointCount = currentStroke.x.length;

            var newStroke = new scope.Stroke(), x = [], y = [];

            for (var pointIndex = firstPointIndex; (strokeIndex === inkRange.getLastStroke() && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.getLastStroke() && pointIndex < currentStrokePointCount); pointIndex++) {
                x.push(currentStroke.x[pointIndex]);
                y.push(currentStroke.y[pointIndex]);
            }

            newStroke.setX(x);
            newStroke.setY(y);
            result.push(newStroke);
        }
        return result;
    };

    /**
     * Draw a quadratic stroke on context
     *
     * @private
     * @method drawQuadratricStart
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawQuadratricStart = function (p1, p2, context, parameters) {

        if (parameters) {
            computePoint(null, p1, true, false, parameters.getPressureType(), parameters.getWidth());
        } else {
            computePoint(null, p1, true, false, this.parameters.getPressureType(), this.parameters.getWidth());
        }

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.beginPath();
            strokeFirstSegment(p1, p2, context);
            context.fill();
        } finally {
            context.restore();
        }

    };

    /**
     * Continue to draw a quadratic stroke on context
     *
     * @private
     * @method drawQuadratricContinue
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {QuadraticPoint} p3
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawQuadratricContinue = function (p1, p2, p3, context, parameters) {

        if (parameters) {
            computePoint(p2, p3, false, false, parameters.getPressureType(), parameters.getWidth());
        } else {
            computePoint(p2, p3, false, false, this.parameters.getPressureType(), this.parameters.getWidth());
        }

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.beginPath();
            strokeSegment(p1, p2, p3, context);
            context.fill();
        } finally {
            context.restore();
        }
    };

    /**
     * Stop to draw a quadratic stroke
     *
     * @private
     * @method drawQuadratricEnd
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawQuadratricEnd = function (p1, p2, context, parameters) {

        if (parameters) {
            computePoint(p1, p2, false, true, parameters.getPressureType(), parameters.getWidth());
        } else {
            computePoint(p1, p2, false, true, this.parameters.getPressureType(), this.parameters.getWidth());
        }

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.beginPath();
            strokeLastSegment(p1, p2, context);
            context.fill();
        } finally {
            context.restore();
        }
    };

    /**
     * Render the first stroke segment.
     *
     * @private
     * @method strokeFirstSegment
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     */
    var strokeFirstSegment = function (p1, p2, context) {
        // compute start points
        var x11 = p1.x1,
            y11 = p1.y1,
            x12 = p1.x2,
            y12 = p1.y2,
        // compute end points
            x21 = 0.5 * p1.x1 + p2.x1,
            y21 = 0.5 * p1.y1 + p2.y1,
            x22 = 0.5 * p1.x2 + p2.x2,
            y22 = 0.5 * p1.y2 + p2.y2;

        // stroke segment
        context.moveTo(x11, y11);
        context.lineTo(x21, y21);
        context.lineTo(x22, y22);
        context.lineTo(x12, y12);
        context.lineTo(x11, y11);
    };

    /**
     * Render a stroke segment
     *
     * @private
     * @method strokeSegment
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {QuadraticPoint} p3
     * @param {Object} context
     */
    var strokeSegment = function (p1, p2, p3, context) {
        // compute start points
        var x11 = 0.5 * (p1.x1 + p2.x1),
            y11 = 0.5 * (p1.y1 + p2.y1),
            x12 = 0.5 * (p1.x2 + p2.x2),
            y12 = 0.5 * (p1.y2 + p2.y2),
        // compute end points
            x21 = 0.5 * (p2.x1 + p3.x1),
            y21 = 0.5 * (p2.y1 + p3.y1),
            x22 = 0.5 * (p2.x2 + p3.x2),
            y22 = 0.5 * (p2.y2 + p3.y2);
        // stroke segment
        context.moveTo(x11, y11);
        context.quadraticCurveTo(p2.x1, p2.y1, x21, y21);
        context.lineTo(x22, y22);
        context.quadraticCurveTo(p2.x2, p2.y2, x12, y12);
        context.lineTo(x11, y11);
    };

    /**
     * Render the last stroke segment
     *
     * @private
     * @method strokeLastSegment
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     */
    var strokeLastSegment = function (p1, p2, context) {
        // compute start points
        var x11 = 0.5 * (p1.x1 + p2.x1),
            y11 = 0.5 * (p1.y1 + p2.y1),
            x12 = 0.5 * (p1.x2 + p2.x2),
            y12 = 0.5 * (p1.y2 + p2.y2),
        // compute end points
            x21 = p2.x1,
            y21 = p2.y1,
            x22 = p2.x2,
            y22 = p2.y2;
        // stroke segment
        context.moveTo(x11, y11);
        context.lineTo(x21, y21);
        context.lineTo(x22, y22);
        context.lineTo(x12, y12);
        context.lineTo(x11, y11);
    };

    /**
     * Clamp an angle into the range [-PI, +PI]
     *
     * @private
     * @method phi
     * @param {Number} angle
     * @returns {Number}
     */
    var phi = function (angle) {
        angle = ((angle + Math.PI) % (Math.PI * 2)) - Math.PI;
        if (angle < -Math.PI) {
            angle += Math.PI * 2;
        }
        return angle;
    };

    /**
     * Compute all necessary point parameters to draw quadratics
     *
     * @private
     * @method computePoint
     * @param {QuadraticPoint} previous
     * @param {QuadraticPoint} point
     * @param {Boolean} isFirst
     * @param {Boolean} isLast
     * @param {String} pressureType
     * @param {Number} penWidth
     */
    var computePoint = function (previous, point, isFirst, isLast, pressureType, penWidth) {

        // compute distance from previous point
        if (previous !== null) {
            computeDistance(previous, point);
            var strokeLength = previous.length + point.distance;
            point.length = strokeLength;
        }
        // compute pressure
        switch (pressureType) {
            case 'SIMULATED':
                computePressure(point, point.distance, point.length);
                break;
            case 'CONSTANT':
                point.pressure = 1.0;
                break;
            case 'REAL':
                // keep the current pressure
                break;
        }
        computeLastControls(point, penWidth);
        // compute control points
        if (previous !== null && !isLast) {
            if (isFirst) {
                computeFirstControls(previous, point, penWidth);
            }
            if (isLast) {
                computeLastControls(point, penWidth);
            } else {
                computeControls(previous, point, penWidth);
            }
        }
    };

    /**
     * Compute distance and unit vector from the previous point.
     *
     * @private
     * @method computeDistance
     * @param {QuadraticPoint} previous
     * @param {QuadraticPoint} point
     */
    var computeDistance = function (previous, point) {
        var dx = point.x - previous.x,
            dy = point.y - previous.y,
            d = Math.sqrt(dx * dx + dy * dy);

        if (d !== 0) {
            point.distance = d;
            point.ux = dx / d;
            point.uy = dy / d;
        }
    };

    /**
     * Compute simulated pressure of given point.
     *
     * @private
     * @method computePressure
     * @param {QuadraticPoint} point
     * @param {Number} distance
     * @param {Number} length
     */
    var computePressure = function (point, distance, length) {
        var k, pressure;
        if (distance < 10) {
            k = 0.2 + Math.pow(0.1 * distance, 0.4);
        } else if (distance > length - 10) {
            k = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
        } else {
            k = 1.0;
        }

        pressure = k * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(point.distance));
        if (isNaN(parseFloat(pressure))) {
            pressure = 0.5;
        }
        point.pressure = pressure;
    };

    /**
     * Compute control points of the first point.
     *
     * @private
     * @method computeFirstControls
     * @param {QuadraticPoint} first First point of the list to be computed
     * @param {QuadraticPoint} next Next point
     * @param {Number} penWidth Pen width
     */
    var computeFirstControls = function (first, next, penWidth) {
        var r = 0.5 * penWidth * first.pressure,
            nx = -r * next.uy,
            ny = r * next.ux;

        first.x1 = first.x + nx;
        first.y1 = first.y + ny;
        first.x2 = first.x - nx;
        first.y1 = first.y - ny;
    };

    /**
     * Compute control points between two points.
     *
     * @private
     * @method computeControls
     * @param {QuadraticPoint} point Point to be computed
     * @param {QuadraticPoint} next Next point
     * @param {Number} penWidth Pen width
     */
    var computeControls = function (point, next, penWidth) {
        var ux = point.ux + next.ux,
            uy = point.uy + next.uy,
            u = Math.sqrt(ux * ux + uy * uy);

        if (u !== 0) {
            // compute control points
            var r = 0.5 * penWidth * point.pressure;
            var nx = -r * uy / u;
            var ny = r * ux / u;
            point.x1 = point.x + nx;
            point.y1 = point.y + ny;
            point.x2 = point.x - nx;
            point.y2 = point.y - ny;
        } else {
            // collapse control points
            point.x1 = point.x;
            point.y1 = point.y;
            point.x2 = point.x;
            point.y2 = point.y;
        }
    };

    /**
     * Compute control points of the last point.
     *
     * @private
     * @method computeLastControls
     * @param {QuadraticPoint} last Last point to be computed
     * @param {Number} penWidth Pen width
     */
    var computeLastControls = function (last, penWidth) {
        var r = 0.5 * penWidth * last.pressure,
            nx = -r * last.uy,
            ny = r * last.ux;

        last.x1 = last.x + nx;
        last.y1 = last.y + ny;
        last.x2 = last.x - nx;
        last.y2 = last.y - ny;
    };

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represent the Text Renderer. It's used to calculate the text ink rendering in HTML5 canvas
     *
     * @class TextRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function TextRenderer () {
        scope.AbstractRenderer.call(this);
        this.cloneStrokes = [];
        this.strokesToRemove = [];
    }

    /**
     * Inheritance property
     */
    TextRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    TextRenderer.prototype.constructor = TextRenderer;

    /**
     * Draw text strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {TextDocument} recognitionResult
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    TextRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, context, parameters) {
        this.drawStrokes(strokes, context, parameters);
    };

    /**
     * Draw input units
     *
     * @method drawInputUnits
     * @param {TextInputUnit[]} inputUnits
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    TextRenderer.prototype.drawInputUnits = function (inputUnits, context, parameters) {
        for (var i in inputUnits) {
            this.drawComponents(inputUnits[i].getComponents(), context, parameters);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractTextInputComponent[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    TextRenderer.prototype.drawComponents = function (components, context, parameters) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, context, parameters); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.CharInputComponent) {
                drawChar(component, context, parameters);
            } else if (component instanceof scope.CharacterInputComponent) {
                drawCharacter(component, context, parameters);
            } else if (component instanceof scope.StringInputComponent) {
                drawString(component, context, parameters);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw char
     *
     * @private
     * @method drawChar
     * @param {CharInputComponent} char
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawChar = function (char, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw character
     *
     * @private
     * @method drawCharacter
     * @param {CharacterInputComponent} character
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawCharacter = function (character, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw string
     *
     * @private
     * @method drawString
     * @param {StringInputComponent} string
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawString = function (string, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);

(function (scope) {
    'use strict';
    /**
     * Represent the Shape Renderer. It's used to calculate the shape ink rendering in HTML5 canvas
     *
     * @class ShapeRenderer
     * @constructor
     */
    function ShapeRenderer () {
        scope.AbstractRenderer.call(this);
    }

    /**
     * Inheritance property
     */
    ShapeRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    ShapeRenderer.prototype.constructor = ShapeRenderer;

    /**
     * Draw shape strokes on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {ShapeDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        this.drawShapes(strokes, recognitionResult.getSegments(), parameters, context);
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {Object[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawComponents = function (components, context, parameters) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, context, parameters); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.ShapeEllipse) {
                this.drawShapeEllipse(component, context, parameters);
            } else if (component instanceof scope.ShapeLine) {
                this.drawShapeLine(component, context, parameters);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw the shapes
     *
     * @method drawShapes
     * @param {Stroke[]} strokes
     * @param {ShapeSegment[]} shapes
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapes = function (strokes, shapes, context, parameters) {

        for (var i in shapes) {
            var segment = shapes[i];
            var candidate = segment.getSelectedCandidate();

            if (candidate) {
                if (candidate instanceof scope.ShapeRecognized) {
                    this.drawShapeRecognized(candidate, context, parameters);
                } else if (candidate instanceof scope.ShapeNotRecognized) {
                    this.drawShapeNotRecognized(strokes, segment.getInkRanges(), candidate, context, parameters);
                } else {
                    throw new Error('not implemented');
                }
            }
        }
    };

    /**
     * This method allow you to draw recognized shape
     *
     * @method drawShapeRecognized
     * @param {ShapeRecognized} shapeRecognized
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeRecognized = function (shapeRecognized, context, parameters) {

        var primitives = shapeRecognized.getPrimitives();

        for (var i in primitives) {
            this.drawShapePrimitive(primitives[i], context, parameters);
        }
        if (parameters.getShowBoundingBoxes()) {
            var rectangleList = [];

            for (var j in primitives) {
                // Primitive bounding rect
                rectangleList.push(this.getPrimitiveBoundingBox(primitives[j]));
            }
            // Bounding rect of the entire shape
            var boundingRect = scope.MathUtils.getBoundingRect(rectangleList);
            this.drawRectangle(boundingRect, context, parameters);
        }
    };

    /**
     * This method allow you to draw not recognized shape
     *
     * @method drawShapeNotRecognized
     * @param {ShapeInkRange[]} inkRanges
     * @param {ShapeNotRecognized} shapeNotRecognized
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeNotRecognized = function (strokes, inkRanges, shapeNotRecognized, context, parameters) {
        for (var i in inkRanges) {
            var extractedStrokes = this.extractStroke(strokes, inkRanges[i]);
            this.drawStrokes(extractedStrokes, context, parameters);
        }

    };

    /**
     * Draw shape primitive
     *
     * @method drawShapePrimitive
     * @param {AbstractShapePrimitive} primitive
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapePrimitive = function (primitive, context, parameters) {
        if (primitive instanceof scope.ShapeEllipse) {
            this.drawShapeEllipse(primitive, context, parameters);
        } else if (primitive instanceof scope.ShapeLine) {
            this.drawShapeLine(primitive, context, parameters);
        }
    };

    /**
     * Draw shape line
     *
     * @method drawShapeLine
     * @param {ShapeLine} shapeLine
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeLine = function (shapeLine, context, parameters) {

        this.drawLineByPoints(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), context, parameters);

        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, context, parameters);
        }

        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
     * @method drawEllipseArc
     * @param {ShapePoint} centerPoint
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {String} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     * @returns {Point[]}
     */
    ShapeRenderer.prototype.drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {

        var angleStep = 0.02; // angle delta between interpolated

        var z1 = Math.cos(orientation);
        var z3 = Math.sin(orientation);
        var z2 = z1;
        var z4 = z3;
        z1 *= maxRadius;
        z2 *= minRadius;
        z3 *= maxRadius;
        z4 *= minRadius;

        var n = Math.floor(Math.abs(sweepAngle) / angleStep);

        var boundariesPoints = [];

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.beginPath();

            for (var i = 0; i <= n; i++) {

                var angle = startAngle + (i / n) * sweepAngle; // points on the arc, in radian
                var alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

                var cosAlpha = Math.cos(alpha);
                var sinAlpha = Math.sin(alpha);

                // current point
                var x = centerPoint.x + z1 * cosAlpha - z4 * sinAlpha;
                var y = centerPoint.y + z2 * sinAlpha + z3 * cosAlpha;
                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

                if (i === 0 || i === n) {
                    boundariesPoints.push({x: x, y: y});
                }
            }

            context.stroke();

        } finally {
            context.restore();
        }

        return boundariesPoints;
    };

    /**
     * Draw shape ellipse
     *
     * @method drawShapeEllipse
     * @param {ShapeEllipse} shapeEllipse
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeEllipse = function (shapeEllipse, context, parameters) {

        var points = this.drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            context, parameters);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, context, parameters);
        }

        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Get the bounding box of primitive
     *
     * @method getPrimitiveBoundingBox
     * @param {AbstractShapePrimitive} primitive
     * @returns {Object} the bounding box
     */
    ShapeRenderer.prototype.getPrimitiveBoundingBox = function (primitive) {
        var rectangle = null;
        if (primitive instanceof scope.ShapeEllipse) {
            rectangle = scope.MathUtils.getEllipseArcRect(primitive.getCenter(), primitive.getMaxRadius(), primitive.getMinRadius(), primitive.getOrientation(), primitive.getStartAngle(), primitive.getSweepAngle());
        } else if (primitive instanceof scope.ShapeLine) {
            rectangle = scope.MathUtils.getLineRect(primitive.getFirstPoint(), primitive.getLastPoint());
        }
        return rectangle;
    };

    // Export
    scope.ShapeRenderer = ShapeRenderer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represent the Math Renderer. It's used to calculate the math ink rendering in HTML5 canvas
     *
     * @class MathRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function MathRenderer() {
        scope.AbstractRenderer.call(this);
        this.cloneStrokes = [];
        this.strokesToRemove = [];
    }

    /**
     * Inheritance property
     */
    MathRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    MathRenderer.prototype.constructor = MathRenderer;

    /**
     * Draw math strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {MathDocument} recognitionResult
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    MathRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, context, parameters) {
        var notScratchOutStrokes = this.removeScratchOutStrokes(strokes, recognitionResult.getScratchOutResults());

        for (var i in notScratchOutStrokes) {
            var stroke = notScratchOutStrokes[i];
            this.drawStroke(stroke, context, parameters);
        }
    };

    /**
     * Remove scratch out from input strokes
     *
     * @param {Stroke[]} strokes
     * @param {MathScratchOut[]} mathScratchOutResults
     * @returns {Stroke[]} notScratchOutStrokes
     */
    MathRenderer.prototype.removeScratchOutStrokes = function (strokes, mathScratchOutResults) {
        if (!mathScratchOutResults || mathScratchOutResults.length === 0) {
            return strokes;
        }

        var cloneStrokes = strokes.slice(0);
        var strokesToRemove = [];

        for (var k in mathScratchOutResults) {
            if (mathScratchOutResults[k].getErasedInkRanges()) {
                for (var n in mathScratchOutResults[k].getErasedInkRanges()) {
                    strokesToRemove.push(mathScratchOutResults[k].getErasedInkRanges()[n].getComponent());
                }
                for (var p in mathScratchOutResults[k].getInkRanges()) {
                    strokesToRemove.push(mathScratchOutResults[k].getInkRanges()[p].getComponent());
                }
            }
        }

        strokesToRemove.sort(function (a, b) {
            return b - a;
        });

        for (var z in strokesToRemove) {
            cloneStrokes.splice(strokesToRemove[z], 1);
        }
        return cloneStrokes;
    };

    // Export
    scope.MathRenderer = MathRenderer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represent the Music Renderer. It's used to calculate the music ink rendering in HTML5 canvas
     *
     * @class MusicRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function MusicRenderer () {
        scope.AbstractRenderer.call(this);
    }

    /**
     * Inheritance property
     */
    MusicRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    MusicRenderer.prototype.constructor = MusicRenderer;

    /**
     * Draw music strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {MusicDocument} recognitionResult
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    MusicRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, context, parameters) {
        var notScratchOutStrokes = this.removeScratchOutStrokes(strokes, recognitionResult.getScratchOutResults());
        this.drawStrokes(notScratchOutStrokes, context, parameters);
    };

    /**
     * Remove scratch out from input strokes
     *
     * @param {Stroke[]} strokes
     * @param {MusicScratchOut[]} scratchOutResults
     * @returns {Stroke[]} notScratchOutStrokes
     */
    MusicRenderer.prototype.removeScratchOutStrokes = function (strokes, scratchOutResults) {
        if (!scratchOutResults || scratchOutResults.length === 0) {
            return strokes;
        }

        var cloneStrokes = strokes.slice(0);
        var strokesToRemove = [];

        for (var k in scratchOutResults) {
            if (scratchOutResults[k].getErasedInputRanges()) {
                for (var l in scratchOutResults[k].getErasedInputRanges()) {
                    strokesToRemove.push(scratchOutResults[k].getErasedInputRanges()[l].getComponent());
                }
                for (var m in scratchOutResults[k].getInputRanges()) {
                    strokesToRemove.push(scratchOutResults[k].getInputRanges()[m].getComponent());
                }
            }
        }

        strokesToRemove.sort(function (a, b) {
            return b - a;
        });

        for (var z in strokesToRemove) {
            cloneStrokes.splice(strokesToRemove[z], 1);
        }
        return cloneStrokes;
    };

    /**
     * Draw staff on the HTML5 canvas
     *
     * @method staffDrawing
     * @param {MusicStaff} staff
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    MusicRenderer.prototype.drawStaff = function (staff, context, parameters) { // jshint ignore:line

        var staffHeight = staff.getTop() + ((staff.getCount() - 1) * staff.getGap());
//            var staves = Math.floor(context.canvas.clientHeight / staff.height);
        var staves = 1;

        context.beginPath();

        // Drawing horizontal staff lines
        for (var i = 0; i < staves; i++) {
            var offset = staffHeight * i;
            for (var j = 0; j < staff.getCount(); j++) {
                context.moveTo(0, (staff.getTop() + offset) + j * staff.getGap());
                context.lineTo(context.canvas.clientWidth, (staff.getTop() + offset) + j * staff.getGap());
            }
        }

        context.stroke();
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    MusicRenderer.prototype.drawComponents = function (components, context, parameters) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, context, parameters); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.MusicAccidentalInputComponent) {
                drawAccidental(component, context, parameters);
            } else if (component instanceof scope.MusicArpeggiateInputComponent) {
                drawArpeggiate(component, context, parameters);
            } else if (component instanceof scope.MusicBarInputComponent) {
                drawBar(component, context, parameters);
            } else if (component instanceof scope.MusicBeamInputComponent) {
                drawBeam(component, context, parameters);
            } else if (component instanceof scope.MusicClefInputComponent) {
                drawClef(component, context, parameters);
            } else if (component instanceof scope.MusicDecorationInputComponent) {
                drawDecoration(component, context, parameters);
            } else if (component instanceof scope.MusicDotsInputComponent) {
                drawDots(component, context, parameters);
            } else if (component instanceof scope.MusicHeadInputComponent) {
                drawHead(component, context, parameters);
            } else if (component instanceof scope.MusicLedgerLineInputComponent) {
                drawLedgerLine(component, context, parameters);
            } else if (component instanceof scope.MusicRestInputComponent) {
                drawRest(component, context, parameters);
            } else if (component instanceof scope.MusicStemInputComponent) {
                drawStem(component, context, parameters);
            } else if (component instanceof scope.MusicTieOrSlurInputComponent) {
                drawTieOrSlur(component, context, parameters);
            } else if (component instanceof scope.MusicTimeSignatureInputComponent) {
                drawTimeSignature(component, context, parameters);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw accidental
     *
     * @private
     * @method drawAccidental
     * @param {MusicAccidentalInputComponent} accidental
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawAccidental = function (accidental, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw arpeggiate
     *
     * @private
     * @method drawArpeggiate
     * @param {MusicArpeggiateInputComponent} arpeggiate
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawArpeggiate = function (arpeggiate, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw bar
     *
     * @private
     * @method drawBar
     * @param {MusicBarInputComponent} bar
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawBar = function (bar, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw beam
     *
     * @private
     * @method drawBeam
     * @param {MusicBeamInputComponent} beam
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawBeam = function (beam, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw clef
     *
     * @private
     * @method drawClef
     * @param {MusicClefInputComponent} clef
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawClef = function (clef, context, parameters) { // jshint ignore:line

        var imageObj = new Image();
        imageObj.onload = function () {
            var ratio = clef.getBoundingBox().getHeight() / this.height;
            clef.getBoundingBox().setWidth(this.width * ratio);
            context.drawImage(imageObj, clef.getBoundingBox().getX(), clef.getBoundingBox().getY(), clef.getBoundingBox().getWidth(), clef.getBoundingBox().getHeight());
        };
        imageObj.src = 'data:image/svg+xml,' + getClefSvg(clef.getValue());
    };

    /**
     * Get a svg representation of a music clef.
     *
     * @static
     * @method getClefSvg
     * @param {MusicClefInput|MusicClef} clef
     * @returns {String}
     */
    var getClefSvg = function (clef) {
        switch (clef.getSymbol()) {
            case 'F':
                return '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" x="0" y="0" width="18" height="20"><defs/><g transform="translate(6.600000e-3,3.125356e-3)"><g><path d="M17.3 3.1 C17.3 3.5 17.1 3.8 16.8 4.1 C16.5 4.4 15.9 4.5 15.5 4.3 C15 4.1 14.7 3.7 14.7 3.2 C14.6 2.8 14.8 2.5 15 2.2 C15.3 1.9 15.7 1.8 16 1.8 C16.4 1.8 16.8 2 17 2.3 C17.2 2.5 17.3 2.8 17.3 3.1 z"/></g><g><path d="M17.3 8.9 C17.3 9.3 17.1 9.7 16.8 9.9 C16.5 10.3 15.9 10.3 15.5 10.2 C15 10 14.7 9.5 14.7 9.1 C14.6 8.7 14.8 8.3 15 8 C15.3 7.8 15.7 7.6 16 7.6 C16.5 7.7 17 8 17.2 8.4 C17.2 8.6 17.3 8.8 17.3 8.9 z"/></g><g><path d="M13 7.2 C13 10 11.8 12.7 9.8 14.7 C7.3 17.2 4 18.8 0.7 19.8 C0.3 20.1 -0.4 19.8 0.3 19.4 C1.6 18.8 3 18.3 4.2 17.5 C7 15.8 9.3 13.1 9.8 9.9 C10.1 8 10.1 5.9 9.6 4 C9.2 2.6 8.2 1.1 6.7 0.9 C5.3 0.7 3.7 1.2 2.7 2.2 C2.5 2.4 2 3.2 2 4 C2.6 3.6 2.6 3.6 3.1 3.4 C4.2 2.9 5.7 3.6 6 4.9 C6.3 6 6.1 7.5 5 8.1 C3.8 8.7 2 8.5 1.4 7.2 C0.3 5.3 0.9 2.6 2.6 1.2 C4.4 -0.3 7.1 -0.3 9.2 0.4 C11.4 1.3 12.7 3.5 12.9 5.8 C13 6.2 13 6.7 13 7.2 z"/></g></g></svg>';
            case 'C':
                return '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="25"><defs/><g><g transform="matrix(1,0,0,1.030698,-309.364,-543.8647)"><path d="M 325.9 546.8 C 325.8 548.7 324.7 550.7 322.8 551.5 C 321.1 552.1 319.1 552.2 317.6 551 C 316.6 550.2 316.2 548.4 317.3 547.5 C 318.3 546.5 320.4 547.4 320.3 548.9 C 320.7 549.9 318.5 550.5 319.7 551.3 C 321 551.6 322.3 550.5 322.6 549.3 C 323.1 547.5 323.1 545.6 322.7 543.8 C 322.4 542.9 321.9 541.5 320.7 541.9 C 319.2 542.2 318.3 543.8 317.9 545.1 C 317.6 543.2 316.4 541.5 315 540.2 C 315 544.1 315 548 315 551.9 L 314.1 551.9 C 314.1 543.9 314.1 535.7 314.1 527.7 L 315 527.7 C 315 531.5 315 535.5 315 539.4 C 316.4 538.1 317.6 536.4 317.8 534.5 C 318.3 535.9 319.3 537.5 321 537.8 C 322.2 537.8 322.5 536.3 322.8 535.4 C 323.1 533.7 323.1 531.8 322.6 530.1 C 322.2 529 320.9 528 319.6 528.3 C 318.6 529 320.6 529.6 320.3 530.6 C 320.5 532 318.8 533 317.6 532.3 C 316.3 531.6 316.4 529.7 317.4 528.8 C 318 528.1 319.3 527.7 320.3 527.7 C 321.2 527.7 321.8 527.7 322.6 528 C 324.6 528.7 325.7 530.7 325.9 532.7 C 326.2 534.9 324.9 537.3 322.8 538.2 C 321.5 538.7 319.9 538.3 318.8 537.3 C 318.7 538.3 318.2 539.2 317.7 539.9 C 318.1 540.6 318.6 541.8 318.8 542.1 C 320.1 540.9 322.5 540.8 323.8 542 C 325.2 543.1 326.1 545 325.9 546.8 z "/></g><g transform="matrix(1,0,0,1.030928,-309.364,-543.9805)"><path d="M 312.2 551.9 L 309.4 551.9 L 309.4 527.7 L 312.2 527.7 L 312.2 551.9 z "/></g></g></svg>';
            case 'G':
                return '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="40"><defs/><path d="m 12 3.4 c 0.3 3.1 -2 5.6 -4.1 7.6 -0.9 0.9 -0.2 0.1 -0.6 0.6 -0.1 -0.5 -0.3 -1.7 -0.3 -2.1 0.1 -2.6 2.3 -6.5 4.2 -7.9 0.3 0.6 0.6 0.6 0.8 1.8 z m 0.7 15.9 c -1.2 -0.9 -2.8 -1.1 -4.3 -0.9 -0.2 -1.2 -0.4 -2.5 -0.6 -3.7 2.4 -2.3 4.9 -4.9 5 -8.4 0.1 -2.2 -0.3 -4.6 -1.7 -6.4 C 9.5 0.1 8.3 2.1 7.4 3.3 c -1.5 2.6 -1.1 5.8 -0.6 8.6 -0.8 0.9 -1.9 1.7 -2.7 2.7 -2.4 2.3 -4.4 5.3 -4 8.7 0.2 3.3 2.6 6.3 5.9 7.1 1.2 0.3 2.6 0.3 3.8 0.1 0.2 2.2 1 4.5 0.1 6.7 -0.7 1.6 -2.8 2.9 -4.3 2.2 -0.6 -0.3 -0.1 -0.1 -0.5 -0.2 1.1 -0.3 2 -1 2.3 -1.5 0.8 -1.4 -0.4 -3.6 -2.2 -3.3 -2.3 0 -3.2 3.1 -1.7 4.6 1.3 1.5 3.8 1.3 5.4 0.3 1.8 -1.2 2 -3.5 1.8 -5.5 -0.1 -0.7 -0.4 -2.6 -0.4 -3.3 0.7 -0.2 0.2 -0.1 1.2 -0.4 2.7 -1 4.4 -4.2 3.6 -7 -0.3 -1.4 -1 -2.9 -2.3 -3.7 z m 0.6 5.7 c 0.2 2 -1.1 4.2 -3.1 4.9 -0.1 -0.8 -0.2 -1 -0.3 -1.4 -0.5 -2.4 -0.7 -4.9 -1.1 -7.3 1.6 -0.2 3.5 0.5 4 2.1 0.2 0.6 0.3 1.2 0.4 1.8 z m -5.1 5.1 c -2.5 0.1 -5 -1.6 -5.6 -4 -0.7 -2.1 -0.5 -4.5 0.8 -6.4 1.1 -1.7 2.6 -3 4 -4.5 0.2 1.1 0.4 2.2 0.5 3.3 -3 0.8 -5 4.6 -3.2 7.3 0.5 0.8 2 2.2 2.8 1.6 -1.1 -0.7 -2 -1.8 -1.8 -3.2 -0.1 -1.3 1.4 -2.9 2.7 -3.1 0.4 2.8 0.9 6 1.4 8.8 -0.5 0.1 -1 0.1 -1.5 0.1 z"/></svg>';
            default:
                return '';
        }
    };

    /**
     * Draw decoration
     *
     * @private
     * @method drawDecoration
     * @param {MusicDecorationInputComponent} decoration
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawDecoration = function (decoration, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw dots
     *
     * @private
     * @method drawDots
     * @param {MusicDotsInputComponent} dots
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawDots = function (dots, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw head
     *
     * @private
     * @method drawHead
     * @param {MusicHeadInputComponent} head
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawHead = function (head, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw ledgerLine
     *
     * @private
     * @method drawLedgerLine
     * @param {MusicLedgerLineInputComponent} ledgerLine
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawLedgerLine = function (ledgerLine, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw rest
     *
     * @private
     * @method drawRest
     * @param {MusicRestInputComponent} rest
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawRest = function (rest, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw stem
     *
     * @private
     * @method drawStem
     * @param {MusicStemInputComponent} stem
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawStem = function (stem, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw tieOrSlur
     *
     * @private
     * @method drawTieOrSlur
     * @param {MusicTieOrSlurInputComponent} tieOrSlur
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawTieOrSlur = function (tieOrSlur, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw timeSignature
     *
     * @private
     * @method drawTimeSignature
     * @param {MusicTimeSignatureInputComponent} timeSignature
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawTimeSignature = function (timeSignature, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.MusicRenderer = MusicRenderer;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Represent the Analyzer Renderer. It's used to calculate the analyzer ink rendering in HTML5 canvas
     *
     * @class AnalyzerRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function AnalyzerRenderer () {
        scope.AbstractRenderer.call(this);
    }

    /**
     * Inheritance property
     */
    AnalyzerRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    AnalyzerRenderer.prototype.constructor = AnalyzerRenderer;

    /**
     * Draw shape strokes on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {AnalyzerDocument} recognitionResult
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, context, parameters) {
        this.drawShapes(strokes, recognitionResult.getShapes(), context, parameters);
        this.drawTables(strokes, recognitionResult.getTables(), context, parameters);
        this.drawTextLines(strokes, recognitionResult.getTextLines(), context, parameters);
//        this.drawGroups(strokes, recognitionResult.getGroups(), context, parameters); // TODO: not implemented
    };

    /**
     * Draw table
     *
     * @method drawTables
     * @param {Stroke[]} strokes
     * @param {AnalyzerTable[]} tables
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawTables = function (strokes, tables, context, parameters) {
        for (var i in tables) {
            if (parameters.getShowBoundingBoxes()) {
                for (var j in tables[i].getCells()) {
                    this.drawCell(tables[i].getCells()[j], context, parameters);
                }
            }
            for (var k in tables[i].getLines()) {
                this.drawLine(tables[i].getLines()[k], context, parameters);
            }
        }
    };

    /**
     * Draw the text line
     *
     * @method drawTextLines
     * @param {Stroke[]} strokes
     * @param {AnalyzerTextLine[]} textLines
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawTextLines = function (strokes, textLines, context, parameters) {

        for (var i in textLines) {
            var textLine = textLines[i];
            var data = textLine.getData();
            if (data) {

                if (parameters.getShowBoundingBoxes()) {
                    this.drawRectangle(data.getBoundingBox(), context, parameters);
                }

                var text = textLine.getTextDocument().getTextSegmentResult().getSelectedCandidate().getLabel();
                this.drawText(data.getBoundingBox(), text, data.getJustificationType(), data.getTextHeight(), data.getBaselinePos(), context, parameters);

                var underlines = textLine.getUnderlineList();
                for (var j in underlines) {
                    this.drawUnderline(data.getBoundingBox(), underlines[j], text, data.getTextHeight(), data.getBaselinePos() + data.getTextHeight() / 10, context, parameters);
                }
            }
        }
    };

    /**
     * Draw text on analyser
     *
     * @method drawText
     * @param {MyScript.Rectangle} boundingBox
     * @param {String} text
     * @param {String} justificationType
     * @param {Number} textHeight
     * @param {Number} baseline
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawText = function (boundingBox, text, justificationType, textHeight, baseline, context, parameters) {

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
                context.font = parameters.getDecoration() + textHeight + 'px ' + parameters.getFont();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
                context.font = this.parameters.getDecoration() + textHeight + 'px ' + this.parameters.getFont();
            }
            context.textAlign = (justificationType === 'CENTER')? 'center': 'left';

            context.fillText(text, boundingBox.getX(), baseline, boundingBox.getWidth());

        } finally {
            context.restore();
        }
    };

    /**
     * Draw Underline
     *
     * @method drawUnderline
     * @param {Rectangle} boundingBox
     * @param {AnalyzerUnderline} underline
     * @param {String} text
     * @param {Number} textHeight
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawUnderline = function (boundingBox, underline, text, textHeight, baseline, context, parameters) {
        var topLeft = boundingBox.getTopLeftPoint();
        var firstCharacter = underline.getData().getFirstCharacter();
        var lastCharacter = underline.getData().getLastCharacter();

        if (parameters) {
            context.font = parameters.getDecoration() + textHeight + 'px ' + parameters.getFont();
        } else {
            context.font = this.parameters.getDecoration() + textHeight + 'px ' + this.parameters.getFont();
        }

        var textMetrics = context.measureText(text.substring(0, firstCharacter));
        var x1 = topLeft.x + textMetrics.width;

        textMetrics = context.measureText(text.substring(firstCharacter, lastCharacter + 1));
        var x2 = x1 + textMetrics.width;
        this.drawLine(new scope.AnalyzerLine({data: new scope.AnalyzerLineData({p1 :{x: x1,y: baseline},p2:{x: x2,y: baseline}})}), context, parameters);
    };

    /**
     * Draw Groups
     *
     * @method drawGroups
     * @param {Stroke[]} strokes
     * @param {AnalyzerGroup[]} groups
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawGroups = function (strokes, groups, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw a line
     *
     * @method drawLine
     * @param {AnalyzerLine} line
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawLine = function (line, context, parameters) {
        if (line.getData()) {
            this.drawLineByPoints(line.getData().getP1(), line.getData().getP2(), context, parameters);
        }
    };

    /**
     * Draw a cell
     *
     * @method drawCell
     * @param {AnalyzerCell} cell
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawCell = function (cell, context, parameters) {
        if (cell.getData()) {
            this.drawRectangle(cell.getData().getBoundingBox(), context, parameters);
        }
    };

    /**
     * Draw the shapes
     *
     * @method drawShapes
     * @param {Stroke[]} strokes
     * @param {ShapeSegment[]} shapes
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawShapes = function (strokes, shapes, context, parameters) {

        for (var i in shapes) {
            var segment = shapes[i];
            var candidate = segment.getSelectedCandidate();

            if (candidate) {
                if (candidate instanceof scope.ShapeRecognized) {
                    this.drawShapeRecognized(candidate, context, parameters);
                } else if (candidate instanceof scope.ShapeNotRecognized) {
                    this.drawShapeNotRecognized(strokes, segment.getInkRanges(), candidate, context, parameters);
                } else {
                    throw new Error('not implemented');
                }
            }
        }
    };

    /**
     * This method allow you to draw recognized shape
     *
     * @method drawShapeRecognized
     * @param {ShapeRecognized} shapeRecognized
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawShapeRecognized = function (shapeRecognized, context, parameters) {

        var primitives = shapeRecognized.getPrimitives();

        for (var i in primitives) {
            this.drawShapePrimitive(primitives[i], context, parameters);
        }
        if (parameters.getShowBoundingBoxes()) {
            var rectangleList = [];

            for (var j in primitives) {
                // Primitive bounding rect
                rectangleList.push(this.getPrimitiveBoundingBox(primitives[j]));
            }
            // Bounding rect of the entire shape
            var boundingRect = scope.MathUtils.getBoundingRect(rectangleList);
            this.drawRectangle(boundingRect, context, parameters);
        }
    };

    /**
     * This method allow you to draw not recognized shape
     *
     * @method drawShapeNotRecognized
     * @param {Stroke[]} strokes
     * @param {AnalyzerInkRange[]} inkRanges
     * @param {ShapeNotRecognized} shapeNotRecognized
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawShapeNotRecognized = function (strokes, inkRanges, shapeNotRecognized, context, parameters) {
        for (var i in inkRanges) {
            var extractedStrokes = this.extractStroke(strokes, inkRanges[i]);
            this.drawStrokes(extractedStrokes, context, parameters);
        }

    };

    /**
     * Draw shape primitive
     *
     * @method drawShapePrimitive
     * @param {AbstractShapePrimitive} primitive
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawShapePrimitive = function (primitive, context, parameters) {
        if (primitive instanceof scope.ShapeEllipse) {
            this.drawShapeEllipse(primitive, context, parameters);
        } else if (primitive instanceof scope.ShapeLine) {
            this.drawShapeLine(primitive, context, parameters);
        }
    };

    /**
     * Draw shape line
     *
     * @method drawShapeLine
     * @param {ShapeLine} shapeLine
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawShapeLine = function (shapeLine, context, parameters) {

        this.drawLineByPoints(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), context, parameters);

        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, context, parameters);
        }

        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
     * @method drawEllipseArc
     * @param {ShapePoint} centerPoint
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {String} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     * @returns {Point[]}
     */
    AnalyzerRenderer.prototype.drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {

        var angleStep = 0.02; // angle delta between interpolated

        var z1 = Math.cos(orientation);
        var z3 = Math.sin(orientation);
        var z2 = z1;
        var z4 = z3;
        z1 *= maxRadius;
        z2 *= minRadius;
        z3 *= maxRadius;
        z4 *= minRadius;

        var n = Math.floor(Math.abs(sweepAngle) / angleStep);

        var boundariesPoints = [];

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.parameters.getColor();
                context.strokeStyle = this.parameters.getColor();
                context.globalAlpha = this.parameters.getAlpha();
                context.lineWidth = 0.5 * this.parameters.getWidth();
            }

            context.beginPath();

            for (var i = 0; i <= n; i++) {

                var angle = startAngle + (i / n) * sweepAngle; // points on the arc, in radian
                var alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

                var cosAlpha = Math.cos(alpha);
                var sinAlpha = Math.sin(alpha);

                // current point
                var x = centerPoint.x + z1 * cosAlpha - z4 * sinAlpha;
                var y = centerPoint.y + z2 * sinAlpha + z3 * cosAlpha;
                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

                if (i === 0 || i === n) {
                    boundariesPoints.push({x: x, y: y});
                }
            }

            context.stroke();

        } finally {
            context.restore();
        }

        return boundariesPoints;
    };

    /**
     * Draw shape ellipse
     *
     * @method drawShapeEllipse
     * @param {ShapeEllipse} shapeEllipse
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawShapeEllipse = function (shapeEllipse, context, parameters) {

        var points = this.drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            context, parameters);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, context, parameters);
        }

        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Get the bounding box of primitive
     *
     * @method getPrimitiveBoundingBox
     * @param {AbstractShapePrimitive} primitive
     * @returns {MyScript.Rectangle} rectangle
     */
    AnalyzerRenderer.prototype.getPrimitiveBoundingBox = function (primitive) {
        var rectangle = null;
        if (primitive instanceof scope.ShapeEllipse) {
            rectangle = scope.MathUtils.getEllipseArcRect(primitive.getCenter(), primitive.getMaxRadius(), primitive.getMinRadius(), primitive.getOrientation(), primitive.getStartAngle(), primitive.getSweepAngle());
        } else if (primitive instanceof scope.ShapeLine) {
            rectangle = scope.MathUtils.getLineRect(primitive.getFirstPoint(), primitive.getLastPoint());
        }
        return rectangle;
    };

    // Export
    scope.AnalyzerRenderer = AnalyzerRenderer;
})(MyScript);
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
/**
 * CryptoJS core components.
 */
var CryptoJS = CryptoJS || (function (Math, undefined) {
    /**
     * CryptoJS namespace.
     */
    var C = {};

    /**
     * Library namespace.
     */
    var C_lib = C.lib = {};

    /**
     * Base object for prototypal inheritance.
     */
    var Base = C_lib.Base = (function () {
        function F() {}

        return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function (overrides) {
                // Spawn
                F.prototype = this;
                var subtype = new F();

                // Augment
                if (overrides) {
                    subtype.mixIn(overrides);
                }

                // Create default initializer
                if (!subtype.hasOwnProperty('init')) {
                    subtype.init = function () {
                        subtype.$super.init.apply(this, arguments);
                    };
                }

                // Initializer's prototype is the subtype object
                subtype.init.prototype = subtype;

                // Reference supertype
                subtype.$super = this;

                return subtype;
            },

            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function () {
                var instance = this.extend();
                instance.init.apply(instance, arguments);

                return instance;
            },

            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function () {
            },

            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function (properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }

                // IE won't copy toString using the loop above
                if (properties.hasOwnProperty('toString')) {
                    this.toString = properties.toString;
                }
            },

            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function () {
                return this.init.prototype.extend(this);
            }
        };
    }());

    /**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var WordArray = C_lib.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of 32-bit words.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.create();
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
         */
        init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        },

        /**
         * Converts this word array to a string.
         *
         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
         *
         * @return {string} The stringified word array.
         *
         * @example
         *
         *     var string = wordArray + '';
         *     var string = wordArray.toString();
         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
         */
        toString: function (encoder) {
            return (encoder || Hex).stringify(this);
        },

        /**
         * Concatenates a word array to this word array.
         *
         * @param {WordArray} wordArray The word array to append.
         *
         * @return {WordArray} This word array.
         *
         * @example
         *
         *     wordArray1.concat(wordArray2);
         */
        concat: function (wordArray) {
            // Shortcuts
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;

            // Clamp excess bits
            this.clamp();

            // Concat
            if (thisSigBytes % 4) {
                // Copy one byte at a time
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                }
            } else if (thatWords.length > 0xffff) {
                // Copy one word at a time
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                }
            } else {
                // Copy all words at once
                thisWords.push.apply(thisWords, thatWords);
            }
            this.sigBytes += thatSigBytes;

            // Chainable
            return this;
        },

        /**
         * Removes insignificant bits.
         *
         * @example
         *
         *     wordArray.clamp();
         */
        clamp: function () {
            // Shortcuts
            var words = this.words;
            var sigBytes = this.sigBytes;

            // Clamp
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
            words.length = Math.ceil(sigBytes / 4);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {WordArray} The clone.
         *
         * @example
         *
         *     var clone = wordArray.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);

            return clone;
        },

        /**
         * Creates a word array filled with random bytes.
         *
         * @param {number} nBytes The number of random bytes to generate.
         *
         * @return {WordArray} The random word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.random(16);
         */
        random: function (nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
                words.push((Math.random() * 0x100000000) | 0);
            }

            return new WordArray.init(words, nBytes);
        }
    });

    /**
     * Encoder namespace.
     */
    var C_enc = C.enc = {};

    /**
     * Hex encoding strategy.
     */
    var Hex = C_enc.Hex = {
        /**
         * Converts a word array to a hex string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The hex string.
         *
         * @static
         *
         * @example
         *
         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 0x0f).toString(16));
            }

            return hexChars.join('');
        },

        /**
         * Converts a hex string to a word array.
         *
         * @param {string} hexStr The hex string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
         */
        parse: function (hexStr) {
            // Shortcut
            var hexStrLength = hexStr.length;

            // Convert
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
            }

            return new WordArray.init(words, hexStrLength / 2);
        }
    };

    /**
     * Latin1 encoding strategy.
     */
    var Latin1 = C_enc.Latin1 = {
        /**
         * Converts a word array to a Latin1 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Latin1 string.
         *
         * @static
         *
         * @example
         *
         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                latin1Chars.push(String.fromCharCode(bite));
            }

            return latin1Chars.join('');
        },

        /**
         * Converts a Latin1 string to a word array.
         *
         * @param {string} latin1Str The Latin1 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
         */
        parse: function (latin1Str) {
            // Shortcut
            var latin1StrLength = latin1Str.length;

            // Convert
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
            }

            return new WordArray.init(words, latin1StrLength);
        }
    };

    /**
     * UTF-8 encoding strategy.
     */
    var Utf8 = C_enc.Utf8 = {
        /**
         * Converts a word array to a UTF-8 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The UTF-8 string.
         *
         * @static
         *
         * @example
         *
         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
         */
        stringify: function (wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error('Malformed UTF-8 data');
            }
        },

        /**
         * Converts a UTF-8 string to a word array.
         *
         * @param {string} utf8Str The UTF-8 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
         */
        parse: function (utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
    };

    /**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        /**
         * Resets this block algorithm's data buffer to its initial state.
         *
         * @example
         *
         *     bufferedBlockAlgorithm.reset();
         */
        reset: function () {
            // Initial values
            this._data = new WordArray.init();
            this._nDataBytes = 0;
        },

        /**
         * Adds new data to this block algorithm's buffer.
         *
         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
         *
         * @example
         *
         *     bufferedBlockAlgorithm._append('data');
         *     bufferedBlockAlgorithm._append(wordArray);
         */
        _append: function (data) {
            // Convert string to WordArray, else assume WordArray already
            if (typeof data == 'string') {
                data = Utf8.parse(data);
            }

            // Append
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
        },

        /**
         * Processes available data blocks.
         *
         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
         *
         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
         *
         * @return {WordArray} The processed data.
         *
         * @example
         *
         *     var processedData = bufferedBlockAlgorithm._process();
         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
         */
        _process: function (doFlush) {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;

            // Count blocks ready
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
                // Round up to include partial blocks
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                // Round down to include only full blocks,
                // less the number of blocks that must remain in the buffer
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }

            // Count words ready
            var nWordsReady = nBlocksReady * blockSize;

            // Count bytes ready
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

            // Process blocks
            if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    // Perform concrete-algorithm logic
                    this._doProcessBlock(dataWords, offset);
                }

                // Remove processed words
                var processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
            }

            // Return processed words
            return new WordArray.init(processedWords, nBytesReady);
        },

        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = bufferedBlockAlgorithm.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();

            return clone;
        },

        _minBufferSize: 0
    });

    /**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        /**
         * Configuration options.
         */
        cfg: Base.extend(),

        /**
         * Initializes a newly created hasher.
         *
         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
         *
         * @example
         *
         *     var hasher = CryptoJS.algo.SHA256.create();
         */
        init: function (cfg) {
            // Apply config defaults
            this.cfg = this.cfg.extend(cfg);

            // Set initial values
            this.reset();
        },

        /**
         * Resets this hasher to its initial state.
         *
         * @example
         *
         *     hasher.reset();
         */
        reset: function () {
            // Reset data buffer
            BufferedBlockAlgorithm.reset.call(this);

            // Perform concrete-hasher logic
            this._doReset();
        },

        /**
         * Updates this hasher with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {Hasher} This hasher.
         *
         * @example
         *
         *     hasher.update('message');
         *     hasher.update(wordArray);
         */
        update: function (messageUpdate) {
            // Append
            this._append(messageUpdate);

            // Update the hash
            this._process();

            // Chainable
            return this;
        },

        /**
         * Finalizes the hash computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The hash.
         *
         * @example
         *
         *     var hash = hasher.finalize();
         *     var hash = hasher.finalize('message');
         *     var hash = hasher.finalize(wordArray);
         */
        finalize: function (messageUpdate) {
            // Final message update
            if (messageUpdate) {
                this._append(messageUpdate);
            }

            // Perform concrete-hasher logic
            var hash = this._doFinalize();

            return hash;
        },

        blockSize: 512/32,

        /**
         * Creates a shortcut function to a hasher's object interface.
         *
         * @param {Hasher} hasher The hasher to create a helper for.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
         */
        _createHelper: function (hasher) {
            return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        },

        /**
         * Creates a shortcut function to the HMAC's object interface.
         *
         * @param {Hasher} hasher The hasher to use in this HMAC helper.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
         */
        _createHmacHelper: function (hasher) {
            return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        }
    });

    /**
     * Algorithm namespace.
     */
    var C_algo = C.algo = {};

    return C;
}(Math));

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var X32WordArray = C_lib.WordArray;

    /**
     * x64 namespace.
     */
    var C_x64 = C.x64 = {};

    /**
     * A 64-bit word.
     */
    var X64Word = C_x64.Word = Base.extend({
        /**
         * Initializes a newly created 64-bit word.
         *
         * @param {number} high The high 32 bits.
         * @param {number} low The low 32 bits.
         *
         * @example
         *
         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
         */
        init: function (high, low) {
            this.high = high;
            this.low = low;
        }

        /**
         * Bitwise NOTs this word.
         *
         * @return {X64Word} A new x64-Word object after negating.
         *
         * @example
         *
         *     var negated = x64Word.not();
         */
        // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Bitwise ANDs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to AND with this word.
         *
         * @return {X64Word} A new x64-Word object after ANDing.
         *
         * @example
         *
         *     var anded = x64Word.and(anotherX64Word);
         */
        // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Bitwise ORs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to OR with this word.
         *
         * @return {X64Word} A new x64-Word object after ORing.
         *
         * @example
         *
         *     var ored = x64Word.or(anotherX64Word);
         */
        // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Bitwise XORs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to XOR with this word.
         *
         * @return {X64Word} A new x64-Word object after XORing.
         *
         * @example
         *
         *     var xored = x64Word.xor(anotherX64Word);
         */
        // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Shifts this word n bits to the left.
         *
         * @param {number} n The number of bits to shift.
         *
         * @return {X64Word} A new x64-Word object after shifting.
         *
         * @example
         *
         *     var shifted = x64Word.shiftL(25);
         */
        // shiftL: function (n) {
            // if (n < 32) {
                // var high = (this.high << n) | (this.low >>> (32 - n));
                // var low = this.low << n;
            // } else {
                // var high = this.low << (n - 32);
                // var low = 0;
            // }

            // return X64Word.create(high, low);
        // },

        /**
         * Shifts this word n bits to the right.
         *
         * @param {number} n The number of bits to shift.
         *
         * @return {X64Word} A new x64-Word object after shifting.
         *
         * @example
         *
         *     var shifted = x64Word.shiftR(7);
         */
        // shiftR: function (n) {
            // if (n < 32) {
                // var low = (this.low >>> n) | (this.high << (32 - n));
                // var high = this.high >>> n;
            // } else {
                // var low = this.high >>> (n - 32);
                // var high = 0;
            // }

            // return X64Word.create(high, low);
        // },

        /**
         * Rotates this word n bits to the left.
         *
         * @param {number} n The number of bits to rotate.
         *
         * @return {X64Word} A new x64-Word object after rotating.
         *
         * @example
         *
         *     var rotated = x64Word.rotL(25);
         */
        // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
        // },

        /**
         * Rotates this word n bits to the right.
         *
         * @param {number} n The number of bits to rotate.
         *
         * @return {X64Word} A new x64-Word object after rotating.
         *
         * @example
         *
         *     var rotated = x64Word.rotR(7);
         */
        // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
        // },

        /**
         * Adds this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to add with this word.
         *
         * @return {X64Word} A new x64-Word object after adding.
         *
         * @example
         *
         *     var added = x64Word.add(anotherX64Word);
         */
        // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;

            // return X64Word.create(high, low);
        // }
    });

    /**
     * An array of 64-bit words.
     *
     * @property {Array} words The array of CryptoJS.x64.Word objects.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var X64WordArray = C_x64.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.x64.WordArray.create();
         *
         *     var wordArray = CryptoJS.x64.WordArray.create([
         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
         *     ]);
         *
         *     var wordArray = CryptoJS.x64.WordArray.create([
         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
         *     ], 10);
         */
        init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 8;
            }
        },

        /**
         * Converts this 64-bit word array to a 32-bit word array.
         *
         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
         *
         * @example
         *
         *     var x32WordArray = x64WordArray.toX32();
         */
        toX32: function () {
            // Shortcuts
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;

            // Convert
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
            }

            return X32WordArray.create(x32Words, this.sigBytes);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {X64WordArray} The clone.
         *
         * @example
         *
         *     var clone = x64WordArray.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);

            // Clone "words" array
            var words = clone.words = this.words.slice(0);

            // Clone each X64Word object
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
            }

            return clone;
        }
    });
}());

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;

    function X64Word_create() {
        return X64Word.create.apply(X64Word, arguments);
    }

    // Constants
    var K = [
        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
    ];

    // Reusable objects
    var W = [];
    (function () {
        for (var i = 0; i < 80; i++) {
            W[i] = X64Word_create();
        }
    }());

    /**
     * SHA-512 hash algorithm.
     */
    var SHA512 = C_algo.SHA512 = Hasher.extend({
        _doReset: function () {
            this._hash = new X64WordArray.init([
                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
            ]);
        },

        _doProcessBlock: function (M, offset) {
            // Shortcuts
            var H = this._hash.words;

            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];

            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;

            // Working variables
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;

            // Rounds
            for (var i = 0; i < 80; i++) {
                // Shortcut
                var Wi = W[i];

                // Extend message
                if (i < 16) {
                    var Wih = Wi.high = M[offset + i * 2]     | 0;
                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
                } else {
                    // Gamma0
                    var gamma0x  = W[i - 15];
                    var gamma0xh = gamma0x.high;
                    var gamma0xl = gamma0x.low;
                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

                    // Gamma1
                    var gamma1x  = W[i - 2];
                    var gamma1xh = gamma1x.high;
                    var gamma1xl = gamma1x.low;
                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
                    var Wi7  = W[i - 7];
                    var Wi7h = Wi7.high;
                    var Wi7l = Wi7.low;

                    var Wi16  = W[i - 16];
                    var Wi16h = Wi16.high;
                    var Wi16l = Wi16.low;

                    var Wil = gamma0l + Wi7l;
                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                    var Wil = Wil + gamma1l;
                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                    var Wil = Wil + Wi16l;
                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

                    Wi.high = Wih;
                    Wi.low  = Wil;
                }

                var chh  = (eh & fh) ^ (~eh & gh);
                var chl  = (el & fl) ^ (~el & gl);
                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

                // t1 = h + sigma1 + ch + K[i] + W[i]
                var Ki  = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;

                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

                // t2 = sigma0 + maj
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

                // Update working variables
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = (dl + t1l) | 0;
                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = (t1l + t2l) | 0;
                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
            }

            // Intermediate hash value
            H0l = H0.low  = (H0l + al);
            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
            H1l = H1.low  = (H1l + bl);
            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
            H2l = H2.low  = (H2l + cl);
            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
            H3l = H3.low  = (H3l + dl);
            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
            H4l = H4.low  = (H4l + el);
            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
            H5l = H5.low  = (H5l + fl);
            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
            H6l = H6.low  = (H6l + gl);
            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
            H7l = H7.low  = (H7l + hl);
            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Convert hash to 32-bit word array before returning
            var hash = this._hash.toX32();

            // Return final computed hash
            return hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        },

        blockSize: 1024/32
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA512('message');
     *     var hash = CryptoJS.SHA512(wordArray);
     */
    C.SHA512 = Hasher._createHelper(SHA512);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA512(message, key);
     */
    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
}());

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var C_algo = C.algo;

    /**
     * HMAC algorithm.
     */
    var HMAC = C_algo.HMAC = Base.extend({
        /**
         * Initializes a newly created HMAC.
         *
         * @param {Hasher} hasher The hash algorithm to use.
         * @param {WordArray|string} key The secret key.
         *
         * @example
         *
         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
         */
        init: function (hasher, key) {
            // Init hasher
            hasher = this._hasher = new hasher.init();

            // Convert string to WordArray, else assume WordArray already
            if (typeof key == 'string') {
                key = Utf8.parse(key);
            }

            // Shortcuts
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;

            // Allow arbitrary length keys
            if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
            }

            // Clamp excess bits
            key.clamp();

            // Clone key for inner and outer pads
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();

            // Shortcuts
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;

            // XOR keys with pad constants
            for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 0x5c5c5c5c;
                iKeyWords[i] ^= 0x36363636;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

            // Set initial values
            this.reset();
        },

        /**
         * Resets this HMAC to its initial state.
         *
         * @example
         *
         *     hmacHasher.reset();
         */
        reset: function () {
            // Shortcut
            var hasher = this._hasher;

            // Reset
            hasher.reset();
            hasher.update(this._iKey);
        },

        /**
         * Updates this HMAC with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {HMAC} This HMAC instance.
         *
         * @example
         *
         *     hmacHasher.update('message');
         *     hmacHasher.update(wordArray);
         */
        update: function (messageUpdate) {
            this._hasher.update(messageUpdate);

            // Chainable
            return this;
        },

        /**
         * Finalizes the HMAC computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The HMAC.
         *
         * @example
         *
         *     var hmac = hmacHasher.finalize();
         *     var hmac = hmacHasher.finalize('message');
         *     var hmac = hmacHasher.finalize(wordArray);
         */
        finalize: function (messageUpdate) {
            // Shortcut
            var hasher = this._hasher;

            // Compute HMAC
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

            return hmac;
        }
    });
}());

// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /* jshint strict: false */

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else {
        Q = definition();
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;

    function flush() {
        /* jshint loopfunc: true */

        while (head.next) {
            head = head.next;
            var task = head.task;
            head.task = void 0;
            var domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }

            try {
                task();

            } catch (e) {
                if (isNodeJS) {
                    // In node, uncaught exceptions are considered fatal errors.
                    // Re-throw them synchronously to interrupt flushing!

                    // Ensure continuation if the uncaught exception is suppressed
                    // listening "uncaughtException" events (as domains does).
                    // Continue in next event to avoid tick recursion.
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }

                    throw e;

                } else {
                    // In browsers, uncaught exceptions are not fatal.
                    // Re-throw them asynchronously to avoid slow-downs.
                    setTimeout(function() {
                       throw e;
                    }, 0);
                }
            }

            if (domain) {
                domain.exit();
            }
        }

        flushing = false;
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process !== "undefined" && process.nextTick) {
        // Node.js before 0.9. Note that some fake-Node environments, like the
        // Mocha test runner, introduce a `process` global without a `nextTick`.
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }

    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (isPromise(value)) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become fulfilled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be fulfilled
 */
Q.race = race;
function race(answerPs) {
    return promise(function(resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function(answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return isObject(object) &&
        typeof object.promiseDispatch === "function" &&
        typeof object.inspect === "function";
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return result.value;
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return exception.value;
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var countDown = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++countDown;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--countDown === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (countDown === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {String} custom error message (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, message) {
    return Q(object).timeout(ms, message);
};

Promise.prototype.timeout = function (ms, message) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

//# sourceMappingURL=MyScript.concat.js.map