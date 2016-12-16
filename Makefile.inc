SHELL = /bin/bash
GIT_VERSION := $(shell git describe --tags --long --always)

MAKE := $(MAKE) --no-print-directory
NPM_CACHE = $(HOME)/.npm

FULL = false
SELENIUM_HOST = localhost
SELENIUM_ENV = chrome
CURRENT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
PROJECT_DIR ?= $(CURRENT_DIR)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

OFFLINE = false
ifeq ($(OFFLINE),true)
    BOWER_PARAMETERS := --offline
	NPM_PARAMETERS := --cache-min 9999999
	NIGHTWATCH_TESTS := false
else
	DOCKER_PARAMETERS := --pull
	NIGHTWATCH_TESTS := true
endif

DOCKERTAG := master
GIT_TAG = 2.0.0

SELENIUM_VERSION = 3.0.0-dubnium
SELENIUM_STANDALONE_DOCKERREPOSITORY = selenium/standalone-chrome-debug:$(SELENIUM_VERSION)

REGISTRY = registry.visionobjects.com:5000
DOC_DOCKERREPOSITORY = $(REGISTRY)/myscriptjs-docs:$(DOCKERTAG)
MYSCRIPTJS_WEBSERVER_DOCKERREPOSITORY = $(REGISTRY)/myscriptjs-samples:$(DOCKERTAG)

CONFIGURATION_DOCKERTAG := master
NIGHTWATCH_DOCKERREPOSITORY = $(REGISTRY)/myscript-webcomponents-nightwatch:$(CONFIGURATION_DOCKERTAG)
MOCHA_DOCKERREPOSITORY = $(REGISTRY)/myscript-webcomponents-mocha:$(CONFIGURATION_DOCKERTAG)
WAITTCP_DOCKERREPOSITORY = $(REGISTRY)/myscript-webcomponents-wait-tcp:$(CONFIGURATION_DOCKERTAG)
