# MyScriptJS

The JavaScript library for the MyScript Cloud recognition service.

Learn more in the [Developer Guide](http://doc.myscript.com/MyScriptJS/1.0/index.html) and the [API Reference](http://doc.myscript.com/MyScriptJS/1.0/reference/index.html).

## Installation

**Browser**: Use our [CDN](https://cdnjs.com/libraries/myscript) or [Download](https://github.com/MyScript/MyScriptJS/releases/latest) the latest `myscript.js`

**Bower**: `bower install myscript`

**Node**:  `npm install myscript`	

## Getting started

This tutorial shows how to perform the recognition of a digital handwritten
sample with MyScript. It gives the main steps to follow, based on the code sample provided in [`getting-started/index.html`](./getting-started/index.html).

### Generate your keys

MyScriptJS requires a valid [MyScript Developer account](https://dev.myscript.com/) (sign up, then go to **Dashboard** and click **CDK samples** to accept the CDK Terms and Conditions).

1. [Login](https://cloud.myscript.com) to your Cloud account
2. Create an application
3. Generate an application and an HMAC key

Store your keys for later use.

__No handwriting recognition can be processed without these keys__.

### Create an HTML tag for your handwriting input

First, you need to create a tag for your input and add MyScriptJS script as well as its dependencies.

```html
<!DOCTYPE html>
<html>
<head>
	<title>Getting started</title>
</head>
<body>
    <div id="ink-paper" style="background-color: lightyellow; border: 1px solid darkgoldenrod; width: 400px; height: 300px;"></div>
</body>
<script type="text/javascript" src="../lib/core-min.js"></script>
<script type="text/javascript" src="../lib/x64-core-min.js"></script>
<script type="text/javascript" src="../lib/sha512-min.js"></script>
<script type="text/javascript" src="../lib/hmac-min.js"></script>
<script type="text/javascript" src="../lib/q.js"></script>
<script type="text/javascript" src="../../myscript.min.js"></script>
<script>
(function() {
    var inkPaper = document.getElementById('ink-paper');
})();
</script>   
</html>
```

### Create an [InkPaper](http://doc.myscript.com/MyScriptJS/1.0/reference/classes/InkPaper.html)

Then, you need to attach an ink paper to your input tag. At the same time, you will need to provide him options like the recognition type and the application and HMAC keys.

```javascript
(function() {
    var inkPaper = document.getElementById('ink-paper');

    var options = {
        applicationKey: applicationKey, // MyScript Cloud application key
        hmacKey: hmacKey, // MyScript Cloud HMAC key
        type: 'SHAPE', // Recognition type
        timeout: 0, // Recognition timeout
        renderInput: false, // Do not draw the input components over the output
        renderOuput: true // Draw the recognition result
    };

    var paper = new MyScript.InkPaper(inkPaper, options, resultCallback);
})();
```

### Launch the recognition

To launch the recognition process, you have two different choices:
 - set a timeout on the ink paper options
 - call the method [`recognize`](http://doc.myscript.com/MyScriptJS/1.0/reference/classes/InkPaper.html#method_recognize)
 
```javascript
function doRecognition () {
	paper.recognize();
}
```

### Get the result

You can handle the recognition result with the result callback that you have set on the ink paper construction.
For every recognition type, the result contains the `instanceId` and the recognition document, here a [ShapeDocument](http://doc.myscript.com/MyScriptJS/1.0/reference/classes/ShapeDocument.html).
For more information on output objects, please refer to the
[API Reference](http://doc.myscript.com/MyScriptJS/1.0/reference/index.html) and
[Developer Guide](http://doc.myscript.com/MyScriptJS/1.0/index.html).

```javascript
var resultCallback = function (data, error) {
    if (error) {
        result.innerHTML = error;
    } else {
        result.innerHTML = '';
    }
};
```
