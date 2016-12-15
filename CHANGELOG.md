# Change Log
## [v1.2.2](https://github.com/MyScript/MyScriptJS/tree/v1.2.2)

### Bugs
- Fixes pointer leave and out coordinates
- Fixes word/char segments issue

## [v1.2.1](https://github.com/MyScript/MyScriptJS/tree/v1.2.1)

### Bugs
- Fixes Staff disappearing after recognition result
- Fixes Retina mode was only well display after a resizing
- Fix Scratchout were displayed when exporting as image 


## [v1.2.0](https://github.com/MyScript/MyScriptJS/tree/v1.2.0)

### Features
- Change build task runner from grunt to gulp
- Add accessors to `host` to make it mutable
- Add accessors to `protocol` to make it mutable
- Add accessors to `parameters` to make them mutable
- Add accessors to `components` to make them mutable (@see mandatory clef on music)
- Add enum style variables on string constants to ease implementation
- Mark `globalAlpha` parameter as deprecated
- Migration to JQuery Pointer Event Polyfill [0.4.1](https://github.com/jquery/PEP/releases/tag/0.4.1)

### Bugs
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

