SHELL = /bin/bash
GIT_VERSION := $(shell git describe --tags --long --always)
#LAST_VERSION_TAG := $(shell git describe --abbrev=0 --tags)

MAKE := $(MAKE) --no-print-directory

FULL = false
SELENIUM_HOST = localhost
SELENIUM_ENV = chrome,firefox
CURRENT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

OFFLINE = false
ifeq ($(OFFLINE),true)
    BOWER_PARAMETERS := --offline
endif

DOCKERTAG := master
GIT_TAG = 2.0.0
# Switch beetwin jenkins or local test environnements
ifeq ($(findstring dev-,$(MAKECMDGOALS)),)
	BUILDID := $(shell date +"%Y-%m-%d_%H_%M_%S_%N")
else
	BUILDID := DEV
endif
ifeq ($(findstring localhost,$(SELENIUM_HOST)),)
	TESTENV := webtest
	DOCKER_COMPONENTS_PARAMETERS := -p 8888:5000
else
	TESTENV := local
endif

BUILDENV := test
TEST_DOCKER_NAME_PREFIX := myscriptjs-$(DOCKERTAG)-$(BUILDENV)-$(BUILDID)
TEST_DOCKER_COMPONENTS_INSTANCE_NAME := $(TEST_DOCKER_NAME_PREFIX)-backend
CONFIGURATION_DOCKERTAG := 1.4.5

DOCKER_HOST_IP := 172.17.0.1
SELENIUM_VERSION = 3.0.0-dubnium
SELENIUM_STANDALONE_DOCKERREPOSITORY = selenium/standalone-chrome-debug:$(SELENIUM_VERSION)
SELENIUM_HUB_DOCKERREPOSITORY = selenium/hub:$(SELENIUM_VERSION)
SELENIUM_NODE_CHROME_DOCKERREPOSITORY = selenium/node-chrome:$(SELENIUM_VERSION)
SELENIUM_NODE_FIREFOX_DOCKERREPOSITORY = selenium/node-firefox:$(SELENIUM_VERSION)

REGISTRY = registry.visionobjects.com:5000
DOC_DOCKERREPOSITORY = $(REGISTRY)/myscriptjs-docs:$(DOCKERTAG)
MYSCRIPTJS_WEBSERVER_DOCKERREPOSITORY = $(REGISTRY)/myscriptjs-samples:$(DOCKERTAG)
WAITTCP_DOCKERREPOSITORY = $(REGISTRY)/smartcloud-sso-waittcp:$(CONFIGURATION_DOCKERTAG)


