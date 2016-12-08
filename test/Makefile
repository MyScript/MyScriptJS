include ../Makefile.inc

ALL: clean prepare test

.PHONY: ALL purge clean prepare test

killdocker:
	@docker ps -a | grep "myscriptjs-$(DOCKERTAG)-$(BUILDENV)-" | awk '{print $$1}' | xargs -r docker rm -f 2>/dev/null 1>/dev/null || true

clean:
	@rm -rf nightwatch/results

test: quick-test

dev-all: _selenium_launch ## Launch all the requirements for launching tests.
	@echo 'Local requirements launch'
	@cd .. && nohup gulp watch 1>/dev/null &

dev-restart: ## Restart the requirement for tests
	@pkill gulp
	@make dev-all

_selenium_launch: killdocker
	@docker run --name myscriptjs-master-test-selenium-endpoint -d -it -P selenium/standalone-chrome-debug
	@SELENIUM_DOC_PORT=$$(docker port myscriptjs-$(DOCKERTAG)-$(BUILDENV)-selenium-endpoint 4444 |  sed "s/0.0.0.0://") \
	docker run --rm --link myscriptjs-$(DOCKERTAG)-$(BUILDENV)-selenium-endpoint:WAITHOST -e "WAIT_PORT=4444" -e "WAIT_SERVICE=Selenium endpoint" $(WAITTCP_DOCKERREPOSITORY)

quick-test: ## Launch a minimal set of tests to avoid regressions
	@echo "This MAKEFILE target assumes that you have a local weberserver and selenium host already running"
	@$(MAKE) WAIT_IP=127.0.0.1 WAIT_PORT=8080 _waittcp
	@(if [ "$$(docker port myscriptjs-$(DOCKERTAG)-$(BUILDENV)-selenium-endpoint 4444)" == "" ]; then echo "Selenium is not running - launching";$(MAKE) _selenium_launch; fi )
	SELENIUM_DOC_PORT=$$(docker port myscriptjs-$(DOCKERTAG)-$(BUILDENV)-selenium-endpoint 4444 |  sed "s/0.0.0.0://") && \
		echo $${SELENIUM_DOC_PORT} && \
		(cd nightwatch && env \
			SELENIUM_HOST="127.0.0.1" \
			SELENIUM_PORT="$${SELENIUM_DOC_PORT}" \
			NIGHTWATCH_SRC_FOLDERS="partial" \
			NIGHTWATCH_OUTPUT_FOLDER="results" \
			NIGHTWATCH_RESOURCES_FOLDER="$${CURRENT_DIR}/test/files" \
			NIGHTWATCH_LAUNCH_URL="http://172.17.0.1:8080/" \
			nightwatch --retries 3 -c ./nightwatch.json -e chrome)


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
