# v5.0.0

## Features
- New prompter features:
    - Show real time converted text above writings,
    - Change recognized words on click using candidates,
    - Convert text using the action button.

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
