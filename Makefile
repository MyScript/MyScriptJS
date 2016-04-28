include Makefile.inc

ALL: purge clean prepare docker test

.PHONY: ALL \
	purge clean prepare build doc watch dev \
	escrow

purge:
	@rm -rf bower_components/
	@rm -rf node_modules/
	@npm cache clean $(NPM_CACHE)

clean:
	@rm -rf dist
	@rm -rf .tmp

prepare:
	@git remote add github $(GITHUB) > /dev/null; true
	@git fetch --tags
	@npm install --cache $(NPM_CACHE)
	@bower install

build:
	@gulp --tag $(GIT_VERSION)

test:

docker: build

watch:
	@gulp watch --tag $(GIT_VERSION)

dev:
	@gulp serve --tag $(GIT_VERSION)

escrow:
	@rm -rf escrow/ && mkdir -p escrow/
	@$(MAKE) _backup-src

_backup-src:
	@echo "Archiving sources"
	@git archive --format=tar HEAD | gzip > escrow/myscript-js-src-$(GIT_VERSION).tar.gz

doc:
	@gulp doc
