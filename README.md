# MyScriptJS
 
MyScriptJS is the fastest way to integrate handwriting panel and recognition in your webapp.
 
![MyScriptJS preview](preview.gif)

## What is it about?

MyScriptJS is a javascript library that can be used in every web application (whatever javascript framework you are using) to bring handwriting recognition. 
It integrates all you need:  
* Signal capture,
* Nice digital ink rendering,
* Plug with MyScript CDK to bring handwriting recognition.

## Prerequisites

1. Have a MyScript developer account. You can create one [here](https://dev.myscript.com/).
2. Get an application key and HMAC key for your application.

## Installation

1. Download it.

       bower install myscript

2. Import it on your webapp.

```html
    <link rel="stylesheet" href="../dist/myscript.min.css"/>
    <script src="../dist/myscript.min.js"></script>
```

3. Create an element for your editor.

```html
    <div id="editor"></div>
```

4. Configure it.

```javascript
  var editorElement = document.getElementById('editor');

  MyScript.register(editorElement, {
    recognitionParams: {
      type: 'MATH',
      server: {
        applicationKey: '#YOUR MYSCRIPT CDK APPLICATION KEY#',
        hmacKey: '#YOUR MYSCRIPT CDK HMAC KEY#'
      }
    }
  });
```
   
5. Use it!

For more information about how to build it from sources, see [SETUP.md](SETUP.md)

## Examples

- [demo/get_started.html](demo/get_started.html) Get started with SHAPE
- [demo/handle_exports.html](demo/handle_exports.html) Handle exports
- [demo/handle_error.html](demo/handle_error.html) Handle error
- [demo/styling.html](demo/styling.html) Customize your component style
- [demo/programmatic_init.html](demo/programmatic_init.html) Programmatic initialization
- [demo/get_stats.html](demo/get_stats.html) Get statistics
- [demo/debug.html](demo/debug.html) Debug your component
- [demo/get_languages.html](demo/get_languages.html) Get available languages
- [demo/get_languages_programmatic.html](demo/get_languages_programmatic.html) Get available languages programmatically
- API v4 (iink)
  - [Math WebSocket example](examples/v4/websocket_math_iink.html)
- API v3 (legacy)
  - [Math WebSocket example](examples/v3/websocket_math.html)
  - [Text WebSocket example](examples/v3/websocket_text.html)
  - [Math REST example](examples/v3/rest_math.html)
  - [Text REST example](examples/v3/rest_text.html)
  - [Shape REST example](examples/v3/rest_shape.html)
  - [Music REST example](examples/v3/rest_music.html)
  - [Analyzer REST example](examples/v3/rest_analyzer.html)
  - [Get available languages](examples/get_languages.html)
   
## Documentation

The API Reference is available here: [https://myscript.github.io/MyScriptJS/](https://myscript.github.io/MyScriptJS/)

## Contribute

We welcome your contributions: 
If you would like to extend MyScriptJS for your needs, feel free to fork it!
Please sign our [Contributor License Agreement](CONTRIBUTING.md) before submitting your pull request.

## Share your feedback

Made a cool app with MyScriptJS? We would love to hear about you!
We’re planning to showcase apps using it so let us know by sending a quick mail to [myapp@myscript.com](mailto://myapp@myscript.com)
