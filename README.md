# MyScriptJS
 
MyScriptJS is the fastest way to integrate handwriting panel and recognition in your webapp.
 
![MyScriptJS preview](preview.gif)

## What is it about?

MyScriptJS is a javascript library that can be used in every web application (whatever javascript framework you are using) to bring handwriting recognition. 
It integrates all you need:  
* Signal capture,
* Nice digital ink rendering,
* Plug with MyScript Cloud to bring handwriting recognition.

## Getting started

### Prerequisites

1. Have [bower](https://bower.io/#install-bower) installed.
Have a MyScript developer account. You can create one [here](https://developer.myscript.com/).
2. Get your keys and the free monthly quota to access MyScript Cloud at [developer.myscript.com](https://developer.myscript.com)

### Installation

1. Download MyScriptJS library
```shell
bower install myscript
```
2. Create and edit `index.html` file in the same directory

3. Add the following line in the head section ot your file

```html
<link rel="stylesheet" href="bower_components/myscript/dist/myscript.min.css"/>
<script src="bower_components/myscript/dist/myscript.min.js"></script>
```

4. In the body create a `div` that will contain the editing zone

```html
    <div id="editor"></div>
```

5. In javascript, create the editor attached to editor DOM Node

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
   
6. Launch a local webserver and browse the sample


## More examples

- [examples/v4/websocket_text_iink.html](examples/v4/websocket_text_iink.html) Get started with iink
- [examples/v3/websocket_text.html](examples/v3/websocket_text.html) Get started with legacy api (v3)
- [examples/index.html](examples/index.html) Other demonstrations
   
## Documentation

A complete guide is available on [MyScript Developer website](https://developer.myscript.com/docs/interactive-ink/1.0/web/myscriptjs/).

The API Reference is available in the `docs` directory or on [myscript.github.io/MyScriptJS/ website](https://myscript.github.io/MyScriptJS/).

## Building MyScriptJS

Instructions to build the project are given in [SETUP.md](SETUP.md) file.


## Getting support

You can get some support from the dedicated section on MyScript Developer website.

## Sharing your feedback ?

Made a cool app with MyScriptJS? We would love to hear about you!
We’re planning to showcase apps using it so let us know by sending a quick mail to [myapp@myscript.com](mailto://myapp@myscript.com).

## Contributing

We welcome your contributions: 
If you would like to extend MyScriptJS for your needs, feel free to fork it!
Please sign our [Contributor License Agreement](CONTRIBUTING.md) before submitting your pull request.
