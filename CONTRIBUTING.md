# Contributing to MyScriptJS

We welcome pull requests to MyScriptJS. If you'd like to new or larger feature, keep reading. 
If you have any questions, or want help solving a problem, feel free to stop by the [#MyScript forum](https://dev.myscript.com/support/forum/).

#### Adding new features

Functions are distributed into several JS files, each taking care of a specific phase of a Cloud based handwriting recognition (ink collection, networking, rendering, etc.). If the feature you want to add is similar to an existing function, add your contribution to that file.

If you create a new object, you should create a new file associated to this new object. File name should be the object name in smallcaps.

## Testing

Local testing can be using the Karma engine through Grunt. First, install all dependencies 
`npm install` from the root folder of the project, then run `grunt test-unit`.

#### Testing in other browsers

MyScriptJS supports all major browsers. Unfortunately, it is hard to test new changes in many browsers. If you can, please test your changes in as many browsers as possible.

## Style guide

Code

 - 4 spaces for indentation
 - 120 character line length
 - declare variables in the outermost scope that they are used

In general, try to make your code blend in with the surrounding code.

## CLA

In order to contribute, you must first agree to the **Contributor License Agreement**,  found [here](http://goo.gl/forms/YyzZ9VSvYG).

Make sure you have read the article "[Contributing to Open Source on GitHub](https://guides.github.com/activities/contributing-to-open-source/)" to understand the process of contributing.


## License

This library is licenced under the [Apache 2.0](http://opensource.org/licenses/Apache-2.0).

