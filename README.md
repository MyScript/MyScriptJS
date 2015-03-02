# MyScriptJS

Welcome to the [MyScript](https://www.myscript.com) JavaScript framework.

Learn more in the [Developer Guide](http://doc.myscript.com/MyScriptJS/DeveloperGuide/index.html) and the [API Reference](http://doc.myscript.com/MyScriptJS/API_Reference/index.html).

## Installation

**Browser**: Download the latest `myscript.js` from our [Developer Portal](https://dev.myscript.com).

**Bower**: `bower install myscript`

**Node**:  `npm install myscript`	

## Getting started

This tutorial shows how to perform the recognition of a digital handwritten
sample with MyScript. It gives the main steps to follow, based on the code sample provided in `samples/math/index.html`.

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

### Create a [Renderer](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRenderer.html)

You now need to create a renderer to draw strokes on your canvas. To do so, you need to provide the renderer with canvas context (size, background, etc.) and ink coordinates.<br>The renderer that you define depends on the type of recognition you want to achieve.

```javascript
(function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var pointerId;
    
    var mathRenderer = new MyScript.MathRenderer();

    canvas.addEventListener('pointerdown', function (event) {
    	if (!pointerId) {
        	pointerId = event.pointerId;
            event.preventDefault();
            
            mathRenderer.drawStart(event.offsetX, event.offsetY);
        }
    }, false);

    canvas.addEventListener('pointermove', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            mathRenderer.drawContinue(event.offsetX, event.offsetY, context);
        }
    }, false);

    canvas.addEventListener('pointerup', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            mathRenderer.drawEnd(event.offsetX, event.offsetY, context);
            pointerId = undefined;
        }
    }, false);

    canvas.addEventListener('pointerleave', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            mathRenderer.drawEnd(event.offsetX, event.offsetY, context);
            pointerId = undefined;
        }
    }, false);
})();
```

### Prepare the recognition


#### Create a [Stroker](http://doc.myscript.com/MyScriptJS/API_Reference/classes/Stroker.html)

Now we weed to build a stroker to catch the strokes drawn and transform them into proper [MyScript Stroke](http://doc.myscript.com/MyScriptJS/API_Reference/classes/Stroke.html) to use it as input component for the recognition. Along that, the stroker will also keep the built Stroke inside it. That will be used to provide a simple undo/redo feature. 

```javascript
(function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var pointerId;
    
    var stroker = new MyScript.Stroker();
    var mathRenderer = new MyScript.MathRenderer();

    canvas.addEventListener('pointerdown', function (event) {
    	if (!pointerId) {
        	pointerId = event.pointerId;
            event.preventDefault();
            
            mathRenderer.drawStart(event.offsetX, event.offsetY);
            stroker.startStrokeWriting(event.offsetX, event.offsetY);
        }
    }, false);

    canvas.addEventListener('pointermove', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            mathRenderer.drawContinue(event.offsetX, event.offsetY, context);
            stroker.continueStrokeWriting(event.offsetX, event.offsetY);
        }
    }, false);

    canvas.addEventListener('pointerup', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            mathRenderer.drawEnd(event.offsetX, event.offsetY, context);
            stroker.endStrokeWriting();
            pointerId = undefined;
        }
    }, false);

    canvas.addEventListener('pointerleave', function (event) {
    	if (pointerId === event.pointerId) {
            event.preventDefault();

            mathRenderer.drawEnd(event.offsetX, event.offsetY, context);
            stroker.endStrokeWriting();
            pointerId = undefined;
        }
    }, false);
})();
```

#### Create a [Recognizer](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRecognizer.html)

After that, since we have a proper input and the keys from the Cloud, we just have to create a Recognizer object. Nothing more is required to make it working with [cloud.myscript.com](http://cloud.myscript.com).

```javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pointerId;

var stroker = new MyScript.Stroker();
var mathRenderer = new MyScript.MathRenderer();
var mathRecognizer = new MyScript.MathRecognizer();
```

### Launch the recognition

You now are ready to run the recognition process. To do so, you just have to put inputs together and call [`doSimpleRecognition`](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRecognizer.html#method_doSimpleRecognition).
The `application key` and the HMAC one is the ones you get at the very beginning, and `instanceId` is the session identifier. It is used below to make sure that we are always working  on the same session.

```javascript

var applicationKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
var hmacKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

var stroker = new MyScript.Stroker();
var mathRenderer = new MyScript.MathRenderer();
var mathRecognizer = new MyScript.MathRecognizer();
var instanceId;

function doRecognition () {
	mathRecognizer.doSimpleRecognition(applicationKey, instanceId, stroker.getStrokes(), hmacKey)
}
```

### Get the result

Every [`doSimpleRecognition`](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRecognizer.html#method_doSimpleRecognition) method returns [Promise](https://github.com/domenic/promises-unwrapping/blob/master/README.md), so you can directly access the output using resolve process. For every recognition type, the result contains two items: the `instanceId` and the recognition document, here a [MathDocument](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathDocument.html).
If you want to know more on output objects, please refer to the 
[API Reference](http://doc.myscript.com/MyScriptJS/API_Reference/index.html) and 
[Developer Guide](http://doc.myscript.com/MyScriptJS/DeveloperGuide/index.html).

```javascript
var canvas = document.getElementById("canvas");
var result = document.getElementById("result");

...

function doRecognition () {
    mathRecognizer.doSimpleRecognition(applicationKey, instanceId, stroker.getStrokes(), hmacKey).then(
        function (data) {
            if (!instanceId) {
                instanceId = data.getInstanceId();
            } else if (instanceId !== data.getInstanceId()) {
                return;
            }
            var results = data.getMathDocument().getResultElements();
            for (var i in results) {
                if (results[i] instanceof MyScript.MathLaTexResultElement) {
                    result.innerText = results[i].getValue();
                }
            }
        }
    )
}
```
