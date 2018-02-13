# MyScriptJS
> The fastest way to integrate rich **handwriting** features in your webapp.

<div align="center">
  <img src="preview.gif">
</div>

MyScriptJS is a JavaScript library that can be used in every web application to bring handwriting recognition.

It integrates all you need:

* Signal capture for all devices,
* Digital ink rendering,
* Link to MyScript Cloud to bring handwriting recognition.

## Table of contents

* [Features](https://github.com/MyScript/MyScriptJS#features)
* [Examples](https://github.com/MyScript/MyScriptJS#examples)
* [Requirements](https://github.com/MyScript/MyScriptJS#requirements)
* [Installation](https://github.com/MyScript/MyScriptJS#installation)
* [Usage](https://github.com/MyScript/MyScriptJS#usage)
* [Documentation](https://github.com/MyScript/MyScriptJS#documentation)
* [Development](https://github.com/MyScript/MyScriptJS#development)
* [Support](https://github.com/MyScript/MyScriptJS#support)
* [Feedback](https://github.com/MyScript/MyScriptJS#sharing-your-feedback)
* [Contributing](https://github.com/MyScript/MyScriptJS#contributing)


## Examples

Discover Interactive Ink with MyScriptJS and its major features with our [text demo and tutorial](http://webdemo.myscript.com/views/text.html).

Try our two basic examples featuring [the text recognition](https://myscript.github.io/MyScriptJS//examples/v4/websocket_text_iink.html) and [the math recognition](https://myscript.github.io/MyScriptJS/examples/v4/websocket_math_iink.html).

We also provide several examples to show the features of MyScriptJS. Those examples can be found on our [examples page](https://myscript.github.io/MyScriptJS/examples/) with the source codes in [this directory](https://github.com/MyScript/MyScriptJS/tree/master/examples).

We also provide examples of integration with the major JavaScript frameworks:

| Framework | Link |
| --- | --- |
|   <div align="center"><img src="assets/react.svg" style="height:50px"></div> | [Example of React integration](https://github.com/MyScript/web-integration-samples/tree/master/react-integration-examples) |
|   <div align="center"><img src="assets/angular.svg" style="height:50px"></div> | [Example of Angular integration](https://github.com/MyScript/web-integration-samples/tree/master/angular-integration-examples) |
|   <div align="center"><img src="assets/vue.svg" style="height:50px"></div> | [Example of Vue integration](https://github.com/MyScript/web-integration-samples/tree/master/vue-integration-examples) |

## Features

* Text and Math support,
* Easy to integrate,
* Digital ink capture and rendering,
* Rich editing gestures,
* Import and export content,
* Styling,
* Typeset support,
* More than 200 mathematical symbols supported,
* 59 supported languages.

## Requirements

1. Have [npm](https://www.npmjs.com/get-npm), [yarn](https://yarnpkg.com/en/docs/install#linux-tab) or [bower](https://bower.io/#install-bower) installed.
2. Have a MyScript developer account. You can create one [here](https://developer.myscript.com/support/account/registering-myscript-cloud/).
3. Get your keys and the free monthly quota to access MyScript Cloud at [developer.myscript.com](https://developer.myscript.com/getting-started/web)

## Installation

MyScriptJS can be installed with the well known package managers `npm`, `yarn` and `bower`. 

If you want to use `npm` or `yarn` you first have to init a project (or use an existing one). 

```shell
npm init
OR
yarn init 
```

You can then install MyScriptJS and use MyScriptJs as showed in the [Usage](https://github.com/MyScript/MyScriptJS#usage) section.

```shell
npm install myscript
OR
yarn add myscript
```

You can also install MyScriptJS using bower (with or without an existing project) and use MyScriptJs as showed in the [Usage](https://github.com/MyScript/MyScriptJS#usage) section replacing `node_modules` by `bower_components`.

```shell
bower install myscript
```


## Usage

1. Create an `index.html` file in the same directory.

2. Add the following lines in the `head` section ot your file to use MyScriptJS and the css. We use [PEP](https://github.com/jquery/PEP) to ensure better browsers compatibilities. Note that you can also use it using dependencies from `node_modules` or `bower_components`:
```html
<link rel="stylesheet" href="node_modules/myscript/dist/myscript.min.css"/>
<script src="node_modules/myscript/dist/myscript.min.js"></script>
<script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
```

3. Always in the `head` section, add a `style` and specify the height and the width of your editor:
```html
<style>
    #editor {
        width: 100%;
        height: 100%;
    }
</style>
```

4. In the `body` tag, create a `div` tag that will contain the editing area:
```html
    <div id="editor"></div>
```

5. In JavaScript and within a `<script>` tag placed before the closing tag `</body>`, create the editor using the `register` function, your editor html element and a simple configuration:
```javascript
  const editorElement = document.getElementById('editor');

  MyScript.register(editorElement, {
    recognitionParams: {
      type: 'TEXT',
      server: {
        applicationKey: '#YOUR MYSCRIPT DEVELOPER APPLICATION KEY#',
        hmacKey: '#YOUR MYSCRIPT DEVELOPER HMAC KEY#'
      }
    }
  });
```

6. Your `index.html` file should look like this:
```html
<html>
    <head>
        <link rel="stylesheet" href="node_modules/myscript/dist/myscript.min.css"/>
        <script src="node_modules/myscript/dist/myscript.min.js"></script>
        <script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
        <style>
            #editor {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div id="editor"></div>
    <script>
        const editorElement = document.getElementById('editor');

        MyScript.register(editorElement, {
            recognitionParams: {
                type: 'TEXT',
                server: {
                    applicationKey: '#YOUR MYSCRIPT DEVELOPER APPLICATION KEY#',
                    hmacKey: '#YOUR MYSCRIPT DEVELOPER HMAC KEY#'
                }
            }
        });
    </script>
    </body>
</html>
```

7. Open `index.html` in your browser or serve your folder content using any web server.



## Documentation

A more complete guide is available on the [MyScript Developer website](https://developer.myscript.com/docs/interactive-ink/latest/web/myscriptjs/).

We also provide an [API Reference](https://myscript.github.io/MyScriptJS/docs).

## Building MyScriptJS

Instructions to help you build the project are available in [SETUP.md](https://github.com/MyScript/MyScriptJS/blob/master/SETUP.md) file.


## Getting support

You can get support and ask your questions on the [dedicated section](https://developer-support.myscript.com/support/discussions/forums/16000096021) of MyScript Developer website.

## Sharing your feedback ?

Made a cool app with MyScriptJS? We would love to hear about you!
We’re planning to showcase apps using it so let us know by sending a quick mail to [myapp@myscript.com](mailto://myapp@myscript.com).

## Contributing

We welcome your contributions: if you would like to extend MyScriptJS for your needs, feel free to fork it! 

Please take a look at our [contributing](https://github.com/MyScript/MyScriptJS/blob/master/CONTRIBUTING.md) guidelines before submitting your pull request.

## License
This library is licensed under the [Apache 2.0](http://opensource.org/licenses/Apache-2.0).