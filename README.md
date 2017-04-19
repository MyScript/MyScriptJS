# MyScriptJS
 
MyScriptJS is the fastest way to integrate handwriting panel and recognition in your webapp.
 
![MyScriptJS preview](./preview.gif)

```html
<html>
<head>
    <script type="text/javascript" src="../node_modules/pepjs/dist/pep.min.js"></script>
    <link rel="stylesheet" href="../dist/myscript.min.css"/>
    <script src="../dist/myscript.min.js"></script>
</head>
<body>
    <div id="result"></div>
    <div>
        <div id="editor"></div>
    </div>
</body>
</html>
```
```js
  var editorElement = document.getElementById('editor');
  var resultElement = document.getElementById('result');

  editorElement.addEventListener('exported', function (evt) {
    var exports = evt.detail.exports;
    if (exports && exports.LATEX) {
      resultElement.innerHTML = '<span>' + exports.LATEX + '</span>';
    } else {
      resultElement.innerHTML = '';
    }
  });

  MyScript.register(editorElement, {
    recognitionParams: {
      type: 'MATH',
      protocol: 'WEBSOCKET',
      server: {
        host: 'webdemoapi.myscript.com',
        applicationKey: '515131ab-35fa-411c-bb4d-3917e00faf60',
        hmacKey: '54b2ca8a-6752-469d-87dd-553bb450e9ad'
      },
      v3: {
        mathParameter: {
          resultTypes: ['LATEX']
        }
      }
    }
  });
```

## What is it about?

MyScriptJS is a javascript library that can be used in every web application (whatever javascript framework you are using) to bring handwriting recognition. 
It integrates all you need:  
* Signal capture,
* Nice digital ink rendering,
* Plug with MyScript CDK to bring handwriting recognition.

## Installation

**Bower**: `bower install myscript`

For more information about how to build it from sources, see [SETUP.md](SETUP.md)

## Examples

* API v4 (iink preview)
    * [Math sample](./samples/websocket_math_iink.html)
* API v3 WebSocket (current)
    * [Math sample](./samples/websocket_math.html)
    * [Text sample](./samples/websocket_text.html)
* API v3 REST (legacy)
    * [Math sample](./samples/rest_math.html)
    * [Text sample](./samples/rest_text.html)
    * [Shape sample](./samples/rest_shape.html)
    * [Music sample](./samples/rest_music.html)
    * [Analyzer sample](./samples/rest_analyzer.html)
* [Programmatic init](./samples/programmatic-init.html)
* [Customize behaviors](./samples/custom_behaviors.html)
* [Get available languages](./samples/get_languages.html)
* [Error handling](./samples/init-error.html)
   
## Documentation

The API Reference is available here: [https://myscript.github.io/myscript/](https://myscript.github.io/myscript/)

## Contribute

If you would like to extend MyScriptJS for your needs, feel free to fork it!
Please sign our [Contributor License Agreement](CONTRIBUTING.md) before submitting your pull request.

## Share your feedback

Made a cool app with MyScriptJS? We would love to hear about you!
We’re planning to showcase apps using it so let us know by sending a quick mail to [myapp@myscript.com](mailto://myapp@myscript.com)
