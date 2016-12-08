include Makefile.inc

ALL: clean prepare test

.PHONY: ALL purge clean prepare test

build: ## Building the dist files from sources.
	@gulp

clean: ## Remove all produced binaries.
	@rm -rf target

dev-all: ## TODO.

dev-restart: ## TODO .

docker: build ## Build the docker image containing a webserver with last version of myscript js and samples.
	@mkdir -p docker/myscriptjs-webserver/delivery/build
	@rm -Rf docker/myscriptjs-webserver/delivery/build/*
	@cp -R dist docker/myscriptjs-webserver/delivery/build/
	@cp -R samples docker/myscriptjs-webserver/delivery/build/
	@cd docker/myscriptjs-webserver/ && docker build $(DOCKER_PARAMETERS) -t $(MYSCRIPTJS_WEBSERVER_DOCKERREPOSITORY) .

prepare: ## Install all dependencies.
	@npm install --cache $(NPM_CACHE)

purge: ## Reset the local directory as if a fresh git checkout was just make.
	@rm -rf node_modules

test: ## Launch the test locally. Use DEBUG=true to show the behaviour in the browser with vinagre.
	@$(MAKE) -C test

watch: ## Launch a local webserver to ease development.
	@gulp watch



help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)