## Getting started

This tutorial shows how to perform the recognition of a digital handwritten
sample with MyScript. It gives the main steps to follow, based on the sample
code provided in `samples/math/index.html`.

### Getting the keys

A valid MyScript Cloud account is necessary to use MyScriptJS.
To create a MyScript Cloud account look at [MyScript Dev Portal](https://dev.myscript.com/developer-program/register/).

1. [Log in](https://cloud.myscript.com) your Cloud account
2. Create an application
3. Generate an application key

Store your application and hmac keys for later use.

__No handwriting recognition can be processed without these keys__.

### Prepare your DOM

First of all, you need to create a canvas to capture your ink, and add MyScriptJS script, plus dependencies.

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

The second step consists in handling canvas event to draw on it and catch stroke to be recognized.
For that we will use an external lib, [HandJS](https://handjs.codeplex.com/) to simplify browsers specifics events manipulation.
We will add pointerId check to capture only stroke drawing, and not dragging. 

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

### Creating a [Renderer](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRenderer.html)

After that, we will create a renderer to draw strokes on our canvas. For that we need to get canvas context, and send current coordinates to it. The renderer that you define depends on the type of recognition you want to achieve.

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
Now we should be able to draw on canvas.

### Prepare the recognition

Then, you need to define your recognition programming object. As the renderer, the recognizer
that you define depends on the type of recognition you want to achieve.
First of all, we need to handle stroke objects to send to the recognizer. 
To do that we will create what we call a stroker.

#### Creating a [Stroker](http://doc.myscript.com/MyScriptJS/API_Reference/classes/Stroker.html)

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
The stroker is just used to create and store stroke objects.

#### Creating a [Recognizer](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRecognizer.html)

To be able to do recognition, you need your keys from MyScript Cloud, as describe before.

```javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pointerId;

var applicationKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
var hmacKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

var stroker = new MyScript.Stroker();
var mathRenderer = new MyScript.MathRenderer();
var mathRecognizer = new MyScript.MathRecognizer();
```

### Launch the recognition

Finally, you can run the recognition process. To do that, you just have to put inputs together and call [`doSimpleRecognition`](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRecognizer.html#method_doSimpleRecognition).

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
`instanceId` is the session identifier. It is used below to get the result.

### Getting the result

Every [`doSimpleRecognition`](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathRecognizer.html#method_doSimpleRecognition) method returns [Promise](https://github.com/domenic/promises-unwrapping/blob/master/README.md), so you can directly access the output using resolve process. For every recognition type, the result contains two items: the `instanceId` and the recognition document. In this case a [MathDocument](http://doc.myscript.com/MyScriptJS/API_Reference/classes/MathDocument.html).
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
