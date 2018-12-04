# [v4.3.0](https://github.com/MyScript/MyScriptJS/tree/v4.3.0)

## Features

- Addition of a new Recognition Assets Builder API to dynamically build text lexicons and math grammars
- Ability to import JIIX Math content
- Style and decoration support in the JIIX exports
- New configuration options for a finer tuning of JIIX exports
- Always connected is now the default mode for better end user experience
- Text, Math and Diagram can now be exported to Word, HTML and iink format

## Bugs fix

- Fix multiple inputs example on Firefox
- Fix smartguide on Edge
- Fix vulnerabilites in dependencies
- Fix auto-reconnect

## Others

- New examples :
    - Recognition asset builder
    - Export text to file (html, word, png, jpeg)
    - Use highlight to extract information
    - Import jiix with math
    - Search and highlight demoing how to manipulate JIIX label
    - Use recognition without UI fo easy integration in existing ink capable applications

# [v4.2.0](https://github.com/MyScript/MyScriptJS/tree/v4.2.0)

## Features

- New REST mode:
    - Text, math and diagram recognition
    - Examples for each recognition type
    - Support for Raw Content type
- New build and development process:
    - We now use [Rollup](https://rollupjs.org/) to build our library,
    - Two outputs are now generated, [UMD](https://github.com/umdjs/umd) and [ES6 Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/),
    - We use npm scripts to launch the development process.
- New always connected mode for WebSocket
- New getSupportedImportMimeTypes method
- New setGuides method used to add guides on a text part

## Others

- New local storage example
- Add table of contents for examples page
- Multiple improvements
    - Remove bower install from npm scripts
    - Replace d3 to only use d3-selection
    - Errors management

# [v4.1.1](https://github.com/MyScript/MyScriptJS/tree/v4.1.1)

## Features

- New export in `myscript.js` for better import using frameworks (as React).

## Bugs fixed

- Multiple smart guides now working in case of multiple editors,
- Stix font removed from css as useless now,
- Languages list for v3 now displaying correct list.

## Breaking changes

In order to be consistent with the native API :
- `guide` renamed to `guides` in the configuration.

# [v4.1.0](https://github.com/MyScript/MyScriptJS/tree/v4.1.0)

## Features
- New smart guide enabled by default:
    - Show real time recognized text above writings,
    - Change recognized words on click using candidates,
    - Convert, copy or delete text using the action menu,
    - Fade out animation to make the smart guide disappear after a certain duration,
- Google Fonts support (see the [example](./examples/v4/customize_style.html))
- Custom resources support, upload your custom resources to modify the recognition behaviour. (see the [text](./examples/v4/custom_resources_text.html) or the [math](./examples/v4/custom_resources_math.html) example.)
- New `penStyleClasses` property. Used to change the theme using a classes passed using the `theme` property (see the [example](./examples/v4/customize_style.html)).
- New guides for text using a svg DOM element behind the model layer.
- No more css background if api is set to `V4`.
- New `isEmpty`, `possibleUndoCount` and `undoStackIndex` properties in details on `changed` event to help development of custom undo/redo stacks.

## Breaking changes
In order to be consistent with the native API :
- `importContent()` and `exportContent()` respectively renamed to `import_()` and `export_()`.
- `importInk(strokes)` changed to `pointerEvents(events)`.

# [v4.0.0](https://github.com/MyScript/MyScriptJS/tree/v4.0.0)

## Features
- Change the underlying `InkPaper` editor to a new `Editor` class.
- New events to be notified of editor changes.
- New `penStyle` property. Used to change current pen style. 
- New `theme` property. Used to change the editor's theme. 
- New `configuration` property. Changing the configuration will clear the underlying editor, all currents strokes and results will be lost.
 
## Breaking changes
- Complete rewrite with ES6 syntax
- Internal design improved to allow extensibility and support of upcoming recognition types. See the [documentation](./docs/index.html) and [examples](./examples/index.html) to discover new behavior. 
- Removal of all deprecated attributes and methods
- All configuration has been merged into the `configuration` property.
- All events has been renamed. 
- `getAvailableLanguages()` have been moved outside the editor. You can use it to retrieve the list of available languages for your configuration.

# [v1.2.1](https://github.com/MyScript/MyScriptJS/tree/v1.2.1)

## Bugs
- Fixes staff disappearing after recognition result
- Fixes retina mode was only well display after a resizing
- Fixes scratch-out were displayed when exporting as image 

# [v1.2.0](https://github.com/MyScript/MyScriptJS/tree/v1.2.0)

## Features
- Change build task runner from grunt to gulp
- Add accessors to `host` to make it mutable
- Add accessors to `protocol` to make it mutable
- Add accessors to `parameters` to make them mutable
- Add accessors to `components` to make them mutable (@see mandatory clef on music)
- Add enum style variables on string constants to ease implementation
- Mark `globalAlpha` parameter as deprecated
- Migrate JQuery Pointer Event Polyfill to [0.4.1](https://github.com/jquery/PEP/releases/tag/0.4.1)

## Bugs
- Fixes `parameters` constructors to allow json construction, used also to copy them
- Fixes `components` constructors to allow json construction, used also to copy them
- Fixes issue on shape recognition undo/redo
- Fixes issue on music recognition undo/redo (@see mutable `components` feature)
- Fixes issue on network interfaces (@see mutable `host` feature)
- Fixes missing callback call when `timeout` === 0
- Fixes set `parameters` on WebSocket recognition (@see mutable `parameters` feature)
- Fixes ink-paper positioning issue (CSS change)
- Fixes wrong pointer events coordinates
- Fixes getAvailableLanguages to use correct `inputMode`
- Fixes high-resolution rendering
