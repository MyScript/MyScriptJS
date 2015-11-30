include Makefile.inc

ALL: clean prepare build

.PHONY: purge ALL

purge:
	@rm -rf bower_components
	@rm -rf node_modules
	@npm cache clean $(NPM_CACHE)

clean:
	@rm -rf dist
	@rm -rf .tmp

prepare:
	@npm install --cache $(NPM_CACHE)
	@bower install

build:
	@grunt
