SHELL = /bin/bash
GIT_VERSION := $(shell git describe --tags --long --always)
CURRENT_USER_UID := $(shell id -u)
CURRENT_USER_GID := $(shell id -g)

MAKE := $(MAKE) --no-print-directory
NPM_CACHE = $(HOME)/.npm

FULL = false
IINK = false
OFFLINE = false
APILOCAL = false
DEVLOCAL = false
SELENIUM_HOST = localhost
SELENIUM_ENV = chrome
CURRENT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
PROJECT_DIR ?= $(CURRENT_DIR)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
DOCKER_SELENIUM_PARAMETERS := -p 4444:4444 -p 5900:5900

DOCKERTAG := master
GIT_TAG = 2.0.0

REGISTRY = registry.visionobjects.com:5000
DOC_DOCKERREPOSITORY = $(REGISTRY)/myscriptjs-docs:$(DOCKERTAG)
SAMPLES_DOCKERREPOSITORY = $(REGISTRY)/myscriptjs-samples:$(DOCKERTAG)

CONFIGURATION_DOCKERTAG := master
SELENIUM_STANDALONE_DOCKERREPOSITORY = $(REGISTRY)/selenium-standalone-chrome-debug:$(CONFIGURATION_DOCKERTAG)
NIGHTWATCH_DOCKERREPOSITORY = $(REGISTRY)/myscript-webcomponents-nightwatch:$(CONFIGURATION_DOCKERTAG)
MOCHA_DOCKERREPOSITORY = $(REGISTRY)/myscript-webcomponents-mocha:$(CONFIGURATION_DOCKERTAG)
WAITTCP_DOCKERREPOSITORY = $(REGISTRY)/myscript-webcomponents-wait-tcp:$(CONFIGURATION_DOCKERTAG)

BUILDENV := test
TEST_DOCKER_NAME_PREFIX := myscriptjs-$(DOCKERTAG)-$(BUILDENV)-$(BUILDID)
TEST_DOCKER_SAMPLES_INSTANCE_NAME := $(TEST_DOCKER_NAME_PREFIX)-samples
TEST_DOCKER_SELENIUM_INSTANCE_NAME := selenium_hub_1

CDK_APPLICATIONKEY := 7d223f9e-a3cb-4213-ba4b-85e930605f8b
CDK_HMACKEY := 5ab1935e-529a-4d48-a695-158450e52b13

IINK_APPLICATIONKEY := 7d223f9e-a3cb-4213-ba4b-85e930605f8b
IINK_HMACKEY := 5ab1935e-529a-4d48-a695-158450e52b13

ifeq ($(APILOCAL),true)
    CDK_APIHOST := localhost:8894
    IINK_APIHOST := localhost:8897
    CDK_APISCHEME := http
    IINK_APISCHEME := http
else
    CDK_APIHOST := webdemoapi.myscript.com
    IINK_APIHOST := newcloud.myscript.com
    CDK_APISCHEME := https
    IINK_APISCHEME := https
endif

ifeq ($(OFFLINE),true)
    BOWER_PARAMETERS := --offline
    NPM_PARAMETERS := --cache-min 9999999
    NIGHTWATCH_TESTS := false
else
    DOCKER_PARAMETERS := --pull
    NIGHTWATCH_TESTS := true
endif

ifeq ($(findstring dev-,$(MAKECMDGOALS)),)
    BUILDID := $(shell date +"%Y-%m-%d_%H_%M_%S_%N")
else
    BUILDID := DEV
endif
