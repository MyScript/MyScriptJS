# Contributing to MyScriptJS

We gladly welcome pull requests to MyScriptJS. If you would like to add or modify new or larger features, see the "Adding features" section. 
If you have any questions, or want help solving a problem, feel free to stop by the [#MyScript forum](https://dev.myscript.com/support/forum/).

## Code format

* each filename should be in camelCase
* 4 spaces for indentation
* 120 character-line length

In general, try to make your code blend in with the surrounding code.

## Adding features

Functions are distributed into several JS files, each taking care of a specific phase of a Cloud-based handwriting recognition process (ink collection, networking, rendering, etc.). If the feature you want to add is similar to an existing one, add your contribution to the corresponding file.

If you create a new object, you should first create a JS file associated to this new object.

## Testing

Local testing can be done using the Karma engine through Grunt. First, install all dependencies `npm install` from the root folder of the project, then run `grunt test`.

MyScriptJS supports all major browsers. Unfortunately, it is hard to test new changes so if you can, please test your changes in as many browsers as possible.

## CLA

In order to contribute, you must first agree to the **Contributor License Agreement** available [here](http://goo.gl/forms/YyzZ9VSvYG).

Make sure you read the article "[Contributing to Open Source on GitHub](https://guides.github.com/activities/contributing-to-open-source/)" to understand the contributing process.

## License

This library is licensed under the [Apache 2.0](http://opensource.org/licenses/Apache-2.0).