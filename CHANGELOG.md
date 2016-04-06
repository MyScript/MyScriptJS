# Change Log

## [v1.2.0](https://github.com/MyScript/MyScriptJS/tree/v1.2.0) (2016-04-06)

### Features
- Change build task runner from grunt to gulp
- Add accessors to `host` to make it mutable
- Add accessors to `protocol` to make it mutable
- Add accessors to `parameters` to make them mutable
- Add accessors to `components` to make them mutable (@see mandatory clef on music)
- Add enum style variables on string constants to ease implementation
- Mark `globalAlpha` parameter as deprecated

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
 
