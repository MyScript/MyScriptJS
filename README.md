git diff
:pencil: **MyScriptJS** is the fastest way to integrate rich **handwriting** features in your webapp.

<p align="center">
  <img src="preview.gif">
</p>

## What is it about?

MyScriptJS is a JavaScript library that can be used in every web application (whatever JavaScript framework you are using) to bring handwriting recognition.

It integrates all you need:

* Signal capture,
* Digital ink rendering,
* Plug with MyScript Cloud to bring handwriting recognition.

## Getting started

### Prerequisites

1. Have [bower](https://bower.io/#install-bower) installed.
2. Have a MyScript developer account. You can create one [here](https://developer.myscript.com/).
3. Get your keys and the free monthly quota to access MyScript Cloud at [developer.myscript.com](https://developer.myscript.com)

### Installation

1. Download MyScriptJS library
```shell
bower install myscript
```

2. Create and edit `index.html` file in the same directory.

3. Add the following lines in the `head` section ot your file. We use pep to ensure better browsers compatibilities. Note that you can also use it using bower dependencies:
```html
<link rel="stylesheet" href="bower_components/myscript/dist/myscript.min.css"/>
<script src="bower_components/myscript/dist/myscript.min.js"></script>
<script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
```

4. In the `body` tag, create a `div` tag that will contain the editing zone:
```html
    <div id="editor"></div>
```

5. In JavaScript, create the editor attached to editor DOM Node:
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

6. Launch a local webserver and browse the sample.


## Examples

- [Text recognition and conversion with V4 API](https://myscript.github.io/MyScriptJS//examples/v4/websocket_text_iink.html)
- [Math recognition and conversion with V4 API](https://myscript.github.io/MyScriptJS/examples/v4/websocket_math_iink.html)
- [Text recognition and conversion with V3 API](https://myscript.github.io/MyScriptJS/examples/v3/websocket_text.html)
- [**more examples...**](https://myscript.github.io/MyScriptJS/examples/)

The [directory examples/](https://github.com/MyScript/MyScriptJS/tree/master/examples) of this Git repository contains all the example source codes.

## Documentation

A complete guide is available on [MyScript Developer website](https://developer.myscript.com/docs/interactive-ink/1.0/web/myscriptjs/).

The API Reference is available in the `docs` directory or on [myscript.github.io/MyScriptJS/ website](https://myscript.github.io/MyScriptJS/).

## Building MyScriptJS

:warning: Master refers to 4.0.x versions of the lib. Consider branch 1.2.x for previous versions of MyScriptJS.

Instructions to help you build the project are available in [SETUP.md](https://github.com/MyScript/MyScriptJS/blob/master/SETUP.md) file.


## Getting support

You can get some support from the dedicated section on MyScript Developer website.

## Sharing your feedback ?

Made a cool app with MyScriptJS? We would love to hear about you!
We’re planning to showcase apps using it so let us know by sending a quick mail to [myapp@myscript.com](mailto://myapp@myscript.com).

## Contributing

We welcome your contributions:
If you would like to extend MyScriptJS for your needs, feel free to fork it!
Please sign our [Contributor License Agreement](https://github.com/MyScript/MyScriptJS/blob/master/CONTRIBUTING.md) before submitting your pull request.
