include Makefile.inc

ALL: clean prepare docker test ## (default) Build all and launch test.

.PHONY: ALL purge clean prepare build docker test docs

purge: ## Reset the local directory as if a fresh git checkout was just make.
	@rm -rf node_modules

clean: ## Remove all produced binaries.
	@rm -rf dist
	@rm -rf docs

prepare: ## Install all dependencies.
	@npm install

build: clean ## Building the dist files from sources.
	@npm run build

docs: ## Building the doc files from sources.
	@npm run docs

docker: build ## Build the docker image containing last version of myscript-js and examples.
	@rm -rf docker/examples/delivery/
	@mkdir -p docker/examples/delivery
	@cp -R dist docker/examples/delivery/
	@cp -R examples docker/examples/delivery/
	@cp -R node_modules docker/examples/delivery/
	@cd docker/examples/ && docker build --build-arg applicationkey=${DEV_APPLICATIONKEY} --build-arg hmackey=${DEV_HMACKEY} $(DOCKER_PARAMETERS) -t $(EXAMPLES_DOCKERREPOSITORY) .

killdocker:
	@docker ps -a | grep "myscriptjs-$(DOCKERTAG)-$(BUILDENV)-" | awk '{print $$1}' | xargs -r docker rm -f 2>/dev/null 1>/dev/null || true

quick-test: ## Launch a minimal set of tests to avoid regressions
	@echo "This MAKEFILE target assumes that you have a local webserver and selenium host - respectively on port 8080 and 4444 - already running"
	@(cd test/nightwatch && nightwatch --retries 1 -c ./local-configuration.json -e $(SELENIUM_ENV))

test: ## Launch a set of tests to avoid regressions, using docker. Set the FULL variable to true to for a full coverage.
	@if [ "$$(docker port $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) 4444)" == "" ]; then \
	    echo "Selenium is not running - launching"; \
	    $(MAKE) _selenium_launch; \
    fi;
	$(MAKE) _test; \
	RES=$$?; \
	$(MAKE) killdocker; \
	(exit $${RES};)

_test: killdocker _examples
	@if [[ $(FULL) == true ]]; then \
		$(MAKE) _test-nightwatch-full; \
	else \
		$(MAKE) _test-nightwatch; \
	fi;
	@echo "Starting nightwatch tests!" && \
	function cleandockers { (docker ps -a | grep "$(TEST_DOCKER_NAME_PREFIX)" | awk '{print $1}' | xargs -r docker rm -f 2>/dev/null 1>/dev/null || true) ;} && \
    trap cleandockers EXIT

_test-nightwatch:
	@echo "Starting nightwatch tests!"
	@rm -rf test/nightwatch/results && mkdir -p test/nightwatch/results
	if [[ $(DEVLOCAL) == true ]]; then \
		EXAMPLES_IP=localhost; \
	else \
		EXAMPLES_IP=$$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $(TEST_DOCKER_EXAMPLES_INSTANCE_NAME)); \
	fi && \
	docker run -i --rm \
	    $(DOCKER_NIGHTWATCH_PARAMETERS) \
	    --user="${CURRENT_USER_UID}:${CURRENT_USER_GID}" \
		-v $(PROJECT_DIR)/test:/tests \
		-v $(PROJECT_DIR)/test/nightwatch/commands:/commands \
		-v $(PROJECT_DIR)/test/nightwatch/results:/results\
		-e "SELENIUM_HOST=selenium" \
		-e "SELENIUM_ENV=$(SELENIUM_ENV)" \
		-e "SRC_FOLDERS=nightwatch/partial" \
		-e "LAUNCH_URL=http://$${EXAMPLES_IP}:$${EXAMPLES_LISTEN_PORT}" \
		-e "NIGHTWATCH_TIMEOUT_FACTOR=2" \
		$(NIGHTWATCH_DOCKERREPOSITORY)

_test-nightwatch-full:
	@echo "Starting nightwatch tests!"
	@rm -rf test/nightwatch/results && mkdir -p test/nightwatch/results
	if [[ $(DEVLOCAL) == true ]]; then \
		EXAMPLES_IP=localhost; \
	else \
		EXAMPLES_IP=$$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $(TEST_DOCKER_EXAMPLES_INSTANCE_NAME)); \
	fi && \
	docker run -i --rm \
	    $(DOCKER_NIGHTWATCH_PARAMETERS) \
	    --user="${CURRENT_USER_UID}:${CURRENT_USER_GID}" \
		-v $(PROJECT_DIR)/test:/tests \
		-v $(PROJECT_DIR)/test/nightwatch/commands:/commands \
		-v $(PROJECT_DIR)/test/nightwatch/results:/results\
		-e "SELENIUM_HOST=selenium" \
		-e "SELENIUM_ENV=$(SELENIUM_ENV)" \
		-e "SRC_FOLDERS=nightwatch/full" \
		-e "LAUNCH_URL=http://$${EXAMPLES_IP}:$${EXAMPLES_LISTEN_PORT}" \
		-e "NIGHTWATCH_TIMEOUT_FACTOR=2" \
		$(NIGHTWATCH_DOCKERREPOSITORY)

dev-all: dev-examples dev-selenium ## Launch all the requirements for launching tests.

dev-selenium: ## Launch a local selenium.
	@(if [ "$$(docker port $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) 4444)" == "" ]; then echo "Selenium is not running - launching";$(MAKE) _selenium_launch; fi )
	@echo 'Local requirements launch'

dev-examples: _examples ## Launch a local nginx server to ease development.

_examples:
	@echo "Starting examples container!"
	@docker run -d --name $(TEST_DOCKER_EXAMPLES_INSTANCE_NAME) $(DOCKER_EXAMPLES_PARAMETERS) \
	  -e "LISTEN_PORT=$(EXAMPLES_LISTEN_PORT)" \
		-e "APISCHEME=$(APISCHEME)" \
		-e "APIHOST=$(APIHOST)" \
        -e "APPLICATIONKEY=$(DEV_APPLICATIONKEY)" \
        -e "HMACKEY=$(DEV_HMACKEY)" \
		$(EXAMPLES_DOCKERREPOSITORY)
	@docker run --rm --link $(TEST_DOCKER_EXAMPLES_INSTANCE_NAME):WAITHOST -e "WAIT_PORT=$(EXAMPLES_LISTEN_PORT)" -e "WAIT_SERVICE=Test examples" $(WAITTCP_DOCKERREPOSITORY)

_selenium_launch:
	@echo "Starting selenium container selenium_hub_1! Launch a VNC viewer on port 5900 (password is : secret) to view test execution."
	docker pull $(SELENIUM_STANDALONE_DOCKERREPOSITORY)
	@docker run -d $(DOCKER_SELENIUM_PARAMETERS) --name $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) $(SELENIUM_STANDALONE_DOCKERREPOSITORY)
	@docker run --rm --link $(TEST_DOCKER_SELENIUM_INSTANCE_NAME):WAITHOST -e "WAIT_PORT=4444" -e "WAIT_SERVICE=Selenium hub" $(WAITTCP_DOCKERREPOSITORY)

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
