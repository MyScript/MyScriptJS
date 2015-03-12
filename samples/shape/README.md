# MyScriptJS

Welcome to the [MyScript](https://www.myscript.com) JavaScript framework.

Learn more in the [Developer Guide](http://doc.myscript.com/MyScriptJS/DeveloperGuide/index.html) and the [API Reference](http://doc.myscript.com/MyScriptJS/API_Reference/index.html).

## Installation

**Browser**: Download the latest `myscript.js` from our [Developer Portal](https://dev.myscript.com).

**Bower**: `bower install myscript`

**Node**:  `npm install myscript`	

## Getting started

This tutorial shows how to perform the recognition of a digital handwritten
sample with MyScript. It gives the main steps to follow, based on the code sample provided in [`getting-started/index.html`](./getting-started/index.html).

### Generate your keys

A valid MyScript Cloud account is necessary to use MyScriptJS.
To create a MyScript Cloud account, look at [MyScript Developer Portal](https://dev.myscript.com/developer-program/register/).

1. [Login](https://cloud.myscript.com) to your Cloud account
2. Create an application
3. Generate an application and an HMAC key

Store your keys for later use.

__No handwriting recognition can be processed without these keys__.

### Create your HTML5 canvas

First, you need to create a canvas and add MyScriptJS script as well as its dependencies.

```html
<!DOCTYPE html>
<html>
<head>
	<title>Getting started</title>
</head>
<body>
	<div>
        <canvas id="canvas" width="400" height="300" style="background-color: lightyellow;"></canvas>
        <br />
        <code id="result"></code>
    </div>
</body>
<script type="text/javascript" src="../lib/core-min.js"></script>
<script type="text/javascript" src="../lib/x64-core-min.js"></script>
<script type="text/javascript" src="../lib/sha512-min.js"></script>
<script type="text/javascript" src="../lib/hmac-min.js"></script>
<script type="text/javascript" src="../lib/q.js"></script>
<script type="text/javascript" src="../../myscript.min.js"></script>
<script>
(function() {
    var canvas = document.getElementById("canvas");
})();
</script>   
</html>
```

#### Handle canvas events

Then, you need to handle canvas events so that strokes can be drawn and caught to be recognized.
To do so, we suggest you use [HandJS](https://handjs.codeplex.com/), an external library intended for supporting pointer events on every browser.<br>
Besides, the pointerId variable needs to be added: Its role is make sure that events follow a proper workflow (down, move, up).

```html
<script type="text/javascript" src="../../hand.minified-1.3.8.js"></script>
<script>
(function() {
    var canvas = document.getElementById("canvas");
    var pointerId;

    canvas.addEventListener('pointerdown', function (event) {
    	if (!pointerId) {
        	pointerId = event.pointerId;
            event.preventDefault();
        }
    }, false);

    canvas.addEventListener('pointermove', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();
        }
    }, false);

    canvas.addEventListener('pointerup', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();
            
            pointerId = undefined;
        }
    }, false);

    canvas.addEventListener('pointerleave', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();
            
            pointerId = undefined;
        }
    }, false);
})();
</script>   
</html>
```

### Create a [Renderer](http://doc.myscript.com/MyScriptJS/API_Reference/classes/ShapeRenderer.html)

You need to create a renderer to draw strokes on your canvas. To do so, provide the renderer with canvas context (size, background, etc.) and ink coordinates.<br>The renderer that you define depends on the type of recognition you want to achieve.

```javascript
(function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var pointerId;

    var shapeRenderer = new MyScript.ShapeRenderer();

    canvas.addEventListener('pointerdown', function (event) {
    	if (!pointerId) {
        	pointerId = event.pointerId;
            event.preventDefault();

            shapeRenderer.drawStart(event.offsetX, event.offsetY);
        }
    }, false);

    canvas.addEventListener('pointermove', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            shapeRenderer.drawContinue(event.offsetX, event.offsetY, context);
        }
    }, false);

    canvas.addEventListener('pointerup', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
            pointerId = undefined;
        }
    }, false);

    canvas.addEventListener('pointerleave', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
            pointerId = undefined;
        }
    }, false);
})();
```


### Create a [InkManager](http://doc.myscript.com/MyScriptJS/API_Reference/classes/InkManager.html)

You need to build a stroker to catch and store the drawn strokes. The stroker will transform them into proper [MyScript Strokes](http://doc.myscript.com/MyScriptJS/API_Reference/classes/Stroke.html) to use them as input components for the recognition process. Note that the undo/redo feature is not possible without a stroker.

```javascript
(function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var pointerId;

    var stroker = new MyScript.InkManager();
    var shapeRenderer = new MyScript.ShapeRenderer();

    canvas.addEventListener('pointerdown', function (event) {
    	if (!pointerId) {
        	pointerId = event.pointerId;
            event.preventDefault();

            shapeRenderer.drawStart(event.offsetX, event.offsetY);
            stroker.startInkCapture(event.offsetX, event.offsetY);
        }
    }, false);

    canvas.addEventListener('pointermove', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            shapeRenderer.drawContinue(event.offsetX, event.offsetY, context);
            stroker.continueInkCapture(event.offsetX, event.offsetY);
        }
    }, false);

    canvas.addEventListener('pointerup', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
            stroker.endInkCapture();
            pointerId = undefined;
        }
    }, false);

    canvas.addEventListener('pointerleave', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
            stroker.endInkCapture();
            pointerId = undefined;
        }
    }, false);
})();
```

### Create a [Recognizer](http://doc.myscript.com/MyScriptJS/API_Reference/classes/ShapeRecognizer.html)

You need to create the last object, namely the recognizer. Its role is to manage the recognition within MyScript JS by sending requests and receiving responses to and from MyScript Cloud. The recognizer that you define depends on the type of recognition you want to achieve.

```javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pointerId;

var stroker = new MyScript.InkManager();
var shapeRenderer = new MyScript.ShapeRenderer();
var shapeRecognizer = new MyScript.ShapeRecognizer();
```

### Launch the recognition

To launch the recognition process, gather your input components and call the method [`doSimpleRecognition`](http://doc.myscript.com/MyScriptJS/API_Reference/classes/ShapeRecognizer.html#method_doSimpleRecognition).<br>
Reminder: The `applicationKey` and the `hmacKey` are generated at the very beginning.<br>
The variable `instanceId` is the session identifier: It is used below to check that you are still working on the same session.

```javascript

var applicationKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
var hmacKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

var stroker = new MyScript.InkManager();
var shapeRenderer = new MyScript.ShapeRenderer();
var shapeRecognizer = new MyScript.ShapeRecognizer();
var instanceId;

function doRecognition () {
	shapeRecognizer.doSimpleRecognition(applicationKey, instanceId, stroker.getStrokes(), hmacKey)
}
```

### Get the result

Every [`doSimpleRecognition`](http://doc.myscript.com/MyScriptJS/API_Reference/classes/ShapeRecognizer.html#method_doSimpleRecognition) method returns [Promise](https://github.com/domenic/promises-unwrapping/blob/master/README.md), so you can directly access the output using resolve process. For every recognition type, the result contains the `instanceId` and the recognition document, here a [ShapeDocument](http://doc.myscript.com/MyScriptJS/API_Reference/classes/ShapeDocument.html).
For more information on output objects, please refer to the
[API Reference](http://doc.myscript.com/MyScriptJS/API_Reference/index.html) and
[Developer Guide](http://doc.myscript.com/MyScriptJS/DeveloperGuide/index.html).

```javascript
var canvas = document.getElementById("canvas");
var result = document.getElementById("result");

...

function doRecognition () {
    shapeRecognizer.doSimpleRecognition(applicationKey, instanceId, stroker.getStrokes(), hmacKey).then(
        function (data) {
            if (!instanceId) {
                instanceId = data.getInstanceId();
            } else if (instanceId !== data.getInstanceId()) {
                return;
            }
            shapeRenderer.drawRecognitionResult(stroker.getStrokes(), data.getShapeDocument(), context);
        }
    )
}
```
