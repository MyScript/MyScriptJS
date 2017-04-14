include Makefile.inc

ALL: clean prepare docker test ## (default) Build all and launch test.

.PHONY: ALL purge clean prepare build docker test

purge: ## Reset the local directory as if a fresh git checkout was just make.
	@rm -rf node_modules

clean: ## Remove all produced binaries.
	@rm -rf dist
	@rm -rf docs

prepare: ## Install all dependencies.
	@npm install --cache $(NPM_CACHE)

build: clean ## Building the dist files from sources.
	@gulp

docker: build ## Build the docker image containing last version of myscript-js and samples.
	@rm -rf docker/samples/delivery/
	@mkdir -p docker/samples/delivery
	@cp -R dist docker/samples/delivery/
	@cp -R samples docker/samples/delivery/
	@cp -R node_modules docker/samples/delivery/
	@cd docker/samples/ && docker build $(DOCKER_PARAMETERS) -t $(SAMPLES_DOCKERREPOSITORY) .

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
	@$(MAKE) BUILDID=$(BUILDID) _test; \
	RES=$$?; \
	$(MAKE) BUILDID=$(BUILDID) killdocker; \
	(exit $${RES};)

_test: killdocker _samples
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
	@SAMPLES_IP=$$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $(TEST_DOCKER_SAMPLES_INSTANCE_NAME)) && \
	(docker run -i --rm \
	    --user="${CURRENT_USER_UID}:${CURRENT_USER_GID}" \
		--link $(TEST_DOCKER_SELENIUM_INSTANCE_NAME):selenium \
		-v $(PROJECT_DIR)/test:/tests \
		-v $(PROJECT_DIR)/test/nightwatch/commands:/commands \
		-v $(PROJECT_DIR)/test/nightwatch/results:/results\
		-e "SELENIUM_HOST=selenium" \
		-e "SELENIUM_ENV=$(SELENIUM_ENV)" \
		-e "SRC_FOLDERS=nightwatch/partial" \
		-e "LAUNCH_URL=http://$${SAMPLES_IP}:80" \
		-e "NIGHTWATCH_TIMEOUT_FACTOR=2" \
		$(NIGHTWATCH_DOCKERREPOSITORY))

_test-nightwatch-full:
	@echo "Starting nightwatch tests!"
	@rm -rf test/nightwatch/results && mkdir -p test/nightwatch/results
	@SAMPLES_IP=$$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $(TEST_DOCKER_SAMPLES_INSTANCE_NAME)) && \
	(docker run -i --rm \
	    --user="${CURRENT_USER_UID}:${CURRENT_USER_GID}" \
		--link $(TEST_DOCKER_SELENIUM_INSTANCE_NAME):selenium \
		-v $(PROJECT_DIR)/test:/tests \
		-v $(PROJECT_DIR)/test/nightwatch/commands:/commands \
		-v $(PROJECT_DIR)/test/nightwatch/results:/results\
		-e "SELENIUM_HOST=selenium" \
		-e "SELENIUM_ENV=$(SELENIUM_ENV)" \
		-e "SRC_FOLDERS=nightwatch/full" \
		-e "LAUNCH_URL=http://$${SAMPLES_IP}:80" \
		-e "NIGHTWATCH_TIMEOUT_FACTOR=2" \
		$(NIGHTWATCH_DOCKERREPOSITORY))

dev-all: dev-samples dev-selenium ## Launch all the requirements for launching tests.

dev-selenium: ## Launch a local selenium.
	@(if [ "$$(docker port $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) 4444)" == "" ]; then echo "Selenium is not running - launching";$(MAKE) _selenium_launch; fi )
	@echo 'Local requirements launch'

dev-samples: _samples ## Launch a local nginx server to ease development.

_samples:
	@echo "Starting samples container!"
	@docker run -d --name $(TEST_DOCKER_SAMPLES_INSTANCE_NAME) \
		-e "APIHOST=$(APIHOST)" \
		-e "APPLICATIONKEY=$(APPLICATIONKEY)" \
		-e "HMACKEY=$(HMACKEY)" \
		$(SAMPLES_DOCKERREPOSITORY)
	@docker run --rm --link $(TEST_DOCKER_SAMPLES_INSTANCE_NAME):WAITHOST -e "WAIT_PORT=80" -e "WAIT_SERVICE=Test samples" $(WAITTCP_DOCKERREPOSITORY)

_selenium_launch:
	@echo "Starting selenium container selenium_hub_1! Launch a VNC viewer on port 5900 (password is : secret) to view test execution."
	@docker run -d $(DOCKER_SELENIUM_PARAMETERS) --name $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) $(SELENIUM_STANDALONE_DOCKERREPOSITORY)
	@docker run --rm --link $(TEST_DOCKER_SELENIUM_INSTANCE_NAME):WAITHOST -e "WAIT_PORT=4444" -e "WAIT_SERVICE=Selenium hub" $(WAITTCP_DOCKERREPOSITORY)

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
