include Makefile.inc

ALL: clean prepare docker test

.PHONY: ALL \
	purge clean prepare build doc watch dev docs

purge:
	@rm -rf bower_components/
	@rm -rf node_modules/
	@npm cache clean $(NPM_CACHE)
	@bower cache clean

clean:
	@rm -rf dist
	@rm -rf .tmp

prepare:
	@git fetch --tags
	@npm install --cache $(NPM_CACHE)
	@bower install $(BOWER_PARAMETERS)

build:
	@gulp --tag $(VERSION)

test:

docker: build

watch:
	@gulp watch --tag $(VERSION)

dev:
	@gulp serve --tag $(VERSION)

docs:
	@rm -rf docs/api && rm -rf docs/components/* && mkdir -p docs/components
	@cd docs && bower install -q ../../myscript-js
	@cp -r bower_components/* docs/components/
	@gulp doc

