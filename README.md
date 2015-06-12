# MyScriptJS

[MyScriptJS](http://myscript.github.io/MyScriptJS/) is a free and open-source JavaScript library providing the easiest way to use the [MyScript Cloud](https://dev.myscript.com/) handwriting recognition service in your app.

 [![Build Status](https://travis-ci.org/MyScript/MyScriptJS.svg?branch=master)](https://travis-ci.org/MyScript/MyScriptJS)
 [![GitHub version](https://badge.fury.io/gh/MyScript%2FMyScriptJS.svg)](http://badge.fury.io/gh/MyScript%2FMyScriptJS)
 [![Bower version](https://badge.fury.io/bo/myscript.svg)](http://badge.fury.io/bo/myscript)
 [![npm version](https://badge.fury.io/js/myscript.svg)](http://badge.fury.io/js/myscript)

[MyScriptJS](http://myscript.github.io/MyScriptJS/) speeds up the development of handwriting interfaces with JavaScript, by abstracting and providing default implementations for the common tasks that need to be managed:

* **Ink management**: Store strokes and benefit from a built-in undo/redo system.
* **Ink rendering**: Attach a renderer to a HTML5 canvas to start capturing and displaying smooth strokes.
* **Call to the recognizer**: MyScriptJS manages requests to MyScript Cloud as well as API calls, using HTTP/REST or WebSocket protocols (new in Cloud 3.0).
* **All MyScript recognition types**: The object model of MyScriptJS supports the recognition of handwritten text, shapes, music notation and mathematical expressions.
* **Result tree parsing**: The recognition result tree is exposed and fully traversable.
* **Typesetting (coming soon)**: Replace ink with digital equivalent, whether it is text, music, shapes or mathematical expressions.

Learn more on MyScriptJS in the [Developer Guide](http://doc.myscript.com/MyScriptJS/1.0/index.html) and [API Reference Guide](http://doc.myscript.com/MyScriptJS/1.0/reference/index.html).


## Installation

**Browser**: Use our [CDN](https://cdnjs.com/libraries/myscript) or [Download](https://github.com/MyScript/MyScriptJS/releases/latest) the latest `myscript.js`

**Bower**: `bower install myscript`

**Node**:  `npm install myscript`	


## Start using MyScriptJS

MyScriptJS requires a valid [MyScript Developer account](https://dev.myscript.com/) (sign up, then go to **Dashboard** and click **CDK samples** to accept the CDK Terms and Conditions).

Check our [Getting Started](https://github.com/MyScript/MyScriptJS/tree/master/resources/samples#getting-started) tutorial to start building your first app.

You are free to use MyScriptJS in any of your personal or commercial project, as permitted by the [Apache 2.0](LICENSE) License.


## Examples

Checking the [code samples](https://github.com/MyScript/MyScriptJS/tree/master/resources/samples) is a good way to start implementing MyScriptJS in your project and to get familiar with the concepts.


## Contribute

We welcome your contributions: If you would like to extend MyScriptJS for your needs, feel free to fork it!

Please sign our [Contributor License Agreement](CONTRIBUTING.md) before submitting your pull request.


## Share your feedback

Made a cool app with MyScriptJS? We would love to hear about you!

We’re planning to showcase apps using MyScriptJS so let us know by sending a quick mail to [myapp@myscript.com](mailto://myapp@myscript.com)
