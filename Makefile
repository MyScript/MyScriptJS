include Makefile.inc

ALL: purge clean prepare build

.PHONY: ALL \
	purge clean prepare build \
	escrow

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
	@gulp --tag $(GIT_VERSION)

escrow:
	@rm -rf escrow/ && mkdir -p escrow/
	@$(MAKE) _backup-src

_backup-src:
	@echo "Archiving sources"
	@git archive --format=tar HEAD | gzip > escrow/myscript-js-src-$(GIT_VERSION).tar.gz
