# MyScriptJS
 
MyScriptJS is the fastest way to integrate handwriting panel and recognition in your webapp
 
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
      v3: {
        mathParameter: {
          resultTypes: ['LATEX']
        }
      }
    }
  });
```

## Examples

* API v4
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
   
## [Documentation](./docs/index.html)

## Build from sources

1. Install dependencies.
    * `npm install`
    * `bower install`
2. Build the project using gulp.
    * `gulp`
    
**Start coding**

3. Setup your environment using [.eslintrc](./.eslintrc) configuration. Read [SETUP.md](./SETUP.md) for more information if you want to use WebStorm.
3. Run the browser using gulp.
    * `gulp serve`. Samples will be available on `http://localhost:8080/samples/index.html`
4. Debug using your favorite browser dev tools. The sources will be available under the webpack source folder (for chrome dev tools). Every change in sources will trigger a rebuild with linter and basic tests.

## Contribute

If you wish to contribute to MyScriptJS, feel free to fork it!
Please sign our [Contributor License Agreement](CONTRIBUTING.md) before submitting your pull request.

## Share your feedback

Made a cool app with MyScriptJS? We would love to hear about you!
We’re planning to showcase apps using it so let us know by sending a quick mail to [myapp@myscript.com](mailto://myapp@myscript.com)
