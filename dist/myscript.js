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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
	 * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @method getFifths
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
            this.startTuplet = new scope.MusicTuplet(obj.startTuplet);
            this.stopTuplet = new scope.MusicTuplet(obj.stopTuplet);
            this.timeModification = new scope.MusicTimeModificationData(obj.timeModification);
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
     * @method getStopTie
     * @returns {MyScript.MusicTie}
     */
    MusicNote.prototype.getStopTie = function () {
        return this.stopTie;
    };

    /**
     * Get start tuplet
     *
     * @method getStartTuplet
     * @returns {MyScript.MusicTuplet}
     */
    MusicNote.prototype.getStartTuplet = function () {
        return this.startTuplet;
    };

    /**
     * Get stop tuplet
     *
     * @method getStopTuplet
     * @returns {MyScript.MusicTuplet}
     */
    MusicNote.prototype.getStopTuplet = function () {
        return this.stopTuplet;
    };

    /**
     * Get time modification
     *
     * @method getTimeModification
     * @returns {MyScript.MusicTimeModificationData}
     */
    MusicNote.prototype.getTimeModification = function () {
        return this.timeModification;
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
     * @param {Object} [obj]
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
                    case 'tuplet':
                        this.elements.push(new scope.MusicTuplet(obj.elements[i]));
                        break;
                    case 'tupletBracket':
                        this.elements.push(new scope.MusicTupletBracket(obj.elements[i]));
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
            this.startTuplet = new scope.MusicTuplet(obj.startTuplet);
            this.stopTuplet = new scope.MusicTuplet(obj.stopTuplet);
            this.timeModification = new scope.MusicTimeModificationData(obj.timeModification);
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
     * Get start tuplet
     *
     * @method getStartTuplet
     * @returns {MyScript.MusicTuplet}
     */
    MusicRest.prototype.getStartTuplet = function () {
        return this.startTuplet;
    };

    /**
     * Get stop tuplet
     *
     * @method getStopTuplet
     * @returns {MyScript.MusicTuplet}
     */
    MusicRest.prototype.getStopTuplet = function () {
        return this.stopTuplet;
    };

    /**
     * Get time modification
     *
     * @method getTimeModification
     * @returns {MyScript.MusicTimeModificationData}
     */
    MusicRest.prototype.getTimeModification = function () {
        return this.timeModification;
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * Music time modification data
     *
     * @class MusicTimeModificationData
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTimeModificationData (obj) {
        if (obj) {
            this.actual = obj.actual;
            this.dots = obj.dots;
            this.normal = obj.normal;
            this.type = obj.type;
        }
    }

    /**
     * Get actual
     *
     * @method getActual
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getActual = function () {
        return this.actual;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get normal
     *
     * @method getNormal
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getNormal = function () {
        return this.normal;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTimeModificationData.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTimeModificationData = MusicTimeModificationData;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music time signature
     *
     * @class MusicTimeSignature
     * @extends AbstractMusicElement
     * @param {Object} [obj]
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
     * Music tuplet bracket
     *
     * @class MusicTupletBracket
     * @extends AbstractMusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTupletBracket (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicTupletBracket.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTupletBracket.prototype.constructor = MusicTupletBracket;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTupletBracket.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTupletBracket = MusicTupletBracket;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * Music tuplet
     *
     * @class MusicTuplet
     * @extends AbstractMusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTuplet (obj) {
        scope.MusicElement.call(this, obj);
        this.brackets = [];
        if (obj) {
            this.placement = obj.placement;
            this.number = new scope.MusicAnnotation(obj.number);
            for (var i in obj.brackets) {
                this.brackets.push(new scope.MusicTupletBracket(obj.brackets[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicTuplet.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTuplet.prototype.constructor = MusicTuplet;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicTuplet.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Get number
     *
     * @method getNumber
     * @returns {MyScript.MusicAnnotation}
     */
    MusicTuplet.prototype.getNumber = function () {
        return this.number;
    };

    /**
     * Get brackets
     *
     * @method getBrackets
     * @returns {Array}
     */
    MusicTuplet.prototype.getBrackets = function () {
        return this.brackets;
    };

    // Export
    scope.MusicTuplet = MusicTuplet;
})(MyScript);
(function (scope) {
    'use strict';
    /**
     * MusicXML result
     *
     * @class MusicXMLResultElement
     * @extends MusicResultElement
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
     * @param {Object} [obj]
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
(function (scope, Q) {
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
     * @param {Object} [obj]
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
})(MyScript, Q);

(function (scope, CryptoJS) {
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
})(MyScript, CryptoJS);
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
(function (scope, Q) {
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
})(MyScript, Q);
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
(function (scope, Q) {
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
})(MyScript, Q);
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
//# sourceMappingURL=myscript.js.map