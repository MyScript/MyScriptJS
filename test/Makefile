include ../Makefile.inc

ifeq ($(findstring dev-,$(MAKECMDGOALS)),)
	BUILDID := $(shell date +"%Y-%m-%d_%H_%M_%S_%N")
else
	BUILDID := DEV
	DOCKER_SELENIUM_PARAMETERS := -p 4444:4444 -p 5900:5900 -e no_proxy=localhost -e HUB_ENV_no_proxy=localhost
endif

BUILDENV := test
TEST_DOCKER_NAME_PREFIX := myscriptjs-$(DOCKERTAG)-$(BUILDENV)-$(BUILDID)
TEST_DOCKER_SAMPLES_INSTANCE_NAME := $(TEST_DOCKER_NAME_PREFIX)-samples
TEST_DOCKER_SELENIUM_INSTANCE_NAME := selenium_hub_1

ALL: clean prepare test

.PHONY: ALL purge clean prepare test

killdocker:
	@docker ps -a | grep "myscriptjs-$(DOCKERTAG)-$(BUILDENV)-" | awk '{print $$1}' | xargs -r docker rm -f 2>/dev/null 1>/dev/null || true

_killdocker: killdocker

clean:
	@rm -rf nightwatch/results

test: ## Launch a minimal set of tests to avoid regressions
	@if [ "$$(docker port $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) 4444)" == "" ]; then \
	    echo "Selenium is not running - launching"; \
	    $(MAKE) _selenium_launch; \
    fi;
	@$(MAKE) BUILDID=$(BUILDID) _test; \
	RES=$$?; \
	$(MAKE) BUILDID=$(BUILDID) _killdocker; \
	(exit $${RES};)

quick-test: ## Launch a minimal set of tests to avoid regressions
	@echo "This MAKEFILE target assumes that you have a local webserver and selenium host - respectively on port 8080 and 4444 - already running"
	@(cd nightwatch && nightwatch --retries 1 -c ./local-configuration.json -e $(SELENIUM_ENV))

_test: _killdocker _samples _test-nightwatch
	@echo "Starting nightwatch tests!" && \
	function cleandockers { (docker ps -a | grep "$(TEST_DOCKER_NAME_PREFIX)" | awk '{print $1}' | xargs -r docker rm -f 2>/dev/null 1>/dev/null || true) ;} && \
    trap cleandockers EXIT

_test-nightwatch:
	@echo "Starting nightwatch tests!"
	@SAMPLES_IP=$$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $(TEST_DOCKER_SAMPLES_INSTANCE_NAME)) && \
	(docker run -i --rm \
		--link $(TEST_DOCKER_SELENIUM_INSTANCE_NAME):selenium \
		-v $(PROJECT_DIR)/test:/tests \
		-v $(PROJECT_DIR)/test/nightwatch/commands:/commands \
		-e "SELENIUM_HOST=selenium" \
		-e "SELENIUM_ENV=$(SELENIUM_ENV)" \
		-e "SRC_FOLDERS=nightwatch/partial" \
		-e "LAUNCH_URL=http://$${SAMPLES_IP}:80" \
		-e "NIGHTWATCH_TIMEOUT_FACTOR=2" \
		$(NIGHTWATCH_DOCKERREPOSITORY))

dev-all: _start-samples ## Launch all the requirements for launching tests.
	@(if [ "$$(docker port $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) 4444)" == "" ]; then echo "Selenium is not running - launching";$(MAKE) _selenium_launch; fi )
	@echo 'Local requirements launch'

dev-samples: _samples

dev-restart: _stop-samples dev-all ## Restart the requirement for tests

_samples:
	@echo "Starting samples container!"
	@docker run -d --name $(TEST_DOCKER_SAMPLES_INSTANCE_NAME) $(MYSCRIPTJS_WEBSERVER_DOCKERREPOSITORY)
	@docker run --rm --link $(TEST_DOCKER_SAMPLES_INSTANCE_NAME):WAITHOST -e "WAIT_PORT=80" -e "WAIT_SERVICE=Test samples" $(WAITTCP_DOCKERREPOSITORY)

_selenium_launch:
	@docker run -d $(DOCKER_SELENIUM_PARAMETERS) --name $(TEST_DOCKER_SELENIUM_INSTANCE_NAME) $(SELENIUM_STANDALONE_DOCKERREPOSITORY)
	@docker run --rm --link $(TEST_DOCKER_SELENIUM_INSTANCE_NAME):WAITHOST -e "WAIT_PORT=4444" -e "WAIT_SERVICE=Selenium hub" $(WAITTCP_DOCKERREPOSITORY)

_start-samples:
	@cd .. && nohup gulp watch 1>/dev/null &
	@$(MAKE) WAIT_IP=127.0.0.1 WAIT_PORT=8080 _waittcp

_stop-samples:
	@pkill gulp

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

_waittcp:
	@echo -n "Waiting for TCP Port on IP:$(WAIT_IP):$(WAIT_PORT) " && \
	CPT=0 && \
	while ! nc -z -w 1 $(WAIT_IP) $(WAIT_PORT); do \
		((CPT++)); \
		if [ $${CPT} -gt 60 ]; then \
			echo "timeout"; \
			exit 1; \
		fi; \
		sleep 1; \
		echo -n .; \
	done; \
	echo " Found!"
